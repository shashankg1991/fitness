'use client';
import { use, useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BRO_SPLIT, PPL_SPLIT } from '@/lib/workoutData';
import { useTimer, formatTime } from '@/lib/useTimer';
import { getExerciseGifUrl, fetchGiphyFallback } from '@/lib/exerciseMedia';

// ── GIF Component ──────────────────────────────────────────────
function ExerciseGif({ name, color }: { name: string; color: string }) {
  const [src, setSrc] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');
  const prevName = useRef('');

  useEffect(() => {
    if (prevName.current === name) return;
    prevName.current = name;
    setStatus('loading');
    setSrc(null);

    const mwUrl = getExerciseGifUrl(name);
    if (mwUrl) {
      const img = new window.Image();
      img.onload = () => { setSrc(mwUrl); setStatus('ok'); };
      img.onerror = () => {
        fetchGiphyFallback(name).then(url => {
          if (url) { setSrc(url); setStatus('ok'); }
          else setStatus('error');
        });
      };
      img.src = mwUrl;
    } else {
      fetchGiphyFallback(name).then(url => {
        if (url) { setSrc(url); setStatus('ok'); }
        else setStatus('error');
      });
    }
  }, [name]);

  return (
    <div style={{ width:'100%', height:'100%', position:'relative', overflow:'hidden', background:'#111117' }}>
      {status === 'loading' && (
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ width:40, height:40, borderRadius:20, border:`3px solid ${color}30`, borderTopColor:color, animation:'spin 0.7s linear infinite' }}/>
        </div>
      )}
      {src && (
        <img src={src} alt={name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top' }} />
      )}
      {status === 'error' && (
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:10 }}>
          <span style={{ fontSize:48 }}>💪</span>
          <span style={{ fontSize:14, color:'rgba(255,255,255,0.35)', textAlign:'center', padding:'0 24px', fontFamily:'DM Sans,sans-serif' }}>{name}</span>
        </div>
      )}
      {status === 'ok' && (
        <div style={{ position:'absolute', bottom:10, right:10, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(6px)', borderRadius:6, padding:'3px 8px' }}>
          <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'rgba(255,255,255,0.45)', letterSpacing:1 }}>MUSCLEWIKI</span>
        </div>
      )}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

// ── Section complete ───────────────────────────────────────────
function SectionComplete({ section, nextSection, mode, day, color }: any) {
  return (
    <main style={{ minHeight:'100vh', background:'#09090f', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:28 }}>
      <div style={{ fontSize:64, marginBottom:16 }}>✅</div>
      <h2 className="syne" style={{ fontSize:30, fontWeight:800, color, textAlign:'center', marginBottom:4 }}>{section.title}</h2>
      <p className="mono" style={{ fontSize:11, color:'rgba(255,255,255,0.3)', letterSpacing:3, marginBottom:48 }}>SECTION COMPLETE</p>
      {nextSection ? (
        <div style={{ width:'100%', maxWidth:340 }}>
          <p className="mono" style={{ fontSize:10, letterSpacing:3, color:'rgba(255,255,255,0.25)', textAlign:'center', marginBottom:14 }}>NEXT UP</p>
          <Link href={`/workout/${mode}/${day}/section/${nextSection.id}`} style={{ textDecoration:'none', display:'block' }}>
            <div style={{ background:`${color}14`, border:`1px solid ${color}30`, borderRadius:24, padding:24, textAlign:'center', marginBottom:12 }}>
              <div style={{ fontSize:32, marginBottom:10 }}>{nextSection.icon}</div>
              <h3 className="syne" style={{ fontSize:22, fontWeight:800, color:'#fff', marginBottom:4 }}>{nextSection.title}</h3>
              <p style={{ fontSize:13, color:'rgba(255,255,255,0.35)' }}>{nextSection.exercises.length} exercises</p>
            </div>
          </Link>
          <Link href={`/workout/${mode}/${day}`} style={{ textDecoration:'none' }}>
            <p style={{ textAlign:'center', fontSize:13, color:'rgba(255,255,255,0.25)', padding:16, fontFamily:'DM Sans,sans-serif' }}>← day overview</p>
          </Link>
        </div>
      ) : (
        <Link href={`/workout/${mode}/${day}`} style={{ textDecoration:'none', width:'100%', maxWidth:300, display:'block' }}>
          <div style={{ background:'rgba(48,209,88,0.12)', border:'1px solid rgba(48,209,88,0.25)', borderRadius:20, padding:20, textAlign:'center' }}>
            <p className="syne" style={{ fontSize:20, fontWeight:800, color:'#30d158' }}>Workout Complete 🎉</p>
          </div>
        </Link>
      )}
    </main>
  );
}

// ── REST SCREEN ────────────────────────────────────────────────
function RestScreen({ restSecs, nextLabel, onNext, onPrev, color, timer }: {
  restSecs:number; nextLabel:string; onNext:()=>void; onPrev:()=>void; color:string; timer:any;
}) {
  const circ = 2 * Math.PI * 54;
  const pct = restSecs > 0 ? Math.max(0,(restSecs - timer.seconds)/restSecs) : 0;

  return (
    <main style={{ minHeight:'100vh', background:'#09090f', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 28px' }}>
      <p className="mono" style={{ fontSize:10, letterSpacing:5, color:'rgba(255,255,255,0.22)', marginBottom:40 }}>REST</p>

      {/* Ring */}
      <div style={{ position:'relative', width:200, height:200, marginBottom:32 }}>
        <svg width={200} height={200} viewBox="0 0 200 200" style={{ transform:'rotate(-90deg)', position:'absolute', inset:0 }}>
          <circle cx={100} cy={100} r={54} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={12}/>
          <circle cx={100} cy={100} r={54} fill="none" stroke={color} strokeWidth={12}
            strokeDasharray={circ} strokeDashoffset={circ*(1-pct)}
            strokeLinecap="round" style={{ transition:'stroke-dashoffset 1s linear' }}/>
        </svg>
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
          <span className="syne" style={{
            fontSize: timer.seconds > 9 ? 72 : 86, fontWeight:800,
            color: timer.seconds <= 3 ? color : '#fff', lineHeight:1,
          }}>
            {timer.seconds}
          </span>
          <span className="mono" style={{ fontSize:10, color:'rgba(255,255,255,0.3)', letterSpacing:2, marginTop:4 }}>SECONDS</span>
        </div>
      </div>

      {/* Next up */}
      <div style={{ textAlign:'center', marginBottom:48 }}>
        <p style={{ fontSize:12, color:'rgba(255,255,255,0.28)', marginBottom:6, fontFamily:'DM Sans,sans-serif' }}>Next up</p>
        <p className="syne" style={{ fontSize:20, fontWeight:700, color:'#fff' }}>{nextLabel}</p>
      </div>

      {/* PREV | NEXT */}
      <div style={{ display:'flex', gap:12, width:'100%', maxWidth:300 }}>
        <button onClick={onPrev} style={{ flex:1, padding:'17px 0', borderRadius:100, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.05)', color:'rgba(255,255,255,0.6)', fontFamily:'Syne,sans-serif', fontSize:17, fontWeight:800, cursor:'pointer' }}>
          PREV
        </button>
        <button onClick={onNext} style={{ flex:1, padding:'17px 0', borderRadius:100, border:'none', background:color, color:color==='#ffd60a'?'#000':'#fff', fontFamily:'Syne,sans-serif', fontSize:17, fontWeight:800, cursor:'pointer' }}>
          NEXT
        </button>
      </div>
    </main>
  );
}

// ── MAIN PAGE ──────────────────────────────────────────────────
export default function SectionPage({ params }: { params: Promise<{ mode:string; day:string; sectionId:string }> }) {
  const { mode, day, sectionId } = use(params);
  const split = mode === 'ppl' ? PPL_SPLIT : BRO_SPLIT;
  const dayData = split.find(d => d.day === parseInt(day));
  const section = dayData?.sections.find(s => s.id === sectionId);

  // Flat queue: one entry per set of each exercise
  const queue = section?.exercises.flatMap(ex =>
    Array.from({ length: ex.sets }, (_, i) => ({ ex, setIdx: i+1 }))
  ) ?? [];

  const [pos, setPos] = useState(0);
  const [phase, setPhase] = useState<'exercise'|'rest'>('exercise');
  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState(false);
  const [showCues, setShowCues] = useState(false);

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

  // Elapsed clock
  useEffect(() => {
    const iv = setInterval(() => setElapsed(e => e+1), 1000);
    return () => clearInterval(iv);
  }, []);

  const advance = useCallback(() => {
    if (phase === 'rest') {
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

  const isTimed = phase==='exercise' && !!cur?.ex.duration;
  const timerSecs = phase==='rest' ? (cur?.ex.rest ?? 60) : (cur?.ex.duration ?? 0);
  const timer = useTimer(timerSecs, advance);

  useEffect(() => {
    timer.reset(timerSecs);
    if (phase==='rest') setTimeout(() => timer.start(), 150);
    else if (isTimed) setTimeout(() => timer.start(), 500);
    setShowCues(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos, phase]);

  if (!section || !dayData || queue.length===0)
    return <div style={{ background:'#09090f', color:'#fff', minHeight:'100vh', padding:24 }}>Not found.</div>;

  if (done) return <SectionComplete section={section} nextSection={nextSection} mode={mode} day={day} color={color}/>;

  if (phase==='rest' && cur) {
    const nextLabel = nxt
      ? `${nxt.ex.name}  ·  Set ${nxt.setIdx}/${nxt.ex.sets}`
      : 'Section complete!';
    return <RestScreen restSecs={cur.ex.rest} nextLabel={nextLabel} onNext={advance} onPrev={goBack} color={color} timer={timer}/>;
  }

  if (!cur) return null;
  const { ex } = cur;
  const totalSets = queue.length;
  const progressPct = (pos / totalSets) * 100;

  return (
    <main style={{ height:'100vh', background:'#09090f', display:'flex', flexDirection:'column', overflow:'hidden' }}>

      {/* ── GIF — 50% of screen ── */}
      <div style={{ flex:'0 0 50vh', minHeight:210, position:'relative' }}>
        <ExerciseGif name={ex.name} color={color}/>

        {/* Top overlay */}
        <div style={{ position:'absolute', top:0, left:0, right:0, padding:'44px 20px 16px', background:'linear-gradient(to bottom,rgba(9,9,15,0.88) 0%,transparent 100%)', display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
          <Link href={`/workout/${mode}/${day}`} style={{ width:36, height:36, borderRadius:18, background:'rgba(0,0,0,0.45)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center', textDecoration:'none' }}>
            <ArrowLeft size={15} color="rgba(255,255,255,0.8)"/>
          </Link>
          <div style={{ padding:'6px 14px', borderRadius:100, background:'rgba(0,0,0,0.45)', backdropFilter:'blur(8px)' }}>
            <span className="mono" style={{ fontSize:10, letterSpacing:2, color:'rgba(255,255,255,0.6)' }}>{section.icon} {section.title.toUpperCase()}</span>
          </div>
        </div>

        {/* Progress at bottom */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:2, background:'rgba(255,255,255,0.07)' }}>
          <div style={{ height:'100%', background:color, width:`${progressPct}%`, transition:'width 0.4s ease' }}/>
        </div>
      </div>

      {/* ── Timer row — like reference: ELAPSED | BIG NUMBER | REPS ── */}
      <div style={{ padding:'16px 24px 12px', display:'flex', alignItems:'center', borderBottom:'1px solid rgba(255,255,255,0.06)', flexShrink:0 }}>
        {/* Left: elapsed */}
        <div style={{ flex:1 }}>
          <p className="mono" style={{ fontSize:9, letterSpacing:2, color:'rgba(255,255,255,0.28)', marginBottom:2 }}>ELAPSED</p>
          <p className="mono" style={{ fontSize:15, color:'rgba(255,255,255,0.45)' }}>{formatTime(elapsed)}</p>
        </div>

        {/* Center: big timer or set number */}
        <div style={{ textAlign:'center' }}>
          {isTimed ? (
            <div>
              <div className="syne" style={{ fontSize:52, fontWeight:800, color:timer.isDone?'#30d158':'#fff', lineHeight:1 }}>
                {formatTime(timer.seconds)}
              </div>
              <button onClick={timer.toggle} style={{ background:'none', border:'none', cursor:'pointer', fontFamily:'JetBrains Mono,monospace', fontSize:10, color, letterSpacing:2, marginTop:3 }}>
                {timer.isRunning ? '⏸ PAUSE' : timer.isDone ? '✓ DONE' : '▶ START'}
              </button>
            </div>
          ) : (
            <div>
              <div style={{ display:'flex', alignItems:'baseline', justifyContent:'center', gap:3 }}>
                <span className="syne" style={{ fontSize:52, fontWeight:800, color:'#fff', lineHeight:1 }}>{cur.setIdx}</span>
                <span className="syne" style={{ fontSize:22, fontWeight:800, color:'rgba(255,255,255,0.22)' }}>/{ex.sets}</span>
              </div>
              <p className="mono" style={{ fontSize:10, color:'rgba(255,255,255,0.35)', letterSpacing:1, marginTop:2 }}>SET</p>
            </div>
          )}
        </div>

        {/* Right: reps */}
        <div style={{ flex:1, textAlign:'right' }}>
          <p className="mono" style={{ fontSize:9, letterSpacing:2, color:'rgba(255,255,255,0.28)', marginBottom:2 }}>
            {isTimed ? 'HOLD' : 'REPS'}
          </p>
          <p className="mono" style={{ fontSize:15, color }}>{isTimed ? formatTime(ex.duration!) : ex.reps}</p>
        </div>
      </div>

      {/* ── Exercise name + cues ── */}
      <div style={{ flex:1, padding:'14px 24px 0', overflow:'auto', minHeight:0 }}>
        <h1 className="syne" style={{ fontSize:21, fontWeight:800, color:'#fff', marginBottom:10, lineHeight:1.1 }}>{ex.name}</h1>

        <button onClick={()=>setShowCues(s=>!s)} style={{ background:'none', border:'none', padding:0, cursor:'pointer', display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
          <span className="mono" style={{ fontSize:10, letterSpacing:2, color:`${color}cc` }}>FORM CUES</span>
          <span style={{ color:'rgba(255,255,255,0.25)', fontSize:9 }}>{showCues?'▲':'▼'}</span>
        </button>

        {showCues && (
          <>
            <p style={{ fontSize:13, color:'rgba(255,255,255,0.5)', lineHeight:1.7, marginBottom:12 }}>{ex.how}</p>
            {ex.mistakes.map((m:string,i:number) => (
              <div key={i} style={{ display:'flex', gap:8, marginBottom:5 }}>
                <span style={{ color:'#ff375f', fontSize:12, flexShrink:0 }}>×</span>
                <span style={{ fontSize:12, color:'rgba(255,70,85,0.85)', lineHeight:1.5 }}>{m}</span>
              </div>
            ))}
          </>
        )}
      </div>

      {/* ── PREV | NEXT — primary controls ── */}
      <div style={{ padding:'10px 24px', paddingBottom:'max(20px,env(safe-area-inset-bottom))', flexShrink:0 }}>
        {/* Next preview strip */}
        {nxt && (
          <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', marginBottom:10, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14 }}>
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ fontSize:12, color:'rgba(255,255,255,0.55)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', fontFamily:'DM Sans,sans-serif' }}>{nxt.ex.name}</p>
              <p className="mono" style={{ fontSize:10, color:'rgba(255,255,255,0.28)', marginTop:1 }}>
                {nxt.ex.reps ?? formatTime(nxt.ex.duration!)} · set {nxt.setIdx}/{nxt.ex.sets}
              </p>
            </div>
            <span className="mono" style={{ fontSize:10, color, flexShrink:0 }}>NEXT UP</span>
          </div>
        )}

        <div style={{ display:'flex', gap:10 }}>
          <button onClick={goBack} disabled={pos===0 && phase==='exercise'} style={{
            flex:1, padding:'17px 0', borderRadius:100,
            border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.05)',
            color: pos===0?'rgba(255,255,255,0.2)':'rgba(255,255,255,0.7)',
            fontFamily:'Syne,sans-serif', fontSize:17, fontWeight:800,
            cursor:pos===0?'default':'pointer', letterSpacing:1,
          }}>PREV</button>
          <button onClick={advance} style={{
            flex:1, padding:'17px 0', borderRadius:100, border:'none',
            background:color, color:color==='#ffd60a'?'#000':'#fff',
            fontFamily:'Syne,sans-serif', fontSize:17, fontWeight:800, cursor:'pointer', letterSpacing:1,
          }}>{pos===queue.length-1?'FINISH ✓':'NEXT'}</button>
        </div>
      </div>

    </main>
  );
}
