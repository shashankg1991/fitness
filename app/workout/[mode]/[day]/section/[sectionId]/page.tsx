'use client';
import { use, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ChevronLeft, ChevronRight, Play, Pause, RotateCcw, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { BRO_SPLIT, PPL_SPLIT } from '@/lib/workoutData';
import { useTimer, formatTime } from '@/lib/useTimer';

function TimerRing({ seconds, total, color }: { seconds: number; total: number; color: string }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const progress = total > 0 ? (total - seconds) / total : 0;
  const offset = circ * (1 - progress);
  return (
    <svg width="130" height="130" viewBox="0 0 130 130" className="-rotate-90">
      <circle cx="65" cy="65" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8"/>
      <circle cx="65" cy="65" r={r} fill="none" stroke={color} strokeWidth="8"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" style={{transition:'stroke-dashoffset 1s linear'}}/>
    </svg>
  );
}

function RestTimer({ seconds, color, onDone }: { seconds: number; color: string; onDone: () => void }) {
  const timer = useTimer(seconds, onDone);
  useEffect(() => { timer.start(); }, []);
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center" style={{background:'rgba(0,0,0,0.92)'}}>
      <div className="text-xs font-mono mb-6" style={{color:'#8888a0'}}>REST</div>
      <div className="relative flex items-center justify-center mb-6">
        <TimerRing seconds={timer.seconds} total={seconds} color={color}/>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="font-display text-5xl" style={{color}}>{formatTime(timer.seconds)}</div>
          <div className="text-xs font-mono mt-1" style={{color:'#8888a0'}}>remaining</div>
        </div>
      </div>
      <button onClick={onDone} className="px-8 py-3 rounded-xl font-display text-lg tracking-wider"
        style={{background: color, color:'#fff'}}>SKIP REST</button>
    </div>
  );
}

export default function SectionPage({
  params
}: { params: Promise<{ mode: string; day: string; sectionId: string }> }) {
  const { mode, day, sectionId } = use(params);
  const split = mode === 'ppl' ? PPL_SPLIT : BRO_SPLIT;
  const dayData = split.find(d => d.day === parseInt(day));
  const section = dayData?.sections.find(s => s.id === sectionId);

  const [exIdx, setExIdx] = useState(0);
  const [setNum, setSetNum] = useState(1);
  const [showRest, setShowRest] = useState(false);
  const [completedSets, setCompletedSets] = useState<Record<string, number[]>>({});
  const [showDetails, setShowDetails] = useState(true);
  const [imgError, setImgError] = useState(false);

  const exercise = section?.exercises[exIdx];
  const color = section?.id === 'warmup' ? '#F5C842'
    : section?.id === 'abs' ? '#00C7BE'
    : section?.id === 'cooldown' ? '#64B4FF'
    : section?.id === 'backpain' ? '#8E8EFF'
    : dayData?.color || '#FF6B35';

  const isTimed = !!exercise?.duration;
  const timer = useTimer(exercise?.duration || 60);

  const totalExercises = section?.exercises.length || 0;
  const progress = totalExercises > 0 ? ((exIdx + (setNum - 1) / (exercise?.sets || 1)) / totalExercises) * 100 : 0;

  const sectionIdx = dayData?.sections.findIndex(s => s.id === sectionId) ?? -1;
  const nextSection = sectionIdx >= 0 ? dayData?.sections[sectionIdx + 1] : undefined;

  const markSetDone = useCallback(() => {
    const key = exercise?.id || '';
    const done = completedSets[key] || [];
    const newDone = [...done, setNum];
    setCompletedSets(prev => ({ ...prev, [key]: newDone }));

    if (setNum < (exercise?.sets || 1)) {
      setSetNum(s => s + 1);
      setShowRest(true);
    } else {
      if (exIdx < totalExercises - 1) {
        setShowRest(true);
        setTimeout(() => {
          setExIdx(i => i + 1);
          setSetNum(1);
        }, 100);
      }
    }
  }, [exercise, setNum, exIdx, totalExercises, completedSets]);

  if (!section || !exercise || !dayData) {
    return <div className="p-6" style={{color:'#f0f0f5'}}>Section not found</div>;
  }

  const isDone = exIdx >= totalExercises - 1 && setNum > (exercise.sets || 1);
  const exCompleted = (completedSets[exercise.id] || []).length;

  return (
    <main className="min-h-screen flex flex-col" style={{background:'#0a0a0f'}}>
      {showRest && (
        <RestTimer
          seconds={exercise.rest}
          color={color}
          onDone={() => setShowRest(false)}
        />
      )}

      {/* Header */}
      <div className="px-4 pt-8 pb-4 flex items-center gap-3">
        <Link href={`/workout/${mode}/${day}`} className="w-8 h-8 glass rounded-lg flex items-center justify-center shrink-0">
          <ArrowLeft size={15} style={{color:'#f0f0f5'}}/>
        </Link>
        <div className="flex-1 min-w-0">
          <div className="font-display text-sm tracking-wider truncate" style={{color}}>{section.title}</div>
          <div className="text-xs font-mono" style={{color:'#8888a0'}}>{dayData.muscle} · {dayData.badge}</div>
        </div>
        <div className="text-xs font-mono" style={{color:'#8888a0'}}>
          {exIdx + 1}/{totalExercises}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mx-4 mb-4 h-1 rounded-full" style={{background:'rgba(255,255,255,0.06)'}}>
        <div className="h-full rounded-full transition-all duration-500"
          style={{width:`${Math.min(100, progress)}%`, background: color}}/>
      </div>

      {/* Exercise navigator */}
      <div className="px-4 mb-4 flex gap-2">
        <button onClick={() => { if(exIdx > 0){ setExIdx(i=>i-1); setSetNum(1); }}}
          className="w-9 h-9 glass rounded-xl flex items-center justify-center" disabled={exIdx === 0}
          style={{opacity: exIdx === 0 ? 0.3 : 1}}>
          <ChevronLeft size={16} style={{color:'#f0f0f5'}}/>
        </button>
        <div className="flex-1 flex gap-1.5 overflow-x-auto pb-1">
          {section.exercises.map((ex, i) => {
            const done = (completedSets[ex.id] || []).length >= ex.sets;
            return (
              <button key={ex.id} onClick={() => { setExIdx(i); setSetNum(1); }}
                className="shrink-0 h-9 px-3 rounded-xl text-xs font-mono whitespace-nowrap transition-all"
                style={{
                  background: i === exIdx ? color : done ? `${color}22` : 'rgba(255,255,255,0.05)',
                  color: i === exIdx ? '#fff' : done ? color : '#8888a0',
                  border: done && i !== exIdx ? `1px solid ${color}44` : '1px solid transparent',
                }}>
                {done && i !== exIdx ? '✓ ' : ''}{ex.name.split(' ').slice(-1)[0]}
              </button>
            );
          })}
        </div>
        <button onClick={() => { if(exIdx < totalExercises-1){ setExIdx(i=>i+1); setSetNum(1); }}}
          className="w-9 h-9 glass rounded-xl flex items-center justify-center" disabled={exIdx >= totalExercises-1}
          style={{opacity: exIdx >= totalExercises-1 ? 0.3 : 1}}>
          <ChevronRight size={16} style={{color:'#f0f0f5'}}/>
        </button>
      </div>

      {/* Exercise image */}
      {exercise.image && !imgError && (
        <div className="mx-4 mb-4 rounded-2xl overflow-hidden" style={{height:'160px', background:'#111118'}}>
          <Image src={exercise.image} alt={exercise.name} width={800} height={480}
            className="w-full h-full object-cover opacity-90"
            onError={() => setImgError(true)} unoptimized/>
        </div>
      )}

      {/* Exercise info */}
      <div className="px-4 flex-1">
        <div className="glass2 rounded-2xl p-5 mb-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="font-display text-2xl tracking-wider leading-tight" style={{color:'#f0f0f5'}}>
                {exercise.name}
              </h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm font-mono" style={{color}}>
                  {isTimed ? `${formatTime(exercise.duration!)}` : exercise.reps}
                </span>
                <span className="text-xs" style={{color:'#555570'}}>·</span>
                <span className="text-xs font-mono" style={{color:'#8888a0'}}>
                  Set {setNum}/{exercise.sets}
                </span>
                <span className="text-xs" style={{color:'#555570'}}>·</span>
                <span className="text-xs font-mono" style={{color:'#8888a0'}}>
                  Rest {exercise.rest}s
                </span>
              </div>
            </div>
            {exCompleted >= exercise.sets && (
              <CheckCircle2 size={24} style={{color}} className="shrink-0"/>
            )}
          </div>

          {/* Set progress dots */}
          <div className="flex gap-2 mb-4">
            {Array.from({length: exercise.sets}).map((_,i) => (
              <div key={i} className="h-1.5 flex-1 rounded-full"
                style={{background: (completedSets[exercise.id]||[]).includes(i+1) ? color : 'rgba(255,255,255,0.08)'}}/>
            ))}
          </div>

          {/* Timer (for timed exercises) */}
          {isTimed && (
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <TimerRing seconds={timer.seconds} total={exercise.duration!} color={color}/>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="font-display text-4xl" style={{color: timer.isDone ? color : '#f0f0f5'}}>
                    {formatTime(timer.seconds)}
                  </div>
                  <div className="text-xs font-mono mt-0.5" style={{color:'#8888a0'}}>
                    {timer.isRunning ? 'running' : timer.isDone ? 'done!' : 'ready'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* HOW TO */}
          <button onClick={() => setShowDetails(s=>!s)}
            className="text-xs font-mono flex items-center gap-2 mb-2 w-full" style={{color: `${color}cc`}}>
            <span>HOW TO PERFORM</span>
            <span style={{color:'#555570'}}>{showDetails ? '▲' : '▼'}</span>
          </button>
          {showDetails && (
            <p className="text-sm leading-relaxed mb-4" style={{color:'#c0c0d0'}}>
              {exercise.how}
            </p>
          )}

          {/* Mistakes */}
          <div className="rounded-xl p-3" style={{background:'rgba(255,45,85,0.08)'}}>
            <div className="text-xs font-mono mb-2 flex items-center gap-1.5" style={{color:'#FF2D55'}}>
              <AlertTriangle size={11}/> COMMON MISTAKES
            </div>
            {exercise.mistakes.map((m,i) => (
              <div key={i} className="text-xs flex items-start gap-2 mb-1" style={{color:'#FF6B80'}}>
                <span className="shrink-0 mt-0.5">×</span><span>{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mb-4">
          {isTimed ? (
            <>
              <button onClick={timer.toggle}
                className="flex-1 py-4 rounded-2xl font-display text-lg tracking-wider flex items-center justify-center gap-2"
                style={{background: color, color:'#fff'}}>
                {timer.isRunning ? <><Pause size={18}/>PAUSE</> : <><Play size={18}/>{timer.isDone ? 'RESTART' : 'START'}</>}
              </button>
              <button onClick={() => timer.reset()}
                className="w-14 rounded-2xl glass flex items-center justify-center">
                <RotateCcw size={16} style={{color:'#8888a0'}}/>
              </button>
            </>
          ) : null}
        </div>

        {/* Complete set / next */}
        {isDone ? (
          nextSection ? (
            <Link href={`/workout/${mode}/${day}/section/${nextSection.id}`}>
              <div className="py-4 rounded-2xl font-display text-xl tracking-wider text-center"
                style={{background:`${color}22`, color, border:`1px solid ${color}44`}}>
                NEXT: {nextSection.title.toUpperCase()} →
              </div>
            </Link>
          ) : (
            <Link href={`/workout/${mode}/${day}`}>
              <div className="py-4 rounded-2xl font-display text-xl tracking-wider text-center"
                style={{background:'#34C75922', color:'#34C759', border:'1px solid #34C75944'}}>
                WORKOUT COMPLETE ✓
              </div>
            </Link>
          )
        ) : (
          <button onClick={markSetDone}
            className="w-full py-4 rounded-2xl font-display text-xl tracking-wider"
            style={{background: color, color:'#fff'}}>
            {isTimed
              ? (timer.isDone ? 'DONE — MARK SET ✓' : 'MARK SET COMPLETE ✓')
              : `SET ${setNum} COMPLETE ✓`}
          </button>
        )}
      </div>
      <div className="pb-10"/>
    </main>
  );
}
