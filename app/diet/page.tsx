'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { DIET_PLAN, WEEKLY_GROCERY, SHAWARMA_INFO } from '@/lib/dietData';

const COLORS = ['#30d158','#5ac8fa','#ff9500','#bf5af2','#ff6b35','#ffd60a','#ff375f'];
const dayColor = (d: number) => COLORS[(d-1) % COLORS.length];

type Tab = 'calendar' | 'grocery' | 'shawarma';

export default function DietPage() {
  const [tab, setTab] = useState<Tab>('calendar');

  return (
    <main style={{ minHeight:'100vh', background:'#09090f', paddingBottom:48 }}>
      <div style={{ padding:'48px 24px 20px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:24 }}>
          <Link href="/" style={{ width:36,height:36,borderRadius:18,background:'rgba(255,255,255,0.06)',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none' }}>
            <ArrowLeft size={16} color="rgba(255,255,255,0.7)"/>
          </Link>
          <div>
            <h1 className="syne" style={{ fontSize:24, fontWeight:800, color:'#fff' }}>31-Day Diet Plan</h1>
            <p className="mono" style={{ fontSize:11, color:'rgba(255,255,255,0.3)', letterSpacing:1, marginTop:2 }}>Indian Vegetarian · No Egg · ~135g protein/day</p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:6, marginBottom:24, background:'rgba(255,255,255,0.04)', padding:4, borderRadius:100 }}>
          {([
            { id:'calendar', label:'📅 31 Days' },
            { id:'grocery',  label:'🛒 Weekly List' },
            { id:'shawarma', label:'🌯 Rolls Guide' },
          ] as { id:Tab; label:string }[]).map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex:1, padding:'9px 0', borderRadius:100, border:'none', cursor:'pointer',
              background: tab===t.id ? '#30d158' : 'transparent',
              color: tab===t.id ? '#000' : 'rgba(255,255,255,0.4)',
              fontFamily:'Syne,sans-serif', fontSize:13, fontWeight:700, transition:'all 0.2s',
            }}>{t.label}</button>
          ))}
        </div>

        {/* ── CALENDAR TAB ── */}
        {tab === 'calendar' && (
          <>
            {/* Macros */}
            <div style={{ background:'rgba(255,255,255,0.04)', borderRadius:20, padding:'16px 20px', marginBottom:24, border:'1px solid rgba(255,255,255,0.07)' }}>
              <p className="mono" style={{ fontSize:9, letterSpacing:3, color:'rgba(255,255,255,0.3)', marginBottom:12 }}>DAILY TARGETS · 73 KG · LEAN MUSCLE</p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:12 }}>
                {[{l:'Protein',v:'~135g',c:'#ff6b35'},{l:'Carbs',v:'~215g',c:'#ffd60a'},{l:'Fat',v:'~55g',c:'#bf5af2'},{l:'kcal',v:'~2080',c:'#30d158'}].map(m=>(
                  <div key={m.l} style={{ textAlign:'center' }}>
                    <div className="syne" style={{ fontSize:17, fontWeight:800, color:m.c }}>{m.v}</div>
                    <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)', marginTop:2 }}>{m.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mono" style={{ fontSize:9, letterSpacing:3, color:'rgba(255,255,255,0.3)', marginBottom:12 }}>TAP A DAY</p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:8 }}>
              {['M','T','W','T','F','S','S'].map((d,i) => (
                <div key={i} style={{ textAlign:'center', fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'rgba(255,255,255,0.2)', paddingBottom:6 }}>{d}</div>
              ))}
              {DIET_PLAN.map(day => {
                const c = dayColor(day.day);
                return (
                  <Link key={day.day} href={`/diet/${day.day}`} style={{ textDecoration:'none' }}>
                    <div style={{ aspectRatio:'1', borderRadius:14, background:`${c}14`, border:`1px solid ${c}28`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
                      <span className="syne" style={{ fontSize:15, fontWeight:700, color:'#fff' }}>{day.day}</span>
                      <div style={{ width:4, height:4, borderRadius:2, background:c, marginTop:3 }}/>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div style={{ marginTop:24, padding:'16px 20px', background:'rgba(255,255,255,0.03)', borderRadius:20, border:'1px solid rgba(255,255,255,0.06)' }}>
              <p className="mono" style={{ fontSize:9, letterSpacing:3, color:'rgba(255,255,255,0.25)', marginBottom:12 }}>NON-NEGOTIABLES</p>
              {['Big carbs at breakfast + lunch. Light dinner.','Post-workout recovery meal within 30 min.','3–4 litres water daily.','No refined carbs or sugar after 6 PM.'].map((r,i)=>(
                <div key={i} style={{ display:'flex', gap:10, marginBottom:i<3?10:0 }}>
                  <span style={{ color:'#30d158', flexShrink:0 }}>→</span>
                  <span style={{ fontSize:13, color:'rgba(255,255,255,0.55)', lineHeight:1.6 }}>{r}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── GROCERY TAB ── */}
        {tab === 'grocery' && (
          <>
            <div style={{ padding:'14px 18px', background:'rgba(48,209,88,0.08)', border:'1px solid rgba(48,209,88,0.2)', borderRadius:16, marginBottom:20 }}>
              <p className="syne" style={{ fontSize:15, fontWeight:700, color:'#30d158', marginBottom:4 }}>Full Week Grocery List</p>
              <p style={{ fontSize:13, color:'rgba(255,255,255,0.5)', lineHeight:1.6 }}>
                Shop once on Sunday. Covers all 7 days. Quantities include shawarma rolls, all meals, and snacks.
              </p>
            </div>

            {WEEKLY_GROCERY.map(cat => (
              <div key={cat.name} style={{ marginBottom:20 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
                  <span style={{ fontSize:18 }}>{cat.icon}</span>
                  <span className="syne" style={{ fontSize:16, fontWeight:700, color:cat.color }}>{cat.name}</span>
                  <span className="mono" style={{ fontSize:10, color:'rgba(255,255,255,0.2)' }}>{cat.items.length} items</span>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
                  {cat.items.map((item, i) => (
                    <GroceryRow key={i} item={item} color={cat.color}/>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {/* ── SHAWARMA TAB ── */}
        {tab === 'shawarma' && (
          <>
            <div style={{ padding:'18px 20px', background:'rgba(255,107,53,0.08)', border:'1px solid rgba(255,107,53,0.2)', borderRadius:20, marginBottom:24 }}>
              <p className="syne" style={{ fontSize:18, fontWeight:800, color:'#ff6b35', marginBottom:6 }}>{SHAWARMA_INFO.verdict}</p>
              <p style={{ fontSize:13, color:'rgba(255,255,255,0.6)', lineHeight:1.7 }}>{SHAWARMA_INFO.explanation}</p>
            </div>

            {SHAWARMA_INFO.options.map((opt, i) => (
              <div key={i} style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:20, padding:'20px', marginBottom:14 }}>
                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:14 }}>
                  <div>
                    <h3 className="syne" style={{ fontSize:18, fontWeight:800, color:'#fff', marginBottom:4 }}>{opt.name}</h3>
                    <div style={{ display:'flex', gap:8 }}>
                      <span className="mono" style={{ fontSize:12, color:'#ff6b35', background:'rgba(255,107,53,0.12)', padding:'3px 10px', borderRadius:100 }}>{opt.protein} protein</span>
                      <span className="mono" style={{ fontSize:12, color:'rgba(255,255,255,0.4)', background:'rgba(255,255,255,0.06)', padding:'3px 10px', borderRadius:100 }}>{opt.calories} kcal</span>
                    </div>
                  </div>
                  <span style={{ fontSize:22 }}>{opt.rating}</span>
                </div>
                <div style={{ marginBottom:10 }}>
                  {opt.pros.map((p, j) => (
                    <div key={j} style={{ display:'flex', gap:8, marginBottom:5 }}>
                      <span style={{ color:'#30d158', flexShrink:0, fontSize:12 }}>✓</span>
                      <span style={{ fontSize:13, color:'rgba(255,255,255,0.6)', lineHeight:1.5 }}>{p}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background:'rgba(255,255,255,0.04)', borderRadius:12, padding:'10px 14px' }}>
                  <p style={{ fontSize:12, color:'rgba(255,255,255,0.4)', lineHeight:1.6 }}>
                    <span style={{ color:'rgba(255,255,255,0.6)', fontWeight:600 }}>Tip: </span>{opt.tip}
                  </p>
                </div>
              </div>
            ))}

            {/* Common roll recipe */}
            <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:20, padding:'20px', marginBottom:14 }}>
              <h3 className="syne" style={{ fontSize:16, fontWeight:700, color:'rgba(255,255,255,0.8)', marginBottom:12 }}>Common Roll Assembly</h3>
              {['Warm a whole wheat roti/wrap on dry tawa 30 sec each side.','Spread green chutney + optional yogurt-tahini sauce flat.','Add your choice of protein (paneer tikka / soya chunks / falafel).','Layer shredded cabbage, sliced tomato, onion rings, capsicum strips.','Sprinkle chaat masala + lemon juice. Roll tightly. Wrap in foil to hold.','Serve with extra green chutney and curd on the side.'].map((s,i)=>(
                <div key={i} style={{ display:'flex', gap:10, marginBottom:8 }}>
                  <div style={{ width:22, height:22, borderRadius:11, background:'rgba(255,107,53,0.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <span className="mono" style={{ fontSize:10, color:'#ff6b35' }}>{i+1}</span>
                  </div>
                  <p style={{ fontSize:13, color:'rgba(255,255,255,0.55)', lineHeight:1.6, paddingTop:2 }}>{s}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

function GroceryRow({ item, color }: { item: { name: string; qty: string; note?: string }; color: string }) {
  const [checked, setChecked] = useState(false);
  return (
    <button onClick={() => setChecked(c => !c)} style={{ display:'flex', alignItems:'flex-start', gap:12, padding:'10px 0', background:'none', border:'none', cursor:'pointer', width:'100%', textAlign:'left', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ width:20, height:20, borderRadius:6, border:`1.5px solid ${checked ? color : 'rgba(255,255,255,0.18)'}`, background: checked ? color : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1, transition:'all 0.15s' }}>
        {checked && <span style={{ color:'#000', fontSize:11, fontWeight:700 }}>✓</span>}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
          <span style={{ fontSize:14, color: checked?'rgba(255,255,255,0.25)':'rgba(255,255,255,0.8)', textDecoration:checked?'line-through':'none', transition:'all 0.2s', lineHeight:1.4 }}>{item.name}</span>
          <span className="mono" style={{ fontSize:11, color, flexShrink:0 }}>{item.qty}</span>
        </div>
        {item.note && <p style={{ fontSize:11, color:'rgba(255,255,255,0.3)', marginTop:2, lineHeight:1.4 }}>{item.note}</p>}
      </div>
    </button>
  );
}
