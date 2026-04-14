'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { DIET_PLAN } from '@/lib/dietData';

const COLORS = ['#30d158','#5ac8fa','#ff9500','#bf5af2','#ff6b35','#ffd60a','#ff375f'];
function color(day: number) { return COLORS[(day - 1) % COLORS.length]; }

export default function DietPage() {
  return (
    <main style={{ minHeight:'100vh', background:'#09090f', paddingBottom:48 }}>
      <div style={{ padding:'48px 24px 28px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:28 }}>
          <Link href="/" style={{ width:36,height:36,borderRadius:18,background:'rgba(255,255,255,0.06)',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none' }}>
            <ArrowLeft size={16} color="rgba(255,255,255,0.7)"/>
          </Link>
          <div>
            <h1 className="syne" style={{ fontSize:24, fontWeight:800, color:'#fff' }}>31-Day Diet Plan</h1>
            <p className="mono" style={{ fontSize:11, color:'rgba(255,255,255,0.3)', letterSpacing:1, marginTop:2 }}>Indian Vegetarian · No Egg</p>
          </div>
        </div>

        {/* Macro targets */}
        <div style={{ background:'rgba(255,255,255,0.04)', borderRadius:20, padding:'16px 20px', marginBottom:28, border:'1px solid rgba(255,255,255,0.07)' }}>
          <p className="mono" style={{ fontSize:10, letterSpacing:3, color:'rgba(255,255,255,0.3)', marginBottom:14 }}>DAILY TARGETS · 73 KG</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:12 }}>
            {[{l:'Protein',v:'~135g',c:'#ff6b35'},{l:'Carbs',v:'~215g',c:'#ffd60a'},{l:'Fat',v:'~55g',c:'#bf5af2'},{l:'kcal',v:'~2080',c:'#30d158'}].map(m=>(
              <div key={m.l} style={{ textAlign:'center' }}>
                <div className="syne" style={{ fontSize:17, fontWeight:800, color:m.c }}>{m.v}</div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)', marginTop:2 }}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <p className="mono" style={{ fontSize:10, letterSpacing:3, color:'rgba(255,255,255,0.3)', marginBottom:14 }}>TAP A DAY</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:8 }}>
          {['M','T','W','T','F','S','S'].map((d,i)=>(
            <div key={i} style={{ textAlign:'center', fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'rgba(255,255,255,0.2)', paddingBottom:6 }}>{d}</div>
          ))}
          {/* 1 empty cell to start on Tuesday (day 1 = Tuesday in month context - actually let's just show days 1-31 straight) */}
          {DIET_PLAN.map(day=>{
            const c = color(day.day);
            return (
              <Link key={day.day} href={`/diet/${day.day}`} style={{ textDecoration:'none' }}>
                <div style={{
                  aspectRatio:'1',
                  borderRadius:14,
                  background:`${c}14`,
                  border:`1px solid ${c}28`,
                  display:'flex',
                  flexDirection:'column',
                  alignItems:'center',
                  justifyContent:'center',
                  transition:'all 0.15s',
                }}>
                  <span className="syne" style={{ fontSize:15, fontWeight:700, color:'#fff' }}>{day.day}</span>
                  <div style={{ width:4, height:4, borderRadius:2, background:c, marginTop:3 }}/>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Key rules */}
        <div style={{ marginTop:28, padding:'16px 20px', background:'rgba(255,255,255,0.03)', borderRadius:20, border:'1px solid rgba(255,255,255,0.06)' }}>
          <p className="mono" style={{ fontSize:10, letterSpacing:3, color:'rgba(255,255,255,0.25)', marginBottom:12 }}>NON-NEGOTIABLES</p>
          {[
            'Big carb meals at breakfast + lunch. Light dinner always.',
            'Post-workout recovery meal within 30 min.',
            '3–4 litres of water daily.',
            'No refined carbs or sugar after 6 PM.',
          ].map((r,i)=>(
            <div key={i} style={{ display:'flex', gap:10, marginBottom: i<3 ? 10 : 0 }}>
              <span style={{ color:'#30d158', flexShrink:0, marginTop:2 }}>→</span>
              <span style={{ fontSize:13, color:'rgba(255,255,255,0.55)', lineHeight:1.6 }}>{r}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
