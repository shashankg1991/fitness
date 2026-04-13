'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { BRO_SPLIT, PPL_SPLIT } from '@/lib/workoutData';

const MODES = [
  { id:'bro', label:'Bro Split', sub:'One muscle group per day', desc:'Chest · Back · Shoulders · Legs · Biceps · Triceps · Forearms', split: BRO_SPLIT, color:'#FF6B35' },
  { id:'ppl', label:'Push / Pull / Legs', sub:'Classic PPL format', desc:'Push · Pull · Legs × 2 + Active Rest', split: PPL_SPLIT, color:'#AF52DE' },
];

const dayColors = ['#FF6B35','#34C759','#AF52DE','#FFD60A','#FF2D55','#FF9500','#30D158'];

export default function WorkoutPage() {
  const [mode, setMode] = useState<'bro'|'ppl'|null>(null);
  const selected = MODES.find(m => m.id === mode);

  return (
    <main className="min-h-screen" style={{background:'#0a0a0f'}}>
      <header className="px-6 pt-10 pb-6 flex items-center gap-4">
        <Link href="/" className="w-8 h-8 glass rounded-lg flex items-center justify-center">
          <ArrowLeft size={16} style={{color:'#f0f0f5'}}/>
        </Link>
        <div>
          <h1 className="font-display text-2xl tracking-widest" style={{color:'#f0f0f5'}}>WORKOUT</h1>
          <p className="text-xs" style={{color:'#8888a0'}}>{selected ? selected.label : 'Choose your training mode'}</p>
        </div>
      </header>

      {!mode ? (
        <div className="px-6">
          <p className="text-sm mb-6" style={{color:'#8888a0'}}>
            Both modes include: 5-min warmup · Main workout · Abs circuit · Cooldown · Back pain relief
          </p>
          <div className="flex flex-col gap-4">
            {MODES.map(m => (
              <button key={m.id} onClick={() => setMode(m.id as any)}
                className="text-left glass2 rounded-2xl p-6 section-card w-full">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-display text-2xl tracking-wider mb-1" style={{color: m.color}}>{m.label}</div>
                    <div className="text-sm mb-2" style={{color:'#f0f0f5'}}>{m.sub}</div>
                    <div className="text-xs font-mono" style={{color:'#8888a0'}}>{m.desc}</div>
                  </div>
                  <ChevronRight size={20} style={{color: m.color}} className="mt-1 ml-4 shrink-0"/>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-6">
          {/* Mode switcher */}
          <div className="flex gap-2 mb-6">
            {MODES.map(m => (
              <button key={m.id} onClick={() => setMode(m.id as any)}
                className="flex-1 py-2 rounded-xl text-sm font-mono transition-all"
                style={{
                  background: mode === m.id ? m.color : 'rgba(255,255,255,0.05)',
                  color: mode === m.id ? '#fff' : '#8888a0',
                }}>
                {m.id === 'bro' ? 'Bro Split' : 'PPL'}
              </button>
            ))}
          </div>

          {/* Week info */}
          <div className="glass rounded-xl p-4 mb-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-xs font-mono mb-1" style={{color:'#8888a0'}}>WEEK 1–2 · FOUNDATION</div>
                <div className="text-sm" style={{color:'#f0f0f5'}}>3 sets · 12–15 reps · 60 sec rest</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono mb-1" style={{color:'#8888a0'}}>WEEK 3–4 · PROGRESSIVE</div>
                <div className="text-sm" style={{color:'#f0f0f5'}}>4 sets · 10–12 reps · 75 sec rest</div>
              </div>
            </div>
          </div>

          {/* Day cards */}
          <div className="mb-4 text-xs font-mono" style={{color:'#8888a0'}}>TAP A DAY TO START</div>
          <div className="flex flex-col gap-3">
            {selected!.split.map((day, i) => (
              <Link key={day.day} href={`/workout/${mode}/${day.day}`}>
                <div className="glass2 rounded-2xl p-4 section-card flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-display text-sm tracking-wider"
                    style={{background:`${dayColors[i]}22`, color: dayColors[i]}}>
                    {day.badge}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-xl tracking-wider" style={{color:'#f0f0f5'}}>{day.muscle}</div>
                    <div className="text-xs mt-0.5" style={{color:'#8888a0'}}>
                      {day.sections.find(s=>s.id==='main')?.exercises.map(e=>e.name.split(' ').slice(-1)[0]).join(' · ')}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs font-mono text-right" style={{color:'#555570'}}>
                      {day.sections.find(s=>s.id==='main')?.exercises.length} ex<br/>
                      + abs
                    </div>
                    <ChevronRight size={16} style={{color: dayColors[i]}}/>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="pb-10"/>
        </div>
      )}
    </main>
  );
}
