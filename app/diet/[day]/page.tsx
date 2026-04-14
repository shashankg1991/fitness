'use client';
import { use, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { DIET_PLAN, type Meal } from '@/lib/dietData';

// Ingredient categories
type Cat = { label: string; icon: string; color: string; keys: string[] };
const CATS: Cat[] = [
  { label:'Proteins',   icon:'🥩', color:'#ff6b35', keys:['paneer','tofu','dal','rajma','chana','chickpea','whey','protein','lentil','moong','masoor','toor','kidney bean'] },
  { label:'Dairy',      icon:'🥛', color:'#4eb8ff', keys:['milk','curd','yogurt','ghee','buttermilk','lassi','cream'] },
  { label:'Grains',     icon:'🌾', color:'#ffd60a', keys:['rice','oat','flour','quinoa','bread','poha','ragi','chapati','wheat','millet','semolina','dosa batter'] },
  { label:'Vegetables', icon:'🥦', color:'#30d158', keys:['tomato','onion','spinach','carrot','pea','mushroom','pepper','ginger','garlic','chilli','palak','broccoli','methi','cucumber','drumstick','lauki','vegetable','sabzi'] },
  { label:'Fruits & Nuts', icon:'🍌', color:'#bf5af2', keys:['banana','almond','walnut','date','makhana','peanut','cashew','apple','orange','pomegranate','flax','chia','seed','berr','fruit'] },
  { label:'Spices',     icon:'🌿', color:'#5ac8fa', keys:['cumin','turmeric','chilli','coriander','garam','masala','pepper','cardamom','salt','curry','mustard','ajwain','clove','cinnamon','bay','nutmeg'] },
];

function categorize(ing: string): Cat {
  const l = ing.toLowerCase();
  for (const cat of CATS) {
    if (cat.keys.some(k => l.includes(k))) return cat;
  }
  return { label:'Other', icon:'🧄', color:'rgba(255,255,255,0.4)', keys:[] };
}

function aggregateIngredients(meals: Meal[]) {
  const all: string[] = [];
  meals.forEach(m => { if (m.recipe?.ingredients) all.push(...m.recipe.ingredients); });
  // Deduplicate loosely by base ingredient word
  const seen = new Set<string>();
  const unique: string[] = [];
  all.forEach(ing => {
    const base = ing.toLowerCase().replace(/^[\d½⅓¼¾\s\-–tbsp|cup|g|kg|ml|tsp|handful|pinch|bunch|medium|large|small]+/gi,'').trim().split(' ').slice(0,2).join(' ');
    if (!seen.has(base)) { seen.add(base); unique.push(ing); }
  });
  // Group by category
  const groups: Record<string, { cat: Cat; items: string[] }> = {};
  unique.forEach(ing => {
    const cat = categorize(ing);
    if (!groups[cat.label]) groups[cat.label] = { cat, items: [] };
    groups[cat.label].items.push(ing);
  });
  return Object.values(groups).sort((a,b) => {
    const order = ['Proteins','Dairy','Grains','Vegetables','Fruits & Nuts','Spices','Other'];
    return order.indexOf(a.cat.label) - order.indexOf(b.cat.label);
  });
}

const THEME_COLOR: Record<string,string> = {
  'Moong':'#30d158','Oats':'#5ac8fa','Paneer':'#ff9500',
  'Dosa':'#bf5af2','Chole':'#ff6b35','Poha':'#ffd60a','High':'#ff375f',
};
function themeColor(theme: string) {
  const k = Object.keys(THEME_COLOR).find(k => theme.startsWith(k));
  return THEME_COLOR[k ?? 'Moong'];
}

const MEAL_ICONS: Record<string,string> = {
  Breakfast:'🌅', Snack:'🍎', Lunch:'🍛', 'Pre-Workout':'⚡', Recovery:'💪', Dinner:'🌙',
};

function CheckItem({ text, color }: { text: string; color: string }) {
  const [checked, setChecked] = useState(false);
  return (
    <button onClick={() => setChecked(c=>!c)} style={{ display:'flex', alignItems:'flex-start', gap:12, padding:'9px 0', background:'none', border:'none', cursor:'pointer', width:'100%', textAlign:'left' }}>
      <div style={{ width:20, height:20, borderRadius:6, border:`1.5px solid ${checked ? color : 'rgba(255,255,255,0.2)'}`, background: checked ? color : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1, transition:'all 0.15s' }}>
        {checked && <span style={{color:'#000',fontSize:12,fontWeight:700}}>✓</span>}
      </div>
      <span style={{ fontSize:14, color: checked ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.75)', lineHeight:1.5, textDecoration: checked ? 'line-through' : 'none', transition:'all 0.2s' }}>
        {text}
      </span>
    </button>
  );
}

export default function DietDayPage({ params }: { params: Promise<{ day:string }> }) {
  const { day } = use(params);
  const dayNum = parseInt(day);
  const d = DIET_PLAN.find(x => x.day === dayNum);
  if (!d) return <div style={{color:'#fff',padding:28}}>Not found</div>;

  const color = themeColor(d.theme);
  const groups = aggregateIngredients(d.meals);

  return (
    <main style={{ minHeight:'100vh', background:'#09090f', paddingBottom:60 }}>

      {/* ── Header ── */}
      <div style={{ padding:'48px 24px 28px', background:`linear-gradient(180deg, ${color}12 0%, transparent 100%)` }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
          <Link href="/diet" style={{ width:36, height:36, borderRadius:18, background:'rgba(255,255,255,0.06)', display:'flex', alignItems:'center', justifyContent:'center', textDecoration:'none' }}>
            <ArrowLeft size={16} color="rgba(255,255,255,0.7)"/>
          </Link>
          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
            {dayNum > 1 && (
              <Link href={`/diet/${dayNum-1}`} style={{ width:36,height:36,borderRadius:18,background:'rgba(255,255,255,0.06)',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none' }}>
                <ChevronLeft size={16} color="rgba(255,255,255,0.5)"/>
              </Link>
            )}
            <span className="mono" style={{ fontSize:12, color, padding:'6px 14px', background:`${color}18`, borderRadius:100, border:`1px solid ${color}30` }}>DAY {dayNum}</span>
            {dayNum < 31 && (
              <Link href={`/diet/${dayNum+1}`} style={{ width:36,height:36,borderRadius:18,background:'rgba(255,255,255,0.06)',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none' }}>
                <ChevronRight size={16} color="rgba(255,255,255,0.5)"/>
              </Link>
            )}
          </div>
        </div>

        <h1 className="syne" style={{ fontSize:30, fontWeight:800, color:'#fff', marginBottom:8 }}>{d.theme}</h1>

        {/* Macro row */}
        <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
          {[
            { l:'Protein', v:`${d.totalProtein}g`, c:'#ff6b35' },
            { l:'Calories', v:`${d.totalCalories}`, c:color },
            { l:'Meals', v:`${d.meals.length}`, c:'rgba(255,255,255,0.4)' },
          ].map(m=>(
            <div key={m.l} style={{ display:'flex', alignItems:'center', gap:6, padding:'7px 14px', background:'rgba(255,255,255,0.05)', borderRadius:100, border:'1px solid rgba(255,255,255,0.08)' }}>
              <span className="syne" style={{ fontSize:16, fontWeight:700, color:m.c }}>{m.v}</span>
              <span style={{ fontSize:12, color:'rgba(255,255,255,0.35)' }}>{m.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── TODAY'S INGREDIENTS ── */}
      <section style={{ padding:'0 24px 32px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
          <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.07)' }}/>
          <span className="mono" style={{ fontSize:10, letterSpacing:3, color:'rgba(255,255,255,0.35)', whiteSpace:'nowrap' }}>WHAT YOU NEED TODAY</span>
          <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.07)' }}/>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
          {groups.map(({ cat, items }) => (
            <div key={cat.label}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
                <span style={{ fontSize:16 }}>{cat.icon}</span>
                <span className="syne" style={{ fontSize:14, fontWeight:600, color:cat.color }}>{cat.label}</span>
                <span className="mono" style={{ fontSize:10, color:'rgba(255,255,255,0.2)' }}>{items.length}</span>
              </div>
              <div style={{ paddingLeft:4 }}>
                {items.map((ing,i) => (
                  <CheckItem key={i} text={ing} color={cat.color}/>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop:20, padding:'12px 16px', background:'rgba(255,255,255,0.03)', borderRadius:14, border:'1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontSize:12, color:'rgba(255,255,255,0.35)', lineHeight:1.6 }}>
            🧂 <strong style={{color:'rgba(255,255,255,0.5)'}}>Always keep stocked:</strong> cumin, turmeric, coriander powder, garam masala, red chilli powder, mustard seeds, curry leaves, salt, black pepper, ghee, oil
          </p>
        </div>
      </section>

      {/* ── MEALS ── */}
      <section style={{ padding:'0 24px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:24 }}>
          <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.07)' }}/>
          <span className="mono" style={{ fontSize:10, letterSpacing:3, color:'rgba(255,255,255,0.35)', whiteSpace:'nowrap' }}>MEALS FOR THE DAY</span>
          <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.07)' }}/>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
          {d.meals.map((meal, mi) => {
            const mcolor = mi % 2 === 0 ? color : 'rgba(255,255,255,0.5)';
            const icon = MEAL_ICONS[meal.label] ?? '🍽️';
            return (
              <div key={mi} style={{ position:'relative', paddingLeft:32, paddingBottom: mi < d.meals.length-1 ? 36 : 0 }}>
                {/* Timeline line */}
                {mi < d.meals.length-1 && (
                  <div style={{ position:'absolute', left:11, top:28, bottom:0, width:1, background:'rgba(255,255,255,0.07)' }}/>
                )}
                {/* Timeline dot */}
                <div style={{ position:'absolute', left:6, top:8, width:12, height:12, borderRadius:6, background: color, border:'2px solid #09090f' }}/>

                {/* Meal card */}
                <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:20, overflow:'hidden' }}>
                  {/* Meal header */}
                  <div style={{ padding:'16px 18px 12px', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <span style={{ fontSize:18 }}>{icon}</span>
                        <span className="mono" style={{ fontSize:11, letterSpacing:2, color: color }}>{meal.time}</span>
                        <span className="mono" style={{ fontSize:10, color:'rgba(255,255,255,0.25)', padding:'2px 8px', background:'rgba(255,255,255,0.05)', borderRadius:100 }}>{meal.label}</span>
                      </div>
                      <div style={{ display:'flex', gap:6 }}>
                        <span className="mono" style={{ fontSize:11, color:'#ff6b35', padding:'3px 8px', background:'rgba(255,107,53,0.1)', borderRadius:100 }}>{meal.proteinG}g P</span>
                        <span className="mono" style={{ fontSize:11, color:'rgba(255,255,255,0.35)', padding:'3px 8px', background:'rgba(255,255,255,0.05)', borderRadius:100 }}>{meal.calories}</span>
                      </div>
                    </div>
                    <h3 className="syne" style={{ fontSize:17, fontWeight:700, color:'#fff' }}>{meal.name}</h3>
                  </div>

                  {/* Items */}
                  <div style={{ padding:'12px 18px', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
                    <p className="mono" style={{ fontSize:10, letterSpacing:2, color:'rgba(255,255,255,0.25)', marginBottom:8 }}>WHAT TO EAT</p>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                      {meal.items.map((item,i) => (
                        <span key={i} style={{ fontSize:13, color:'rgba(255,255,255,0.65)', padding:'5px 10px', background:'rgba(255,255,255,0.05)', borderRadius:8, lineHeight:1.4 }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Recipe */}
                  {meal.recipe && meal.recipe.steps.length > 0 && (
                    <div style={{ padding:'12px 18px' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
                        <p className="mono" style={{ fontSize:10, letterSpacing:2, color:'rgba(255,255,255,0.25)' }}>RECIPE</p>
                        <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.05)' }}/>
                        <span className="mono" style={{ fontSize:10, color:color }}>{meal.recipe.prepTime}</span>
                      </div>
                      {/* Ingredients compact */}
                      <div style={{ marginBottom:12, display:'flex', flexWrap:'wrap', gap:4 }}>
                        {meal.recipe.ingredients.map((ing,i)=>(
                          <span key={i} style={{ fontSize:11, color:'rgba(255,255,255,0.4)', padding:'3px 8px', background:'rgba(255,255,255,0.04)', borderRadius:6, border:'1px solid rgba(255,255,255,0.06)' }}>{ing}</span>
                        ))}
                      </div>
                      {/* Steps */}
                      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                        {meal.recipe.steps.map((step,i)=>(
                          <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                            <div style={{ width:22, height:22, borderRadius:11, background:`${color}20`, border:`1px solid ${color}40`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                              <span className="mono" style={{ fontSize:10, color }}>{i+1}</span>
                            </div>
                            <p style={{ fontSize:13, color:'rgba(255,255,255,0.6)', lineHeight:1.6, paddingTop:2 }}>{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </main>
  );
}
