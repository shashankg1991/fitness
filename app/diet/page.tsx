'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Leaf, Target } from 'lucide-react';
import { DIET_PLAN } from '@/lib/dietData';

const themes = [
  'Moong Dal Power', 'Oats & Tofu', 'Paneer Tikka',
  'Dosa & Tofu', 'Chole & Quinoa', 'Poha & Paneer', 'High Protein'
];

const themeColors = ['#34C759','#00C7BE','#FF9500','#AF52DE','#FF6B35','#FFD60A','#FF2D55'];

function getColor(theme: string) {
  const idx = themes.findIndex(t => theme.includes(t.split(' ')[0]));
  return themeColors[Math.max(0, idx) % themeColors.length];
}

export default function DietPage() {
  const [hoveredDay, setHoveredDay] = useState<number|null>(null);

  return (
    <main className="min-h-screen" style={{background:'#0a0a0f'}}>
      <header className="px-6 pt-10 pb-6 flex items-center gap-4">
        <Link href="/" className="w-8 h-8 glass rounded-lg flex items-center justify-center">
          <ArrowLeft size={16} style={{color:'#f0f0f5'}}/>
        </Link>
        <div>
          <h1 className="font-display text-2xl tracking-widest" style={{color:'#f0f0f5'}}>DIET PLAN</h1>
          <p className="text-xs" style={{color:'#8888a0'}}>31-day Indian vegetarian · tap a day</p>
        </div>
      </header>

      {/* Macros banner */}
      <div className="mx-6 mb-6 glass rounded-xl p-4">
        <div className="text-xs font-mono mb-3" style={{color:'#8888a0'}}>DAILY TARGETS · 73 KG MALE · LEAN MUSCLE</div>
        <div className="grid grid-cols-4 gap-3">
          {[
            {label:'Protein',val:'~135g',color:'#FF6B35'},
            {label:'Carbs',val:'~215g',color:'#FFD60A'},
            {label:'Fat',val:'~55g',color:'#AF52DE'},
            {label:'Calories',val:'~2080',color:'#34C759'},
          ].map(m=>(
            <div key={m.label} className="text-center">
              <div className="font-display text-xl" style={{color:m.color}}>{m.val}</div>
              <div className="text-xs" style={{color:'#8888a0'}}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mx-6 mb-4 flex gap-2 flex-wrap">
        {themes.slice(0,6).map((t,i)=>(
          <div key={t} className="flex items-center gap-1.5 text-xs font-mono" style={{color:'#8888a0'}}>
            <div className="w-2 h-2 rounded-full" style={{background:themeColors[i]}}/>
            {t.split(' ')[0]}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-7 gap-2">
          {['M','T','W','T','F','S','S'].map((d,i)=>(
            <div key={i} className="text-center text-xs font-mono pb-2" style={{color:'#555570'}}>{d}</div>
          ))}
          {/* Empty cells for alignment (start from Monday) */}
          {[0].map(i => <div key={`e${i}`}/>)}
          {DIET_PLAN.map(dayDiet => {
            const color = getColor(dayDiet.theme);
            const isHovered = hoveredDay === dayDiet.day;
            return (
              <Link key={dayDiet.day} href={`/diet/${dayDiet.day}`}>
                <div
                  className="cal-day aspect-square rounded-xl flex flex-col items-center justify-center cursor-pointer"
                  style={{
                    background: isHovered ? `${color}33` : `${color}15`,
                    border: isHovered ? `1px solid ${color}88` : `1px solid ${color}30`,
                  }}
                  onMouseEnter={() => setHoveredDay(dayDiet.day)}
                  onMouseLeave={() => setHoveredDay(null)}
                >
                  <div className="font-display text-sm" style={{color: isHovered ? color : '#f0f0f5'}}>
                    {dayDiet.day}
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full mt-0.5" style={{background: color}}/>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Preview on hover */}
      {hoveredDay && (
        <div className="mx-6 mb-6 glass2 rounded-2xl p-4 fade-in">
          {(() => {
            const d = DIET_PLAN.find(x=>x.day===hoveredDay)!;
            const color = getColor(d.theme);
            return (
              <>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-display text-xl" style={{color}}>DAY {d.day}</div>
                    <div className="text-sm" style={{color:'#f0f0f5'}}>{d.theme}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono" style={{color}}>{d.totalCalories} kcal</div>
                    <div className="text-xs font-mono" style={{color:'#8888a0'}}>{d.totalProtein}g protein</div>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {d.meals.slice(0,4).map(m=>(
                    <span key={m.name} className="text-xs px-2 py-1 rounded-lg" style={{background:`${color}18`, color}}>
                      {m.label}
                    </span>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Tips */}
      <div className="mx-6 mb-8 glass rounded-xl p-4">
        <div className="text-xs font-mono mb-2" style={{color:'#34C759'}}>KEY RULES FOR LEAN BODY</div>
        {[
          'Big breakfast + lunch · Light dinner always',
          'Post-workout meal within 30 min is non-negotiable',
          'Drink 3–4 litres water daily',
          'Avoid refined carbs and sugar after 6 PM',
        ].map((tip,i)=>(
          <div key={i} className="flex items-start gap-2 mb-1.5">
            <Leaf size={11} style={{color:'#34C759', marginTop:3}} className="shrink-0"/>
            <span className="text-xs" style={{color:'#c0c0d0'}}>{tip}</span>
          </div>
        ))}
      </div>
      <div className="pb-10"/>
    </main>
  );
}
