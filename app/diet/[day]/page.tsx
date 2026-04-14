'use client';
import { use, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { DIET_PLAN } from '@/lib/dietData';

const THEME_COLOR: Record<string,string> = {
  'Moong':'#30d158','Oats':'#5ac8fa','Paneer':'#ff9500',
  'Soya':'#bf5af2','Chole':'#ff6b35','Poha':'#ffd60a','High':'#ff375f',
};
function themeColor(theme: string) {
  const k = Object.keys(THEME_COLOR).find(k => theme.startsWith(k));
  return THEME_COLOR[k ?? 'Moong'];
}

const MEAL_ICONS: Record<string,string> = {
  Breakfast:'🌅', Snack:'🍎', Lunch:'🍛', 'Pre-Workout':'⚡', Recovery:'💪', Dinner:'🌙',
};

type Cat = { label:string; icon:string; color:string; keys:string[] };
const CATS: Cat[] = [
  { label:'Proteins',  icon:'🥩', color:'#ff6b35', keys:['paneer','tofu','dal','rajma','chana','chickpea','whey','soya','moong','masoor','toor','lentil'] },
  { label:'Dairy',     icon:'🥛', color:'#4eb8ff', keys:['milk','curd','yogurt','ghee','buttermilk','lassi'] },
  { label:'Grains',    icon:'🌾', color:'#ffd60a', keys:['rice','oat','flour','quinoa','bread','poha','ragi','wheat','chapati','semolina','dosa'] },
  { label:'Vegetables',icon:'🥦', color:'#30d158', keys:['tomato','onion','spinach','carrot','pea','mushroom','pepper','capsicum','ginger','garlic','chilli','palak','broccoli','cucumber','cabbage','vegetable'] },
  { label:'Fruits & Nuts',icon:'🍌', color:'#bf5af2', keys:['banana','almond','walnut','date','makhana','peanut','cashew','apple','pomegranate','flax','chia','seed','fruit','honey'] },
  { label:'Spices',    icon:'🌿', color:'#5ac8fa', keys:['cumin','turmeric','chilli','coriander','garam','masala','pepper','cardamom','salt','curry','mustard','ajwain'] },
];
function categorize(ing: string) {
  const l = ing.toLowerCase();
  for (const c of CATS) if (c.keys.some(k => l.includes(k))) return c;
  return { label:'Other', icon:'🧄', color:'rgba(255,255,255,0.4)', keys:[] };
}

function aggregateIngredients(meals: any[]) {
  const all: string[] = [];
  meals.forEach(m => { if (m.recipe?.ingredients) all.push(...m.recipe.ingredients); });
  const seen = new Set<string>();
  const unique: string[] = [];
  all.forEach(ing => {
    const base = ing.toLowerCase().replace(/^[\d½⅓¼¾\s\-–tbsp|cup|g|kg|ml|tsp|handful|pinch|bunch|medium|large|small]+/gi,'').trim().split(' ').slice(0,2).join(' ');
    if (!seen.has(base)) { seen.add(base); unique.push(ing); }
  });
  const groups: Record<string, { cat:any; items:string[] }> = {};
  unique.forEach(ing => {
    const cat = categorize(ing);
    if (!groups[cat.label]) groups[cat.label] = { cat, items:[] };
    groups[cat.label].items.push(ing);
  });
  const order = ['Proteins','Dairy','Grains','Vegetables','Fruits & Nuts','Spices','Other'];
  return Object.values(groups).sort((a,b) => order.indexOf(a.cat.label) - order.indexOf(b.cat.label));
}

function CheckItem({ text, color }: { text:string; color:string }) {
  const [checked, setChecked] = useState(false);
  return (
    <button onClick={()=>setChecked(c=>!c)} style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'8px 0', background:'none', border:'none', cursor:'pointer', width:'100%', textAlign:'left', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ width:18,height:18,borderRadius:5,border:`1.5px solid ${checked?color:'rgba(255,255,255,0.18)'}`,background:checked?color:'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:2,transition:'all 0.15s' }}>
        {checked && <span style={{ color:'#000',fontSize:10,fontWeight:700 }}>✓</span>}
      </div>
      <span style={{ fontSize:13,color:checked?'rgba(255,255,255,0.25)':'rgba(255,255,255,0.75)',textDecoration:checked?'line-through':'none',transition:'all 0.2s',lineHeight:1.5 }}>{text}</span>
    </button>
  );
}

function MealCard({ meal, color }: { meal:any; color:string }) {
  const [swapping, setSwapping] = useState(false);
  const [swapped, setSwapped] = useState<any | null>(null);
  const displayed = swapped ?? meal;
  const icon = MEAL_ICONS[meal.label] ?? '🍽️';

  return (
    <div style={{ position:'relative', paddingLeft:28, paddingBottom:24 }}>
      {/* timeline dot */}
      <div style={{ position:'absolute', left:6, top:10, width:10, height:10, borderRadius:5, background:color, border:'2px solid #09090f' }}/>

      <div style={{ background:'rgba(255,255,255,0.03)', border:`1px solid ${swapped ? `${color}40` : 'rgba(255,255,255,0.07)'}`, borderRadius:20, overflow:'hidden', transition:'border-color 0.3s' }}>
        {/* Header */}
        <div style={{ padding:'14px 16px 10px', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:5 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ fontSize:16 }}>{icon}</span>
              <span className="mono" style={{ fontSize:11, letterSpacing:1, color }}>{displayed.time}</span>
              <span className="mono" style={{ fontSize:9, color:'rgba(255,255,255,0.25)', background:'rgba(255,255,255,0.05)', padding:'2px 8px', borderRadius:100 }}>{meal.label}</span>
            </div>
            <div style={{ display:'flex', gap:5, alignItems:'center' }}>
              <span className="mono" style={{ fontSize:11, color:'#ff6b35' }}>{displayed.proteinG}g P</span>
              <span className="mono" style={{ fontSize:11, color:'rgba(255,255,255,0.3)' }}>{displayed.calories}</span>
              {/* Swap button */}
              {meal.swapOptions && meal.swapOptions.length > 0 && (
                <button onClick={() => setSwapping(s=>!s)} style={{ width:28,height:28,borderRadius:14,background:swapping?`${color}25`:'rgba(255,255,255,0.06)',border:`1px solid ${swapping?color:'rgba(255,255,255,0.1)'}`,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer' }}>
                  <RefreshCw size={12} color={swapping ? color : 'rgba(255,255,255,0.4)'}/>
                </button>
              )}
            </div>
          </div>
          <h3 className="syne" style={{ fontSize:16, fontWeight:700, color:'#fff' }}>{displayed.name}</h3>
          {swapped && (
            <div style={{ marginTop:6 }}>
              <span className="mono" style={{ fontSize:10, color, background:`${color}15`, padding:'3px 10px', borderRadius:100 }}>SWAPPED</span>
              <button onClick={()=>setSwapped(null)} style={{ background:'none',border:'none',cursor:'pointer',fontSize:11,color:'rgba(255,255,255,0.3)',marginLeft:8 }}>restore original</button>
            </div>
          )}
        </div>

        {/* Swap panel */}
        {swapping && meal.swapOptions && (
          <div style={{ padding:'12px 16px', borderBottom:'1px solid rgba(255,255,255,0.05)', background:`${color}06` }}>
            <p className="mono" style={{ fontSize:9, letterSpacing:2, color:`${color}99`, marginBottom:10 }}>SWAP THIS MEAL WITH</p>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {meal.swapOptions.map((opt: any, i: number) => (
                <button key={i} onClick={() => { setSwapped(opt); setSwapping(false); }}
                  style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:12, cursor:'pointer', textAlign:'left' }}>
                  <div>
                    <p style={{ fontSize:13, color:'rgba(255,255,255,0.8)', fontFamily:'Syne,sans-serif', fontWeight:600, marginBottom:2 }}>{opt.name}</p>
                    <p className="mono" style={{ fontSize:11, color }}>{opt.proteinG}g protein · {opt.calories} kcal</p>
                  </div>
                  <span style={{ color, fontSize:16 }}>→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Items */}
        <div style={{ padding:'10px 16px', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
          <p className="mono" style={{ fontSize:9, letterSpacing:2, color:'rgba(255,255,255,0.2)', marginBottom:8 }}>WHAT TO EAT</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
            {displayed.items.map((item: string, i: number) => (
              <span key={i} style={{ fontSize:12, color:'rgba(255,255,255,0.65)', padding:'4px 10px', background:'rgba(255,255,255,0.05)', borderRadius:8, lineHeight:1.4 }}>{item}</span>
            ))}
          </div>
        </div>

        {/* Recipe */}
        {displayed.recipe && displayed.recipe.steps.length > 0 && (
          <div style={{ padding:'12px 16px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
              <p className="mono" style={{ fontSize:9, letterSpacing:2, color:'rgba(255,255,255,0.2)' }}>RECIPE</p>
              <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.05)' }}/>
              <span className="mono" style={{ fontSize:10, color }}>{displayed.recipe.prepTime}</span>
            </div>
            {/* Ingredients chips */}
            <div style={{ marginBottom:10, display:'flex', flexWrap:'wrap', gap:4 }}>
              {displayed.recipe.ingredients.map((ing: string, i: number) => (
                <span key={i} style={{ fontSize:11, color:'rgba(255,255,255,0.4)', padding:'3px 8px', background:'rgba(255,255,255,0.04)', borderRadius:6, border:'1px solid rgba(255,255,255,0.06)' }}>{ing}</span>
              ))}
            </div>
            {/* Steps */}
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {displayed.recipe.steps.map((step: string, i: number) => (
                <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                  <div style={{ width:20,height:20,borderRadius:10,background:`${color}18`,border:`1px solid ${color}35`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                    <span className="mono" style={{ fontSize:9, color }}>{i+1}</span>
                  </div>
                  <p style={{ fontSize:13, color:'rgba(255,255,255,0.55)', lineHeight:1.65, paddingTop:1 }}>{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DietDayPage({ params }: { params: Promise<{ day:string }> }) {
  const { day } = use(params);
  const dayNum = parseInt(day);
  const d = DIET_PLAN.find(x => x.day === dayNum);
  if (!d) return <div style={{ color:'#fff', padding:28 }}>Not found</div>;

  const color = themeColor(d.theme);
  const groups = aggregateIngredients(d.meals);
  const [activeSection, setActiveSection] = useState<'ingredients'|'prepAhead'|'meals'>('ingredients');

  return (
    <main style={{ minHeight:'100vh', background:'#09090f', paddingBottom:60 }}>
      {/* Header */}
      <div style={{ padding:'44px 24px 24px', background:`linear-gradient(180deg,${color}10 0%,transparent 100%)` }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
          <Link href="/diet" style={{ width:36,height:36,borderRadius:18,background:'rgba(255,255,255,0.06)',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none' }}>
            <ArrowLeft size={15} color="rgba(255,255,255,0.7)"/>
          </Link>
          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
            {dayNum > 1 && (
              <Link href={`/diet/${dayNum-1}`} style={{ width:34,height:34,borderRadius:17,background:'rgba(255,255,255,0.06)',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none' }}>
                <ChevronLeft size={15} color="rgba(255,255,255,0.5)"/>
              </Link>
            )}
            <span className="mono" style={{ fontSize:12, color, padding:'5px 14px', background:`${color}15`, borderRadius:100, border:`1px solid ${color}30` }}>DAY {dayNum}</span>
            {dayNum < 31 && (
              <Link href={`/diet/${dayNum+1}`} style={{ width:34,height:34,borderRadius:17,background:'rgba(255,255,255,0.06)',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none' }}>
                <ChevronRight size={15} color="rgba(255,255,255,0.5)"/>
              </Link>
            )}
          </div>
        </div>

        <h1 className="syne" style={{ fontSize:28, fontWeight:800, color:'#fff', marginBottom:10 }}>{d.theme}</h1>

        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {[{l:'Protein',v:`${d.totalProtein}g`,c:'#ff6b35'},{l:'Calories',v:`${d.totalCalories}`,c:color},{l:'Meals',v:`${d.meals.length}`,c:'rgba(255,255,255,0.35)'}].map(m=>(
            <div key={m.l} style={{ display:'flex', alignItems:'center', gap:6, padding:'6px 12px', background:'rgba(255,255,255,0.05)', borderRadius:100, border:'1px solid rgba(255,255,255,0.08)' }}>
              <span className="syne" style={{ fontSize:15, fontWeight:700, color:m.c }}>{m.v}</span>
              <span style={{ fontSize:11, color:'rgba(255,255,255,0.3)' }}>{m.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section nav */}
      <div style={{ padding:'0 24px 20px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6, background:'rgba(255,255,255,0.04)', padding:4, borderRadius:100 }}>
          {([
            { id:'ingredients', label:'🧄 Need' },
            { id:'prepAhead',   label:'🌙 Prep' },
            { id:'meals',       label:'🍛 Meals' },
          ] as { id:typeof activeSection; label:string }[]).map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
              padding:'9px 0', borderRadius:100, border:'none', cursor:'pointer',
              background: activeSection===s.id ? color : 'transparent',
              color: activeSection===s.id ? (color==='#ffd60a'?'#000':'#fff') : 'rgba(255,255,255,0.4)',
              fontFamily:'Syne,sans-serif', fontSize:13, fontWeight:700, transition:'all 0.2s',
            }}>{s.label}</button>
          ))}
        </div>
      </div>

      {/* ── INGREDIENTS TAB ── */}
      {activeSection === 'ingredients' && (
        <section style={{ padding:'0 24px' }}>
          <p style={{ fontSize:13, color:'rgba(255,255,255,0.4)', marginBottom:20, lineHeight:1.6 }}>
            All ingredients needed for today's meals. Tap to check off as you shop or prep.
          </p>
          {groups.map(({ cat, items }) => (
            <div key={cat.label} style={{ marginBottom:20 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                <span style={{ fontSize:16 }}>{cat.icon}</span>
                <span className="syne" style={{ fontSize:14, fontWeight:700, color:cat.color }}>{cat.label}</span>
                <span className="mono" style={{ fontSize:10, color:'rgba(255,255,255,0.2)' }}>{items.length}</span>
              </div>
              {items.map((ing, i) => <CheckItem key={i} text={ing} color={cat.color}/>)}
            </div>
          ))}
          <div style={{ padding:'12px 16px', background:'rgba(255,255,255,0.03)', borderRadius:14, border:'1px solid rgba(255,255,255,0.06)', marginTop:8, marginBottom:20 }}>
            <p style={{ fontSize:12, color:'rgba(255,255,255,0.35)', lineHeight:1.6 }}>
              🧂 <strong style={{ color:'rgba(255,255,255,0.5)' }}>Always stocked:</strong> cumin, turmeric, coriander, garam masala, red chilli, mustard seeds, curry leaves, salt, pepper, ghee, oil
            </p>
          </div>
        </section>
      )}

      {/* ── PREP AHEAD TAB ── */}
      {activeSection === 'prepAhead' && (
        <section style={{ padding:'0 24px' }}>
          <div style={{ padding:'14px 18px', background:`${color}10`, border:`1px solid ${color}25`, borderRadius:16, marginBottom:20 }}>
            <p className="syne" style={{ fontSize:15, fontWeight:700, color, marginBottom:4 }}>🌙 Do Tonight for Tomorrow</p>
            <p style={{ fontSize:13, color:'rgba(255,255,255,0.5)', lineHeight:1.6 }}>
              15–20 min of prep the night before saves 45+ min the next day and means zero morning stress.
            </p>
          </div>
          {d.prepAhead.map((task, i) => (
            <PrepTask key={i} task={task} color={color} idx={i}/>
          ))}

          {/* Per-meal prep notes */}
          <div style={{ marginTop:24 }}>
            <p className="mono" style={{ fontSize:9, letterSpacing:3, color:'rgba(255,255,255,0.25)', marginBottom:16 }}>MEAL-SPECIFIC PREP</p>
            {d.meals.filter(m => m.prepAhead).map((meal, i) => (
              <div key={i} style={{ display:'flex', gap:12, marginBottom:14, padding:'12px 14px', background:'rgba(255,255,255,0.03)', borderRadius:14, border:'1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize:16, flexShrink:0 }}>{MEAL_ICONS[meal.label]??'🍽️'}</span>
                <div>
                  <p className="mono" style={{ fontSize:10, color, marginBottom:4 }}>{meal.label} — {meal.time}</p>
                  <p style={{ fontSize:13, color:'rgba(255,255,255,0.55)', lineHeight:1.6 }}>{meal.prepAhead}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── MEALS TAB ── */}
      {activeSection === 'meals' && (
        <section style={{ padding:'0 24px' }}>
          <div style={{ padding:'10px 14px', background:'rgba(255,107,53,0.07)', borderRadius:12, marginBottom:20, border:'1px solid rgba(255,107,53,0.15)' }}>
            <p style={{ fontSize:12, color:'rgba(255,255,255,0.5)', lineHeight:1.6 }}>
              <span style={{ color:'#ff6b35' }}>🔄 Swap meals</span> — tap the ↻ icon on any meal to swap it with a shawarma roll or alternate option.
            </p>
          </div>

          {/* Timeline */}
          <div style={{ position:'relative' }}>
            {/* Vertical line */}
            <div style={{ position:'absolute', left:10, top:18, bottom:24, width:1, background:'rgba(255,255,255,0.07)' }}/>
            {d.meals.map((meal, i) => (
              <MealCard key={i} meal={meal} color={color}/>
            ))}
          </div>
        </section>
      )}

    </main>
  );
}

function PrepTask({ task, color, idx }: { task:string; color:string; idx:number }) {
  const [done, setDone] = useState(false);
  return (
    <button onClick={()=>setDone(d=>!d)} style={{ display:'flex', alignItems:'flex-start', gap:12, padding:'14px 0', background:'none', border:'none', cursor:'pointer', width:'100%', textAlign:'left', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ width:28,height:28,borderRadius:14,border:`2px solid ${done?color:'rgba(255,255,255,0.15)'}`,background:done?color:'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,transition:'all 0.2s' }}>
        {done ? <span style={{ color:'#000',fontSize:13,fontWeight:700 }}>✓</span>
              : <span className="mono" style={{ fontSize:11, color:'rgba(255,255,255,0.3)' }}>{idx+1}</span>}
      </div>
      <p style={{ fontSize:14, color:done?'rgba(255,255,255,0.3)':'rgba(255,255,255,0.75)', lineHeight:1.65, textDecoration:done?'line-through':'none', transition:'all 0.2s', paddingTop:3 }}>{task}</p>
    </button>
  );
}
