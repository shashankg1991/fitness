'use client';
import { use, useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Pause, RotateCcw, SkipForward, CheckCircle2, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';
import { BRO_SPLIT, PPL_SPLIT } from '@/lib/workoutData';
import { useTimer, formatTime } from '@/lib/useTimer';

// ── Timer ring SVG ─────────────────────────────────────────────
function Ring({ s, total, color, size = 160 }: { s: number; total: number; color: string; size?: number }) {
  const r = size / 2 - 10;
  const c = 2 * Math.PI * r;
  const pct = total > 0 ? Math.max(0, (total - s) / total) : 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={10} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={10}
        strokeDasharray={c} strokeDashoffset={c * (1 - pct)} strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s linear' }} />
    </svg>
  );
}

// ── Phase types ────────────────────────────────────────────────
type Phase = 'exercise' | 'rest' | 'done';

// ── Main page ─────────────────────────────────────────────────
export default function SectionPage({ params }: { params: Promise<{ mode: string; day: string; sectionId: string }> }) {
  const { mode, day, sectionId } = use(params);
  const split = mode === 'ppl' ? PPL_SPLIT : BRO_SPLIT;
  const dayData = split.find(d => d.day === parseInt(day));
  const section = dayData?.sections.find(s => s.id === sectionId);

  // Current position in the flat list of (exercise, set) pairs
  const [exIdx, setExIdx] = useState(0);
  const [setNum, setSetNum] = useState(1);
  const [phase, setPhase] = useState<Phase>('exercise');
  const [showHow, setShowHow] = useState(true);
  const [sectionDone, setSectionDone] = useState(false);

  const exercise = section?.exercises[exIdx];
  const totalEx = section?.exercises.length ?? 0;

  const color =
    section?.id === 'warmup'   ? '#F5C842' :
    section?.id === 'abs'      ? '#00C7BE' :
    section?.id === 'cooldown' ? '#64B4FF' :
    section?.id === 'backpain' ? '#8E8EFF' :
    dayData?.color ?? '#FF6B35';

  const isTimed = !!exercise?.duration;
  const timerSecs = phase === 'rest' ? (exercise?.rest ?? 60) : (exercise?.duration ?? 0);

  // Advance logic — called when timer completes or user taps done
  const advance = useCallback(() => {
    if (!exercise || !section) return;
    if (phase === 'rest') {
      // After rest: go to next set or next exercise
      if (setNum < exercise.sets) {
        setSetNum(s => s + 1);
        setPhase('exercise');
      } else {
        const nextIdx = exIdx + 1;
        if (nextIdx < totalEx) {
          setExIdx(nextIdx);
          setSetNum(1);
          setPhase('exercise');
        } else {
          setSectionDone(true);
        }
      }
    } else {
      // After exercise: go to rest
      setPhase('rest');
    }
  }, [phase, setNum, exercise, exIdx, totalEx, section]);

  const timer = useTimer(timerSecs, advance);

  // Reset timer whenever phase/exercise/set changes
  useEffect(() => {
    timer.reset(timerSecs);
    // Auto-start rest timer
    if (phase === 'rest') {
      setTimeout(() => timer.start(), 100);
    }
    // Auto-start timed exercises
    if (phase === 'exercise' && isTimed) {
      setTimeout(() => timer.start(), 300);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, exIdx, setNum]);

  const sectionIdx = dayData?.sections.findIndex(s => s.id === sectionId) ?? -1;
  const nextSection = sectionIdx >= 0 ? dayData?.sections[sectionIdx + 1] : undefined;
  const prevSection = sectionIdx > 0 ? dayData?.sections[sectionIdx - 1] : undefined;

  // Jump directly to an exercise
  const jumpTo = (i: number) => {
    setExIdx(i); setSetNum(1); setPhase('exercise'); setSectionDone(false);
  };

  if (!section || !exercise || !dayData) {
    return <main style={{ minHeight: '100vh', background: '#0a0a0f', padding: 40 }}><p style={{ color: '#f0f0f5' }}>Not found.</p></main>;
  }

  const progressPct = ((exIdx + (setNum - 1) / Math.max(1, exercise.sets)) / Math.max(1, totalEx)) * 100;

  // ── Section Complete Screen ────────────────────────────────
  if (sectionDone) {
    return (
      <main style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>{section.icon}</div>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 38, letterSpacing: 3, color, marginBottom: 8, textAlign: 'center' }}>
          {section.title.toUpperCase()}
        </h1>
        <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, color: '#34C759', letterSpacing: 2, marginBottom: 40 }}>COMPLETE ✓</p>

        {nextSection ? (
          <div style={{ width: '100%', maxWidth: 340 }}>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#8888a0', textAlign: 'center', marginBottom: 16, letterSpacing: 2 }}>NEXT UP</p>
            <Link href={`/workout/${mode}/${day}/section/${nextSection.id}`} style={{ display: 'block' }}>
              <div style={{ background: `${color}18`, border: `1px solid ${color}50`, borderRadius: 20, padding: '20px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{nextSection.icon}</div>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 26, letterSpacing: 2, color }}>{nextSection.title.toUpperCase()}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#8888a0', marginTop: 6 }}>
                  {nextSection.exercises.length} exercises
                </div>
              </div>
            </Link>
            <div style={{ height: 16 }} />
            <Link href={`/workout/${mode}/${day}`} style={{ display: 'block' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '14px 0', textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#8888a0' }}>
                ← Back to day overview
              </div>
            </Link>
          </div>
        ) : (
          <div style={{ width: '100%', maxWidth: 340 }}>
            <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, color: '#34C759', textAlign: 'center', marginBottom: 24, letterSpacing: 2 }}>FULL WORKOUT DONE!</p>
            <Link href={`/workout/${mode}/${day}`} style={{ display: 'block' }}>
              <div style={{ background: '#34C75920', border: '1px solid #34C75944', borderRadius: 18, padding: '18px 0', textAlign: 'center', fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, letterSpacing: 2, color: '#34C759' }}>
                ← BACK TO DAY
              </div>
            </Link>
          </div>
        )}
      </main>
    );
  }

  // ── REST PHASE ─────────────────────────────────────────────
  if (phase === 'rest') {
    return (
      <main style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        {/* mini header */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '32px 20px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href={`/workout/${mode}/${day}`} style={{ width: 34, height: 34, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowLeft size={14} color="#f0f0f5" />
          </Link>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#8888a0', letterSpacing: 2 }}>
            {section.title.toUpperCase()} · EX {exIdx+1}/{totalEx} · SET {setNum}/{exercise.sets}
          </span>
        </div>

        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: 4, color: '#8888a0', marginBottom: 12 }}>REST</p>

        <div style={{ position: 'relative', width: 180, height: 180, marginBottom: 8 }}>
          <Ring s={timer.seconds} total={exercise.rest} color={color} size={180} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 58, color, lineHeight: 1 }}>{formatTime(timer.seconds)}</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#8888a0', marginTop: 4 }}>
              {timer.isRunning ? 'resting…' : 'paused'}
            </span>
          </div>
        </div>

        {/* what's coming */}
        <div style={{ marginBottom: 32, textAlign: 'center', padding: '0 24px' }}>
          {setNum < exercise.sets ? (
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#8888a0' }}>
              Next → <span style={{ color: '#f0f0f5' }}>{exercise.name}</span> · Set {setNum + 1}/{exercise.sets}
            </p>
          ) : exIdx + 1 < totalEx ? (
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#8888a0' }}>
              Next → <span style={{ color: '#f0f0f5' }}>{section.exercises[exIdx + 1].name}</span>
            </p>
          ) : (
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#34C759' }}>Last rest — section almost done!</p>
          )}
        </div>

        <div style={{ display: 'flex', gap: 12, width: '100%', maxWidth: 300 }}>
          <button onClick={timer.toggle} style={{ flex: 1, padding: '14px 0', borderRadius: 16, border: 'none', background: timer.isRunning ? 'rgba(255,255,255,0.08)' : color, color: '#fff', cursor: 'pointer', fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, letterSpacing: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            {timer.isRunning ? <><Pause size={18}/>&nbsp;PAUSE</> : <><Play size={18}/>&nbsp;RESUME</>}
          </button>
          <button onClick={advance} style={{ padding: '14px 18px', borderRadius: 16, border: `1px solid ${color}50`, background: `${color}15`, color, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Bebas Neue, sans-serif', fontSize: 16, letterSpacing: 1 }}>
            <SkipForward size={16}/> SKIP
          </button>
        </div>
      </main>
    );
  }

  // ── EXERCISE PHASE ────────────────────────────────────────────
  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{ padding: '32px 20px 10px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href={`/workout/${mode}/${day}`} style={{ width: 34, height: 34, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <ArrowLeft size={14} color="#f0f0f5" />
        </Link>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 13, letterSpacing: 2, color, marginBottom: 1 }}>{section.title}</div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#8888a0' }}>{dayData.muscle} · {dayData.badge}</div>
        </div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#8888a0', textAlign: 'right' }}>
          Ex {exIdx+1}/{totalEx}<br/>
          <span style={{ color }}>Set {setNum}/{exercise.sets}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ margin: '0 20px 14px', height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
        <div style={{ height: '100%', borderRadius: 2, background: color, width: `${Math.min(100,progressPct)}%`, transition: 'width 0.4s ease' }} />
      </div>

      {/* Exercise jump nav */}
      <div style={{ display: 'flex', gap: 6, padding: '0 20px', marginBottom: 12, overflowX: 'auto', paddingBottom: 2 }}>
        {section.exercises.map((ex, i) => (
          <button key={ex.id} onClick={() => jumpTo(i)} style={{
            flexShrink: 0, height: 30, padding: '0 10px', borderRadius: 8,
            fontFamily: 'JetBrains Mono, monospace', fontSize: 10, whiteSpace: 'nowrap',
            cursor: 'pointer',
            background: i === exIdx ? color : i < exIdx ? `${color}25` : 'rgba(255,255,255,0.05)',
            color: i === exIdx ? '#fff' : i < exIdx ? color : '#8888a0',
            border: i < exIdx ? `1px solid ${color}40` : '1px solid transparent',
          }}>
            {i < exIdx ? '✓ ' : ''}{ex.name.split(' ').slice(-1)[0]}
          </button>
        ))}
      </div>

      {/* Exercise image */}
      {exercise.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={exercise.image} alt={exercise.name}
          style={{ margin: '0 20px 14px', borderRadius: 16, height: 150, objectFit: 'cover', width: 'calc(100% - 40px)' }} />
      )}

      {/* Main card */}
      <div style={{ margin: '0 20px', flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 20, marginBottom: 16 }}>

        {/* Exercise name + meta */}
        <div style={{ marginBottom: 14 }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, letterSpacing: 1, color: '#f0f0f5', margin: '0 0 6px', lineHeight: 1.1 }}>{exercise.name}</h2>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color }}>{isTimed ? formatTime(exercise.duration!) : exercise.reps}</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#8888a0' }}>{exercise.sets} sets total</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#555570' }}>Rest {exercise.rest}s</span>
          </div>
        </div>

        {/* Set dots */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
          {Array.from({ length: exercise.sets }).map((_, i) => (
            <div key={i} style={{ height: 5, flex: 1, borderRadius: 3, background: i < setNum - 1 ? color : i === setNum - 1 ? `${color}66` : 'rgba(255,255,255,0.08)', transition: 'background 0.3s' }} />
          ))}
        </div>

        {/* Timer for timed exercises */}
        {isTimed && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ position: 'relative', width: 160, height: 160, marginBottom: 14 }}>
              <Ring s={timer.seconds} total={exercise.duration!} color={color} size={160} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 50, color: timer.isDone ? '#34C759' : '#f0f0f5', lineHeight: 1 }}>{formatTime(timer.seconds)}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#8888a0', marginTop: 4 }}>
                  {timer.isRunning ? 'running' : timer.isDone ? 'done!' : 'tap to start'}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, width: '100%', maxWidth: 260 }}>
              <button onClick={timer.toggle} style={{ flex: 1, padding: '12px 0', borderRadius: 14, border: 'none', background: timer.isRunning ? 'rgba(255,255,255,0.08)' : color, color: '#fff', cursor: 'pointer', fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, letterSpacing: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {timer.isRunning ? <><Pause size={16}/>&nbsp;PAUSE</> : <><Play size={16}/>&nbsp;{timer.isDone ? 'RESTART' : 'START'}</>}
              </button>
              <button onClick={() => timer.reset(exercise.duration!)} style={{ width: 46, borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#8888a0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <RotateCcw size={14} />
              </button>
            </div>
          </div>
        )}

        {/* HOW TO */}
        <button onClick={() => setShowHow(s => !s)} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: 2, color: `${color}cc`, cursor: 'pointer', padding: '4px 0 6px', display: 'flex', alignItems: 'center', gap: 6 }}>
          HOW TO PERFORM <span style={{ color: '#555570', fontSize: 9 }}>{showHow ? '▲' : '▼'}</span>
        </button>
        {showHow && (
          <p style={{ fontSize: 13, lineHeight: 1.7, color: '#c0c0d0', margin: '0 0 14px' }}>{exercise.how}</p>
        )}

        {/* Mistakes */}
        <div style={{ background: 'rgba(255,45,85,0.08)', borderRadius: 12, padding: '10px 12px' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: 2, color: '#FF2D55', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 5 }}>
            <AlertTriangle size={11} /> COMMON MISTAKES
          </div>
          {exercise.mistakes.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 4, alignItems: 'flex-start' }}>
              <span style={{ color: '#FF6B80', fontSize: 11, flexShrink: 0, marginTop: 1 }}>×</span>
              <span style={{ color: '#FF8899', fontSize: 12, lineHeight: 1.5 }}>{m}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '0 20px 36px', display: 'flex', gap: 10 }}>
        <button onClick={advance} style={{ flex: 1, padding: '16px 0', borderRadius: 18, border: 'none', background: color, color: '#fff', cursor: 'pointer', fontFamily: 'Bebas Neue, sans-serif', fontSize: 20, letterSpacing: 2 }}>
          {isTimed
            ? (timer.isDone ? `SET ${setNum} DONE — NEXT ✓` : `SET ${setNum} COMPLETE ✓`)
            : `SET ${setNum} COMPLETE ✓`}
        </button>
        {exIdx < totalEx - 1 || setNum < exercise.sets ? (
          <button onClick={() => advance()} style={{ padding: '16px 14px', borderRadius: 18, border: `1px solid ${color}40`, background: `${color}12`, color, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <SkipForward size={18}/>
          </button>
        ) : null}
      </div>

    </main>
  );
}
