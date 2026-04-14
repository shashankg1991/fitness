'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BRO_SPLIT, PPL_SPLIT } from '@/lib/workoutData';

const MODES = [
  { id:'bro', label:'Bro Split', sub:'One muscle group per day', split:BRO_SPLIT, color:'#ff6b35' },
  { id:'ppl', label:'Push / Pull / Legs', sub:'PPL format, 2x frequency', split:PPL_SPLIT, color:'#bf5af2' },
];

export default function WorkoutPage() {
  const [mode, setMode] = useState<'bro'|'ppl'>('bro');
  const sel = MODES.find(m=>m.id===mode)!;

  return (
    <main style={{ minHeight:'100vh', background:'#09090f', paddingBottom:48 }}>
      <div style={{ padding:'48px 24px 24px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:28 }}>
          <Link href="/" style={{ width:36,height:36,borderRadius:18,background:'rgba(255,255,255,0.06)',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none' }}>
            <ArrowLeft size={16} color="rgba(255,255,255,0.7)"/>
          </Link>
          <div>
            <h1 className="syne" style={{ fontSize:24, fontWeight:800, color:'#fff' }}>Workout</h1>
            <p className="mono" style={{ fontSize:11, color:'rgba(255,255,255,0.3)', letterSpacing:1, marginTop:2 }}>5 sections · Auto-timer · Giphy guides</p>
          </div>
        </div>

        {/* Mode toggle */}
        <div style={{ display:'flex', gap:6, marginBottom:24, background:'rgba(255,255,255,0.04)', padding:4, borderRadius:100 }}>
          {MODES.map(m=>(
            <button key={m.id} onClick={()=>setMode(m.id as any)} style={{
              flex:1, padding:'10px 0', borderRadius:100, border:'none', cursor:'pointer',
              background: mode===m.id ? m.color : 'transparent',
              color: mode===m.id ? '#fff' : 'rgba(255,255,255,0.4)',
              fontFamily:'Syne,sans-serif', fontSize:14, fontWeight:700, transition:'all 0.2s',
            }}>
              {m.id==='bro'?'Bro Split':'PPL'}
            </button>
          ))}
        </div>

        {/* Week info strip */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:24 }}>
          <div style={{ background:'rgba(255,255,255,0.04)', borderRadius:16, padding:'14px 16px', border:'1px solid rgba(255,255,255,0.07)' }}>
            <p className="mono" style={{ fontSize:9, letterSpacing:2, color:'rgba(255,255,255,0.25)', marginBottom:6 }}>WEEK 1–2</p>
            <p className="syne" style={{ fontSize:14, fontWeight:700, color:'#fff' }}>3 sets · 12–15 reps</p>
            <p style={{ fontSize:12, color:'rgba(255,255,255,0.35)', marginTop:3 }}>60 sec rest</p>
          </div>
          <div style={{ background:'rgba(255,255,255,0.04)', borderRadius:16, padding:'14px 16px', border:'1px solid rgba(255,255,255,0.07)' }}>
            <p className="mono" style={{ fontSize:9, letterSpacing:2, color:sel.color+'99', marginBottom:6 }}>WEEK 3–4</p>
            <p className="syne" style={{ fontSize:14, fontWeight:700, color:'#fff' }}>4 sets · 10–12 reps</p>
            <p style={{ fontSize:12, color:'rgba(255,255,255,0.35)', marginTop:3 }}>75 sec rest · +weight</p>
          </div>
        </div>

        {/* Day cards */}
        <p className="mono" style={{ fontSize:10, letterSpacing:3, color:'rgba(255,255,255,0.25)', marginBottom:14 }}>SELECT DAY</p>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {sel.split.map((day,i)=>{
            const dayColor = [sel.color,'#30d158','#bf5af2','#ffd60a','#ff375f','#ff9500','#5ac8fa'][i%7];
            const mainEx = day.sections.find(s=>s.id==='main');
            return (
              <Link key={day.day} href={`/workout/${mode}/${day.day}`} style={{ textDecoration:'none' }}>
                <div style={{ display:'flex', alignItems:'center', gap:16, padding:'16px 20px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:20, transition:'all 0.15s' }}>
                  <div style={{ width:44, height:44, borderRadius:14, background:`${dayColor}18`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <span className="syne" style={{ fontSize:11, fontWeight:800, color:dayColor, letterSpacing:1 }}>{day.badge}</span>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <h3 className="syne" style={{ fontSize:17, fontWeight:700, color:'#fff', marginBottom:3 }}>{day.muscle}</h3>
                    <p style={{ fontSize:12, color:'rgba(255,255,255,0.35)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                      {mainEx?.exercises.map(e=>e.name.split(' ').pop()).join(' · ')}
                    </p>
                  </div>
                  <div style={{ width:28, height:28, borderRadius:14, background:`${dayColor}18`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <span style={{ color:dayColor, fontSize:14 }}>›</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
