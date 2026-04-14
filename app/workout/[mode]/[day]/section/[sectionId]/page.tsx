'use client';
import { use, useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Pause, SkipForward, CheckCircle, AlertTriangle, ChevronRight } from 'lucide-react';
import { BRO_SPLIT, PPL_SPLIT } from '@/lib/workoutData';
import { useTimer, formatTime } from '@/lib/useTimer';
import { gifQuery, fetchGifUrl } from '@/lib/giphy';

// ── Giphy image component ──────────────────────────────────────
function GifDisplay({ exerciseName, color }: { exerciseName: string; color: string }) {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const cache = useRef<Record<string, string | null>>({});

  useEffect(() => {
    setLoading(true);
    setUrl(null);
    const q = gifQuery(exerciseName);
    if (cache.current[q] !== undefined) {
      setUrl(cache.current[q]);
      setLoading(false);
      return;
    }
    fetchGifUrl(q).then(u => {
      cache.current[q] = u;
      setUrl(u);
      setLoading(false);
    });
  }, [exerciseName]);

  return (
    <div style={{ width:'100%', height:'100%', position:'relative', background:'rgba(255,255,255,0.03)', overflow:'hidden' }}>
      {loading && (
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ width:36, height:36, borderRadius:18, border:`2px solid ${color}`, borderTopColor:'transparent', animation:'spin 0.8s linear infinite' }}/>
        </div>
      )}
      {url && !loading && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={exerciseName}
          style={{ width:'100%', height:'100%', objectFit:'cover', opacity: loading ? 0 : 1, transition:'opacity 0.3s' }} />
      )}
      {!url && !loading && (
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:8 }}>
          <span style={{ fontSize:32 }}>🏋️</span>
          <span style={{ fontSize:11, color:'rgba(255,255,255,0.3)' }}>{exerciseName}</span>
        </div>
      )}
      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Timer ring ─────────────────────────────────────────────────
function Ring({ s, total, color, size=200 }: { s:number; total:number; color:string; size?:number }) {
  const r = size/2 - 14;
  const c = 2 * Math.PI * r;
  const pct = total > 0 ? Math.max(0, (total - s) / total) : 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{transform:'rotate(-90deg)',position:'absolute',inset:0}}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={12}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={12}
        strokeDasharray={c} strokeDashoffset={c*(1-pct)} strokeLinecap="round"
        style={{transition:'stroke-dashoffset 1s linear'}}/>
    </svg>
  );
}

// ── Section complete screen ────────────────────────────────────
function SectionComplete({ section, nextSection, mode, day, color }: any) {
  return (
    <main style={{minHeight:'100vh',background:'#09090f',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:28}}>
      <div style={{fontSize:56,marginBottom:16}}>✅</div>
      <h2 className="syne" style={{fontSize:36,fontWeight:800,color,textAlign:'center',marginBottom:6}}>{section.title}</h2>
      <p className="mono" style={{fontSize:13,color:'rgba(255,255,255,0.35)',letterSpacing:2,marginBottom:48}}>COMPLETE</p>
      {nextSection ? (
        <div style={{width:'100%',maxWidth:360}}>
          <p className="mono" style={{fontSize:10,letterSpacing:3,color:'rgba(255,255,255,0.3)',textAlign:'center',marginBottom:16}}>UP NEXT</p>
          <Link href={`/workout/${mode}/${day}/section/${nextSection.id}`} style={{textDecoration:'none',display:'block'}}>
            <div style={{background:`${color}14`,border:`1px solid ${color}30`,borderRadius:24,padding:'24px 28px',textAlign:'center',marginBottom:14}}>
              <div style={{fontSize:32,marginBottom:10}}>{nextSection.icon}</div>
              <h3 className="syne" style={{fontSize:22,fontWeight:700,color:'#fff',marginBottom:4}}>{nextSection.title}</h3>
              <p style={{fontSize:13,color:'rgba(255,255,255,0.4)'}}>{nextSection.exercises.length} exercises</p>
            </div>
          </Link>
          <Link href={`/workout/${mode}/${day}`} style={{textDecoration:'none',display:'block'}}>
            <div style={{padding:'16px',textAlign:'center',fontFamily:'JetBrains Mono, monospace',fontSize:12,color:'rgba(255,255,255,0.3)'}}>
              ← day overview
            </div>
          </Link>
        </div>
      ) : (
        <div style={{width:'100%',maxWidth:360}}>
          <div className="syne" style={{fontSize:22,fontWeight:700,color:'#30d158',textAlign:'center',marginBottom:32}}>Workout Complete 🎉</div>
          <Link href={`/workout/${mode}/${day}`} style={{textDecoration:'none',display:'block'}}>
            <div style={{background:'rgba(48,209,88,0.12)',border:'1px solid rgba(48,209,88,0.25)',borderRadius:20,padding:'18px',textAlign:'center'}}>
              <span className="syne" style={{fontSize:20,fontWeight:700,color:'#30d158'}}>Back to Day</span>
            </div>
          </Link>
        </div>
      )}
    </main>
  );
}

// ── Rest screen ────────────────────────────────────────────────
function RestScreen({ exercise, nextLabel, onDone, color, timer }: {
  exercise: any; nextLabel: string; onDone:()=>void; color:string; timer:any;
}) {
  return (
    <main style={{minHeight:'100vh',background:'#09090f',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:28}}>
      <p className="mono" style={{fontSize:10,letterSpacing:4,color:'rgba(255,255,255,0.3)',marginBottom:40}}>REST</p>

      {/* Big countdown */}
      <div style={{position:'relative',width:200,height:200,marginBottom:40,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Ring s={timer.seconds} total={exercise.rest} color={color} size={200}/>
        <div style={{textAlign:'center',position:'relative',zIndex:1}}>
          <div className="syne" style={{
            fontSize: timer.seconds > 9 ? 72 : 80,
            fontWeight:800,color:timer.seconds <= 3 ? color : '#fff',
            lineHeight:1,
            transition:'color 0.3s',
          }}>
            {timer.seconds}
          </div>
          <div className="mono" style={{fontSize:10,color:'rgba(255,255,255,0.3)',letterSpacing:2,marginTop:4}}>SECONDS</div>
        </div>
      </div>

      {/* Next up */}
      <div style={{textAlign:'center',marginBottom:48}}>
        <p style={{fontSize:12,color:'rgba(255,255,255,0.3)',marginBottom:6}}>Next up</p>
        <p className="syne" style={{fontSize:20,fontWeight:600,color:'#fff'}}>{nextLabel}</p>
      </div>

      {/* Controls */}
      <div style={{display:'flex',gap:12,width:'100%',maxWidth:280}}>
        <button onClick={timer.toggle} style={{
          flex:1, padding:'15px 0', borderRadius:100, border:'none',
          background: timer.isRunning ? 'rgba(255,255,255,0.08)' : color,
          color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8,
        }}>
          <span className="syne" style={{fontSize:16,fontWeight:700,letterSpacing:1}}>
            {timer.isRunning ? '⏸ Pause' : '▶ Resume'}
          </span>
        </button>
        <button onClick={onDone} style={{
          padding:'15px 20px', borderRadius:100, border:`1px solid ${color}40`,
          background:`${color}12`, color, cursor:'pointer', display:'flex', alignItems:'center',
        }}>
          <SkipForward size={18}/>
        </button>
      </div>
    </main>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────
export default function SectionPage({ params }: { params: Promise<{ mode:string; day:string; sectionId:string }> }) {
  const { mode, day, sectionId } = use(params);
  const split = mode === 'ppl' ? PPL_SPLIT : BRO_SPLIT;
  const dayData = split.find(d => d.day === parseInt(day));
  const section = dayData?.sections.find(s => s.id === sectionId);

  const [exIdx, setExIdx] = useState(0);
  const [setNum, setSetNum] = useState(1);
  const [phase, setPhase] = useState<'exercise'|'rest'>('exercise');
  const [sectionDone, setSectionDone] = useState(false);
  const [showMistakes, setShowMistakes] = useState(false);

  const ex = section?.exercises[exIdx];
  const totalEx = section?.exercises.length ?? 0;

  const color =
    section?.id === 'warmup'   ? '#ffd60a' :
    section?.id === 'abs'      ? '#5ac8fa' :
    section?.id === 'cooldown' ? '#4eb8ff' :
    section?.id === 'backpain' ? '#bf5af2' :
    dayData?.color ?? '#ff6b35';

  const sectionIdx = dayData?.sections.findIndex(s => s.id === sectionId) ?? -1;
  const nextSection = sectionIdx >= 0 ? dayData?.sections[sectionIdx + 1] : undefined;

  // What label to show as "next" during rest
  const nextLabel = (() => {
    if (!ex || !section) return '';
    if (setNum < ex.sets) return `${ex.name} — Set ${setNum + 1}/${ex.sets}`;
    if (exIdx + 1 < totalEx) return section.exercises[exIdx + 1].name;
    return 'Section complete!';
  })();

  const advance = useCallback(() => {
    if (!ex || !section) return;
    if (phase === 'rest') {
      if (setNum < ex.sets) { setSetNum(s => s+1); setPhase('exercise'); }
      else {
        const n = exIdx + 1;
        if (n < totalEx) { setExIdx(n); setSetNum(1); setPhase('exercise'); }
        else { setSectionDone(true); }
      }
    } else {
      // exercise → rest
      setPhase('rest');
    }
  }, [phase, setNum, ex, exIdx, totalEx, section]);

  const isTimed = !!ex?.duration;
  const timerSecs = phase === 'rest' ? (ex?.rest ?? 60) : (ex?.duration ?? 30);
  const timer = useTimer(timerSecs, advance);

  // Auto-start logic
  useEffect(() => {
    timer.reset(timerSecs);
    if (phase === 'rest') {
      const t = setTimeout(() => timer.start(), 200);
      return () => clearTimeout(t);
    }
    if (phase === 'exercise' && isTimed) {
      const t = setTimeout(() => timer.start(), 600);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, exIdx, setNum, isTimed, timerSecs]);

  if (!section || !ex || !dayData) return <div style={{background:'#09090f',color:'#fff',minHeight:'100vh',padding:28}}>Not found.</div>;

  if (sectionDone) return <SectionComplete section={section} nextSection={nextSection} mode={mode} day={day} color={color}/>;

  if (phase === 'rest') return (
    <RestScreen exercise={ex} nextLabel={nextLabel} onDone={advance} color={color} timer={timer}/>
  );

  // Progress: percentage through all sets of all exercises
  const totalSets = section.exercises.reduce((a,e) => a + e.sets, 0);
  const doneSets = section.exercises.slice(0, exIdx).reduce((a,e) => a + e.sets, 0) + (setNum - 1);
  const progressPct = totalSets > 0 ? (doneSets / totalSets) * 100 : 0;

  return (
    <main style={{minHeight:'100vh',background:'#09090f',display:'flex',flexDirection:'column',maxHeight:'100vh',overflow:'hidden'}}>

      {/* ── GIF area ── */}
      <div style={{position:'relative',height:'42vh',minHeight:220,background:'#0f0f17',flexShrink:0}}>
        <GifDisplay exerciseName={ex.name} color={color}/>

        {/* top bar overlay */}
        <div style={{position:'absolute',top:0,left:0,right:0,padding:'16px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',background:'linear-gradient(to bottom, rgba(9,9,15,0.85) 0%, transparent 100%)'}}>
          <Link href={`/workout/${mode}/${day}`} style={{width:36,height:36,borderRadius:18,background:'rgba(0,0,0,0.4)',backdropFilter:'blur(8px)',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none'}}>
            <ArrowLeft size={16} color="rgba(255,255,255,0.8)"/>
          </Link>
          <div className="mono" style={{fontSize:10,letterSpacing:2,color:'rgba(255,255,255,0.5)',background:'rgba(0,0,0,0.4)',backdropFilter:'blur(8px)',padding:'6px 12px',borderRadius:100}}>
            {section.title}
          </div>
          <div className="mono" style={{fontSize:11,color:'rgba(255,255,255,0.5)',background:'rgba(0,0,0,0.4)',backdropFilter:'blur(8px)',padding:'6px 10px',borderRadius:100}}>
            {exIdx+1}/{totalEx}
          </div>
        </div>

        {/* progress bar at bottom of gif */}
        <div style={{position:'absolute',bottom:0,left:0,right:0,height:3,background:'rgba(255,255,255,0.08)'}}>
          <div style={{height:'100%',background:color,width:`${progressPct}%`,transition:'width 0.4s ease'}}/>
        </div>
      </div>

      {/* ── Info area ── */}
      <div style={{flex:1,padding:'24px 24px 0',overflow:'auto',display:'flex',flexDirection:'column'}}>

        {/* Exercise name + set */}
        <div style={{marginBottom:20}}>
          <div style={{display:'flex',alignItems:'baseline',gap:10,marginBottom:8}}>
            <h1 className="syne" style={{fontSize:26,fontWeight:800,color:'#fff',lineHeight:1.1,flex:1}}>{ex.name}</h1>
          </div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            <span className="mono" style={{fontSize:12,color,background:`${color}15`,padding:'5px 12px',borderRadius:100}}>
              {isTimed ? formatTime(ex.duration!) : ex.reps}
            </span>
            <span className="mono" style={{fontSize:12,color:'rgba(255,255,255,0.4)',background:'rgba(255,255,255,0.06)',padding:'5px 12px',borderRadius:100}}>
              Set {setNum} of {ex.sets}
            </span>
            <span className="mono" style={{fontSize:12,color:'rgba(255,255,255,0.3)',background:'rgba(255,255,255,0.04)',padding:'5px 12px',borderRadius:100}}>
              {ex.rest}s rest
            </span>
          </div>
        </div>

        {/* Set progress dots */}
        <div style={{display:'flex',gap:5,marginBottom:20}}>
          {Array.from({length:ex.sets}).map((_,i)=>(
            <div key={i} style={{height:4,flex:1,borderRadius:2,background: i < setNum-1 ? color : i===setNum-1 ? `${color}50` : 'rgba(255,255,255,0.08)',transition:'background 0.3s'}}/>
          ))}
        </div>

        {/* Timed exercise countdown */}
        {isTimed && (
          <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:20}}>
            <div style={{position:'relative',width:80,height:80,flexShrink:0}}>
              <Ring s={timer.seconds} total={ex.duration!} color={color} size={80}/>
              <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <span className="syne" style={{fontSize:22,fontWeight:800,color:timer.isDone?color:'#fff'}}>{timer.seconds}</span>
              </div>
            </div>
            <div>
              <div className="mono" style={{fontSize:11,color:'rgba(255,255,255,0.3)',marginBottom:4}}>
                {timer.isRunning ? 'RUNNING' : timer.isDone ? 'DONE' : 'READY'}
              </div>
              <button onClick={timer.toggle} style={{background:'none',border:'none',padding:0,color,cursor:'pointer',display:'flex',alignItems:'center',gap:6}}>
                {timer.isRunning ? <><Pause size={16}/><span className="mono" style={{fontSize:12}}>Pause</span></> : <><Play size={16}/><span className="mono" style={{fontSize:12}}>{timer.isDone?'Restart':'Start'}</span></>}
              </button>
            </div>
          </div>
        )}

        {/* How to */}
        <p style={{fontSize:14,color:'rgba(255,255,255,0.55)',lineHeight:1.7,marginBottom:16,flex:1}}>{ex.how}</p>

        {/* Mistakes toggle */}
        <button onClick={()=>setShowMistakes(s=>!s)} style={{background:'none',border:'none',padding:0,display:'flex',alignItems:'center',gap:6,marginBottom:showMistakes?10:20,cursor:'pointer'}}>
          <AlertTriangle size={13} color="#ff375f"/>
          <span className="mono" style={{fontSize:11,color:'rgba(255,59,63,0.7)',letterSpacing:1}}>COMMON MISTAKES</span>
          <span style={{color:'rgba(255,255,255,0.3)',fontSize:10,marginLeft:'auto'}}>{showMistakes?'▲':'▼'}</span>
        </button>
        {showMistakes && (
          <div style={{background:'rgba(255,55,59,0.07)',borderRadius:14,padding:'12px 14px',marginBottom:20}}>
            {ex.mistakes.map((m:string,i:number)=>(
              <div key={i} style={{display:'flex',gap:8,marginBottom:i<ex.mistakes.length-1?8:0}}>
                <span style={{color:'#ff375f',fontSize:12,flexShrink:0}}>×</span>
                <span style={{fontSize:13,color:'rgba(255,100,110,0.9)',lineHeight:1.5}}>{m}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Done button ── */}
      <div style={{padding:'16px 24px',paddingBottom:'max(24px, env(safe-area-inset-bottom))',background:'linear-gradient(to top, rgba(9,9,15,1) 60%, rgba(9,9,15,0) 100%)',flexShrink:0}}>
        <button onClick={advance} style={{
          width:'100%', padding:'18px 0', borderRadius:100, border:'none',
          background: color, color:'#fff', cursor:'pointer',
          fontFamily:'Syne,sans-serif', fontSize:18, fontWeight:700, letterSpacing:1,
        }}>
          {isTimed && !timer.isDone
            ? `Mark Set ${setNum} Done`
            : `Set ${setNum} Complete ✓`}
        </button>
      </div>

    </main>
  );
}
