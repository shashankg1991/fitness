'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BRO_SPLIT, PPL_SPLIT, BAND_SPLIT } from '@/lib/workoutData';

const MODES = [
  { id:'bro', label:'Bro Split', sub:'1 muscle/day · Dumbbells', split:BRO_SPLIT, color:'#ff6b35', icon:'🏋️' },
  { id:'ppl', label:'Push / Pull / Legs', sub:'PPL format · Dumbbells', split:PPL_SPLIT, color:'#bf5af2', icon:'💪' },
  { id:'band', label:'Travel — Resistance Band', sub:'No gym needed · Hotel room', split:BAND_SPLIT, color:'#30d158', icon:'🌍' },
];

type ModeId = 'bro' | 'ppl' | 'band';

export default function WorkoutPage() {
  const [mode, setMode] = useState<ModeId>('bro');
  const sel = MODES.find(m => m.id === mode)!;

  return (
    <main style={{ minHeight:'100vh', background:'#09090f', paddingBottom:48 }}>
      <div style={{ padding:'48px 24px 24px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:28 }}>
          <Link href="/" style={{ width:36,height:36,borderRadius:18,background:'rgba(255,255,255,0.06)',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none' }}>
            <ArrowLeft size={16} color="rgba(255,255,255,0.7)"/>
          </Link>
          <div>
            <h1 className="syne" style={{ fontSize:24, fontWeight:800, color:'#fff' }}>Workout</h1>
            <p className="mono" style={{ fontSize:11, color:'rgba(255,255,255,0.3)', letterSpacing:1, marginTop:2 }}>Choose your split</p>
          </div>
        </div>

        {/* Mode selector */}
        <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:28 }}>
          {MODES.map(m => (
            <button key={m.id} onClick={() => setMode(m.id as ModeId)} style={{
              display:'flex', alignItems:'center', gap:14, padding:'14px 18px',
              borderRadius:18, border:`1px solid ${mode===m.id ? m.color+'60' : 'rgba(255,255,255,0.07)'}`,
              background: mode===m.id ? `${m.color}12` : 'rgba(255,255,255,0.03)',
              cursor:'pointer', textAlign:'left', transition:'all 0.2s',
            }}>
              <span style={{ fontSize:22, flexShrink:0 }}>{m.icon}</span>
              <div style={{ flex:1 }}>
                <p className="syne" style={{ fontSize:15, fontWeight:700, color: mode===m.id ? '#fff' : 'rgba(255,255,255,0.6)', marginBottom:2 }}>{m.label}</p>
                <p style={{ fontSize:12, color:'rgba(255,255,255,0.35)', fontFamily:'DM Sans,sans-serif' }}>{m.sub}</p>
              </div>
              {mode===m.id && (
                <div style={{ width:8, height:8, borderRadius:4, background:m.color, flexShrink:0 }}/>
              )}
            </button>
          ))}
        </div>

        {/* Band mode tip */}
        {mode === 'band' && (
          <div style={{ padding:'14px 18px', background:'rgba(48,209,88,0.08)', border:'1px solid rgba(48,209,88,0.2)', borderRadius:16, marginBottom:20 }}>
            <p className="syne" style={{ fontSize:14, fontWeight:700, color:'#30d158', marginBottom:4 }}>🌍 Travel-friendly</p>
            <p style={{ fontSize:13, color:'rgba(255,255,255,0.5)', lineHeight:1.6 }}>Needs: 1–3 resistance bands (light/medium/heavy). Works in any hotel room, park, or airport. Fits in a carry-on.</p>
          </div>
        )}

        {/* Week info */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:24 }}>
          <div style={{ background:'rgba(255,255,255,0.04)', borderRadius:16, padding:'14px 16px', border:'1px solid rgba(255,255,255,0.07)' }}>
            <p className="mono" style={{ fontSize:9, letterSpacing:2, color:'rgba(255,255,255,0.25)', marginBottom:6 }}>WEEK 1–2</p>
            <p className="syne" style={{ fontSize:14, fontWeight:700, color:'#fff' }}>3 sets · 12–15 reps</p>
            <p style={{ fontSize:12, color:'rgba(255,255,255,0.35)', marginTop:3 }}>60 sec rest</p>
          </div>
          <div style={{ background:'rgba(255,255,255,0.04)', borderRadius:16, padding:'14px 16px', border:'1px solid rgba(255,255,255,0.07)' }}>
            <p className="mono" style={{ fontSize:9, letterSpacing:2, color:`${sel.color}99`, marginBottom:6 }}>WEEK 3–4</p>
            <p className="syne" style={{ fontSize:14, fontWeight:700, color:'#fff' }}>4 sets · 10–12 reps</p>
            <p style={{ fontSize:12, color:'rgba(255,255,255,0.35)', marginTop:3 }}>75 sec rest · heavier band</p>
          </div>
        </div>

        {/* Day list */}
        <p className="mono" style={{ fontSize:9, letterSpacing:3, color:'rgba(255,255,255,0.25)', marginBottom:14 }}>SELECT DAY</p>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {sel.split.map((day, i) => {
            const dayColor = [sel.color,'#30d158','#bf5af2','#ffd60a','#ff375f','#ff9500','#5ac8fa'][i%7];
            const mainEx = day.sections.find(s => s.id==='main');
            return (
              <Link key={day.day} href={`/workout/${mode}/${day.day}`} style={{ textDecoration:'none' }}>
                <div style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 18px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:18, transition:'all 0.15s' }}>
                  <div style={{ width:42, height:42, borderRadius:13, background:`${dayColor}18`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <span className="syne" style={{ fontSize:11, fontWeight:800, color:dayColor, letterSpacing:0.5 }}>{day.badge}</span>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <h3 className="syne" style={{ fontSize:16, fontWeight:700, color:'#fff', marginBottom:2 }}>{day.muscle}</h3>
                    <p style={{ fontSize:12, color:'rgba(255,255,255,0.35)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', fontFamily:'DM Sans,sans-serif' }}>
                      {mainEx?.exercises.map(e => e.name.split(' ').slice(1).join(' ')).join(' · ')}
                    </p>
                  </div>
                  <span style={{ color:dayColor, fontSize:18, flexShrink:0 }}>›</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
