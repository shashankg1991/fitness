'use client';
import { use, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import { BRO_SPLIT, PPL_SPLIT, BAND_SPLIT } from '@/lib/workoutData';
import { useTimer, formatTime, playRestEndSound } from '@/lib/useTimer';

// ── Section complete ──────────────────────────────────────────
function SectionComplete({ section, nextSection, mode, day, color }: any) {
  return (
    <main style={{ minHeight:'100vh', background:'#09090f', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:28 }}>
      <div style={{ fontSize:56, marginBottom:14 }}>✅</div>
      <h2 className="syne" style={{ fontSize:28, fontWeight:800, color, textAlign:'center', marginBottom:4 }}>{section.title}</h2>
      <p className="mono" style={{ fontSize:11, color:'rgba(255,255,255,0.3)', letterSpacing:3, marginBottom:44 }}>COMPLETE</p>
      {nextSection ? (
        <div style={{ width:'100%', maxWidth:340 }}>
          <p className="mono" style={{ fontSize:10, letterSpacing:3, color:'rgba(255,255,255,0.25)', textAlign:'center', marginBottom:12 }}>NEXT SECTION</p>
          <Link href={`/workout/${mode}/${day}/section/${nextSection.id}`} style={{ textDecoration:'none', display:'block', marginBottom:12 }}>
            <div style={{ background:`${color}14`, border:`1px solid ${color}30`, borderRadius:20, padding:'20px 24px', display:'flex', alignItems:'center', gap:16 }}>
              <span style={{ fontSize:28 }}>{nextSection.icon}</span>
              <div>
                <h3 className="syne" style={{ fontSize:20, fontWeight:800, color:'#fff', marginBottom:2 }}>{nextSection.title}</h3>
                <p style={{ fontSize:13, color:'rgba(255,255,255,0.35)' }}>{nextSection.exercises.length} exercises</p>
              </div>
            </div>
          </Link>
          <Link href={`/workout/${mode}/${day}`} style={{ textDecoration:'none' }}>
            <p style={{ textAlign:'center', fontSize:13, color:'rgba(255,255,255,0.25)', padding:12, fontFamily:'DM Sans,sans-serif' }}>← day overview</p>
          </Link>
        </div>
      ) : (
        <Link href={`/workout/${mode}/${day}`} style={{ textDecoration:'none', width:'100%', maxWidth:300, display:'block' }}>
          <div style={{ background:'rgba(48,209,88,0.12)', border:'1px solid rgba(48,209,88,0.25)', borderRadius:18, padding:18, textAlign:'center' }}>
            <p className="syne" style={{ fontSize:20, fontWeight:800, color:'#30d158' }}>Workout Complete 🎉</p>
          </div>
        </Link>
      )}
    </main>
  );
}

// ── Rest screen ───────────────────────────────────────────────
function RestScreen({ restSecs, nextLabel, onNext, onPrev, color, timer }: any) {
  const circ = 2 * Math.PI * 54;
  const pct = restSecs > 0 ? Math.max(0, (restSecs - timer.seconds) / restSecs) : 0;
  return (
    <main style={{ minHeight:'100vh', background:'#09090f', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 28px' }}>
      <p className="mono" style={{ fontSize:10, letterSpacing:5, color:'rgba(255,255,255,0.22)', marginBottom:36 }}>REST</p>
      <div style={{ position:'relative', width:190, height:190, marginBottom:28 }}>
        <svg width={190} height={190} viewBox="0 0 190 190" style={{ transform:'rotate(-90deg)', position:'absolute', inset:0 }}>
          <circle cx={95} cy={95} r={54} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={11}/>
          <circle cx={95} cy={95} r={54} fill="none" stroke={color} strokeWidth={11}
            strokeDasharray={circ} strokeDashoffset={circ*(1-pct)}
            strokeLinecap="round" style={{ transition:'stroke-dashoffset 1s linear' }}/>
        </svg>
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
          <span className="syne" style={{ fontSize: timer.seconds > 9 ? 68 : 80, fontWeight:800, color: timer.seconds <= 3 ? color : '#fff', lineHeight:1 }}>
            {timer.seconds}
          </span>
          <span className="mono" style={{ fontSize:10, color:'rgba(255,255,255,0.3)', letterSpacing:2, marginTop:4 }}>SECONDS</span>
        </div>
      </div>
      <div style={{ textAlign:'center', marginBottom:40 }}>
        <p style={{ fontSize:12, color:'rgba(255,255,255,0.28)', marginBottom:5, fontFamily:'DM Sans,sans-serif' }}>Next up</p>
        <p className="syne" style={{ fontSize:18, fontWeight:700, color:'#fff', padding:'0 24px', lineHeight:1.3 }}>{nextLabel}</p>
      </div>
      <div style={{ display:'flex', gap:10, width:'100%', maxWidth:290 }}>
        <button onClick={onPrev} style={{ flex:1, padding:'16px 0', borderRadius:100, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.05)', color:'rgba(255,255,255,0.6)', fontFamily:'Syne,sans-serif', fontSize:16, fontWeight:800, cursor:'pointer' }}>PREV</button>
        <button onClick={onNext} style={{ flex:1, padding:'16px 0', borderRadius:100, border:'none', background:color, color:color==='#ffd60a'?'#000':'#fff', fontFamily:'Syne,sans-serif', fontSize:16, fontWeight:800, cursor:'pointer' }}>NEXT</button>
      </div>
    </main>
  );
}

// ── Main page ─────────────────────────────────────────────────
export default function SectionPage({ params }: { params: Promise<{ mode:string; day:string; sectionId:string }> }) {
  const { mode, day, sectionId } = use(params);
  const split = mode === 'ppl' ? PPL_SPLIT : mode === 'band' ? BAND_SPLIT : BRO_SPLIT;
  const dayData = split.find(d => d.day === parseInt(day));
  const section = dayData?.sections.find(s => s.id === sectionId);

  // Flat queue of (exercise, setIdx) pairs
  const exercises = section?.exercises ?? [];
  const queue = exercises.flatMap(ex => Array.from({ length: ex.sets }, (_, i) => ({ ex, setIdx: i+1 })));

  const [pos, setPos] = useState(0);
  const [phase, setPhase] = useState<'exercise'|'rest'>('exercise');
  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState(false);
  const [showHow, setShowHow] = useState(false);

  const cur = queue[pos] ?? null;
  const nxt = queue[pos+1] ?? null;

  const color =
    section?.id==='warmup'   ? '#ffd60a' :
    section?.id==='abs'      ? '#5ac8fa' :
    section?.id==='cooldown' ? '#4eb8ff' :
    section?.id==='backpain' ? '#bf5af2' :
    dayData?.color ?? '#ff6b35';

  const sectionIdx = dayData?.sections.findIndex(s => s.id === sectionId) ?? -1;
  const nextSection = sectionIdx >= 0 ? dayData?.sections[sectionIdx+1] : undefined;

  // Compute which sets are completed for each exercise
  const completedSetsByExId: Record<string, number> = {};
  for (let i = 0; i < pos; i++) {
    const { ex } = queue[i];
    completedSetsByExId[ex.id] = (completedSetsByExId[ex.id] ?? 0) + 1;
  }
  if (cur && phase === 'rest') {
    completedSetsByExId[cur.ex.id] = (completedSetsByExId[cur.ex.id] ?? 0) + 1;
  }

  useEffect(() => {
    const iv = setInterval(() => setElapsed(e => e+1), 1000);
    return () => clearInterval(iv);
  }, []);

  const advance = useCallback(() => {
    if (phase === 'rest') {
      playRestEndSound();
      if (pos+1 < queue.length) { setPos(p => p+1); setPhase('exercise'); }
      else setDone(true);
    } else {
      if ((cur?.ex.rest ?? 0) > 0) setPhase('rest');
      else {
        if (pos+1 < queue.length) { setPos(p => p+1); setPhase('exercise'); }
        else setDone(true);
      }
    }
  }, [phase, pos, queue.length, cur]);

  const goBack = useCallback(() => {
    if (phase === 'rest') { setPhase('exercise'); return; }
    if (pos > 0) { setPos(p => p-1); setPhase('exercise'); }
  }, [phase, pos]);

  const jumpToExercise = useCallback((exId: string) => {
    const firstIdx = queue.findIndex(q => q.ex.id === exId);
    if (firstIdx >= 0) { setPos(firstIdx); setPhase('exercise'); setDone(false); }
  }, [queue]);

  const isTimed = phase==='exercise' && !!cur?.ex.duration;
  const timerSecs = phase==='rest' ? (cur?.ex.rest ?? 60) : (cur?.ex.duration ?? 0);
  const timer = useTimer(timerSecs, advance);

  useEffect(() => {
    timer.reset(timerSecs);
    if (phase==='rest') setTimeout(() => timer.start(), 200);
    else if (isTimed) setTimeout(() => timer.start(), 500);
    setShowHow(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos, phase]);

  if (!section || !dayData || queue.length===0)
    return <div style={{ background:'#09090f', color:'#fff', minHeight:'100vh', padding:24 }}>Not found.</div>;

  if (done) return <SectionComplete section={section} nextSection={nextSection} mode={mode} day={day} color={color}/>;
  if (phase==='rest' && cur) {
    const nextLabel = nxt ? `${nxt.ex.name}  ·  Set ${nxt.setIdx}/${nxt.ex.sets}` : 'Section complete!';
    return <RestScreen restSecs={cur.ex.rest} nextLabel={nextLabel} onNext={advance} onPrev={goBack} color={color} timer={timer}/>;
  }
  if (!cur) return null;

  const { ex } = cur;
  const progressPct = (pos / Math.max(1, queue.length)) * 100;

  return (
    <main style={{ height:'100vh', background:'#09090f', display:'flex', flexDirection:'column', overflow:'hidden' }}>

      {/* ── TOP HEADER ── */}
      <div style={{ padding:'44px 20px 12px', display:'flex', alignItems:'center', gap:12, flexShrink:0 }}>
        <Link href={`/workout/${mode}/${day}`} style={{ width:36,height:36,borderRadius:18,background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none',flexShrink:0 }}>
          <ArrowLeft size={15} color="rgba(255,255,255,0.7)"/>
        </Link>
        <div style={{ flex:1, minWidth:0 }}>
          <p className="mono" style={{ fontSize:10, letterSpacing:2, color, marginBottom:1 }}>{section.icon} {section.title.toUpperCase()}</p>
          <p className="mono" style={{ fontSize:10, color:'rgba(255,255,255,0.3)' }}>{dayData.muscle} · {dayData.badge}</p>
        </div>
        <div style={{ textAlign:'right', flexShrink:0 }}>
          <p className="mono" style={{ fontSize:11, color }}>{formatTime(elapsed)}</p>
          <p className="mono" style={{ fontSize:10, color:'rgba(255,255,255,0.3)' }}>elapsed</p>
        </div>
      </div>

      {/* ── PROGRESS BAR ── */}
      <div style={{ height:2, background:'rgba(255,255,255,0.07)', flexShrink:0 }}>
        <div style={{ height:'100%', background:color, width:`${progressPct}%`, transition:'width 0.4s ease' }}/>
      </div>

      {/* ── EXERCISE LIST — always visible, scrollable ── */}
      <div style={{ flexShrink:0, padding:'14px 20px 0', overflowX:'auto' }}>
        <div style={{ display:'flex', gap:8, paddingBottom:2, minWidth:'max-content' }}>
          {exercises.map((ex_item, exI) => {
            const setsCompleted = completedSetsByExId[ex_item.id] ?? 0;
            const isCurrent = cur && ex_item.id === cur.ex.id;
            const isFullyDone = setsCompleted >= ex_item.sets;
            return (
              <button
                key={ex_item.id}
                onClick={() => jumpToExercise(ex_item.id)}
                style={{
                  display:'flex', alignItems:'center', gap:7,
                  padding:'8px 14px', borderRadius:100, border:'none', cursor:'pointer',
                  background: isCurrent ? color
                             : isFullyDone ? `${color}22`
                             : 'rgba(255,255,255,0.05)',
                  flexShrink:0, transition:'all 0.2s',
                }}>
                {isFullyDone && !isCurrent ? (
                  <Check size={11} color={color}/>
                ) : (
                  <span className="mono" style={{ fontSize:10, color: isCurrent ? (color==='#ffd60a'?'#000':'#fff') : 'rgba(255,255,255,0.35)', lineHeight:1 }}>
                    {exI+1}
                  </span>
                )}
                <span style={{
                  fontFamily:'DM Sans,sans-serif', fontSize:12, fontWeight:500,
                  color: isCurrent ? (color==='#ffd60a'?'#000':'#fff')
                        : isFullyDone ? color
                        : 'rgba(255,255,255,0.55)',
                  whiteSpace:'nowrap',
                }}>
                  {ex_item.name}
                </span>
                {/* Set progress dots */}
                <div style={{ display:'flex', gap:3 }}>
                  {Array.from({length:ex_item.sets}).map((_,si) => (
                    <div key={si} style={{
                      width:5, height:5, borderRadius:3,
                      background: si < setsCompleted ? (isCurrent ? (color==='#ffd60a'?'#000':'rgba(255,255,255,0.6)') : color)
                                 : si === setsCompleted && isCurrent ? 'rgba(255,255,255,0.35)'
                                 : 'rgba(255,255,255,0.12)',
                      transition:'background 0.25s',
                    }}/>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── CURRENT EXERCISE INFO ── */}
      <div style={{ flex:1, padding:'16px 20px 0', overflow:'auto', minHeight:0, display:'flex', flexDirection:'column' }}>

        {/* Exercise name */}
        <h1 className="syne" style={{ fontSize:26, fontWeight:800, color:'#fff', lineHeight:1.1, marginBottom:10 }}>{ex.name}</h1>

        {/* Stat chips */}
        <div style={{ display:'flex', gap:7, flexWrap:'wrap', marginBottom:16 }}>
          <span className="mono" style={{ fontSize:12, color, background:`${color}18`, padding:'5px 12px', borderRadius:100 }}>
            {isTimed ? formatTime(ex.duration!) : ex.reps}
          </span>
          <span className="mono" style={{ fontSize:12, color:'rgba(255,255,255,0.4)', background:'rgba(255,255,255,0.06)', padding:'5px 12px', borderRadius:100 }}>
            Set {cur.setIdx}/{ex.sets}
          </span>
          <span className="mono" style={{ fontSize:12, color:'rgba(255,255,255,0.3)', background:'rgba(255,255,255,0.04)', padding:'5px 12px', borderRadius:100 }}>
            {ex.rest}s rest
          </span>
        </div>

        {/* Set dots */}
        <div style={{ display:'flex', gap:6, marginBottom:20 }}>
          {Array.from({length:ex.sets}).map((_,i)=>(
            <div key={i} style={{ height:4, flex:1, borderRadius:2, background: i<cur.setIdx-1 ? color : i===cur.setIdx-1 ? `${color}55` : 'rgba(255,255,255,0.08)', transition:'background 0.3s' }}/>
          ))}
        </div>

        {/* Timer for timed exercises */}
        {isTimed && (
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:20, padding:'16px 20px', background:'rgba(255,255,255,0.04)', borderRadius:18, border:'1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ position:'relative', width:70, height:70, flexShrink:0 }}>
              <svg width={70} height={70} viewBox="0 0 70 70" style={{ transform:'rotate(-90deg)', position:'absolute', inset:0 }}>
                <circle cx={35} cy={35} r={28} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={8}/>
                <circle cx={35} cy={35} r={28} fill="none" stroke={color} strokeWidth={8}
                  strokeDasharray={2*Math.PI*28}
                  strokeDashoffset={2*Math.PI*28*(1 - (ex.duration!-timer.seconds)/ex.duration!)}
                  strokeLinecap="round" style={{ transition:'stroke-dashoffset 1s linear' }}/>
              </svg>
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span className="syne" style={{ fontSize:20, fontWeight:800, color:timer.isDone?'#30d158':'#fff', lineHeight:1 }}>{timer.seconds}</span>
              </div>
            </div>
            <div>
              <p className="mono" style={{ fontSize:10, color:'rgba(255,255,255,0.3)', letterSpacing:2, marginBottom:6 }}>
                {timer.isRunning ? 'RUNNING' : timer.isDone ? 'DONE' : 'READY TO START'}
              </p>
              <button onClick={timer.toggle} style={{ background:color, border:'none', borderRadius:100, padding:'8px 20px', cursor:'pointer', fontFamily:'Syne,sans-serif', fontSize:14, fontWeight:700, color:color==='#ffd60a'?'#000':'#fff' }}>
                {timer.isRunning ? '⏸ Pause' : timer.isDone ? '↺ Restart' : '▶ Start'}
              </button>
            </div>
          </div>
        )}

        {/* How-to */}
        <div style={{ flex:1, minHeight:0 }}>
          <button onClick={()=>setShowHow(s=>!s)} style={{ background:'none', border:'none', padding:'0 0 8px', cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}>
            <span className="mono" style={{ fontSize:10, letterSpacing:2, color:`${color}cc` }}>HOW TO</span>
            <span style={{ color:'rgba(255,255,255,0.25)', fontSize:9 }}>{showHow?'▲':'▼'}</span>
          </button>
          {showHow && (
            <div style={{ background:'rgba(255,255,255,0.03)', borderRadius:14, padding:'14px 16px', marginBottom:12 }}>
              <p style={{ fontSize:13, color:'rgba(255,255,255,0.6)', lineHeight:1.7, marginBottom:12 }}>{ex.how}</p>
              {ex.mistakes.map((m,i)=>(
                <div key={i} style={{ display:'flex', gap:8, marginBottom:5 }}>
                  <span style={{ color:'#ff375f', fontSize:12, flexShrink:0 }}>×</span>
                  <span style={{ fontSize:12, color:'rgba(255,60,76,0.85)', lineHeight:1.5 }}>{m}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── PREV | NEXT ── */}
      <div style={{ padding:'12px 20px', paddingBottom:'max(20px,env(safe-area-inset-bottom))', flexShrink:0 }}>
        {/* Next preview */}
        {nxt && (
          <div style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 14px', marginBottom:10, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:12 }}>
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ fontSize:12, color:'rgba(255,255,255,0.55)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', fontFamily:'DM Sans,sans-serif' }}>{nxt.ex.name}</p>
              <p className="mono" style={{ fontSize:10, color:'rgba(255,255,255,0.28)', marginTop:1 }}>
                {nxt.ex.reps ?? formatTime(nxt.ex.duration!)} · set {nxt.setIdx}/{nxt.ex.sets}
              </p>
            </div>
            <span className="mono" style={{ fontSize:10, color, flexShrink:0 }}>NEXT</span>
          </div>
        )}
        <div style={{ display:'flex', gap:10 }}>
          <button onClick={goBack} disabled={pos===0}
            style={{ flex:1, padding:'16px 0', borderRadius:100, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.05)', color:pos===0?'rgba(255,255,255,0.2)':'rgba(255,255,255,0.7)', fontFamily:'Syne,sans-serif', fontSize:16, fontWeight:800, cursor:pos===0?'default':'pointer' }}>
            PREV
          </button>
          <button onClick={advance}
            style={{ flex:1, padding:'16px 0', borderRadius:100, border:'none', background:color, color:color==='#ffd60a'?'#000':'#fff', fontFamily:'Syne,sans-serif', fontSize:16, fontWeight:800, cursor:'pointer' }}>
            {pos===queue.length-1 ? 'FINISH ✓' : isTimed && !timer.isDone ? 'DONE ✓' : 'NEXT'}
          </button>
        </div>
      </div>

    </main>
  );
}
