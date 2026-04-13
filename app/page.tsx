'use client';
import Link from 'next/link';
import { Dumbbell, UtensilsCrossed, ChevronRight, Flame } from 'lucide-react';

export default function Home() {
  return (
    <main className="hero-bg min-h-screen flex flex-col">
      <header className="px-6 pt-10 pb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:'#FF6B35'}}>
            <Flame size={16} color="#fff" />
          </div>
          <span className="font-display text-2xl tracking-widest text-white">FITCORE</span>
        </div>
        <p className="text-sm ml-11" style={{color:'#8888a0'}}>Your complete fitness companion</p>
      </header>
      <section className="px-6 py-8">
        <h1 className="font-display text-6xl leading-none mb-4" style={{color:'#f0f0f5'}}>
          TRAIN.<br/><span style={{color:'#FF6B35'}}>EAT.</span><br/>REPEAT.
        </h1>
        <p style={{color:'#8888a0'}} className="text-base leading-relaxed max-w-sm">
          Daily workouts with timer, form guides, and abs. 31-day Indian veg diet with full recipes. Built for lean muscle at 35.
        </p>
      </section>
      <div className="mx-6 mb-8 glass rounded-2xl p-4 grid grid-cols-3 gap-4">
        {[{label:'Days',val:'31',sub:'Diet plan'},{label:'Splits',val:'2',sub:'Training modes'},{label:'Recipes',val:'40+',sub:'Indian veg'}].map(s=>(
          <div key={s.label} className="text-center">
            <div className="font-display text-3xl" style={{color:'#FF6B35'}}>{s.val}</div>
            <div className="font-display text-sm tracking-wider" style={{color:'#f0f0f5'}}>{s.label}</div>
            <div className="text-xs mt-0.5" style={{color:'#8888a0'}}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div className="px-6 flex flex-col gap-4 flex-1">
        <Link href="/workout">
          <div className="glass2 rounded-2xl p-6 cursor-pointer" style={{background:'linear-gradient(135deg,rgba(255,107,53,0.08),rgba(255,107,53,0.02))'}}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{background:'rgba(255,107,53,0.2)'}}>
                <Dumbbell size={22} style={{color:'#FF6B35'}}/>
              </div>
              <ChevronRight size={20} style={{color:'#FF6B35'}} className="mt-1"/>
            </div>
            <h2 className="font-display text-3xl tracking-wider mb-1" style={{color:'#f0f0f5'}}>WORKOUT</h2>
            <p style={{color:'#8888a0'}} className="text-sm leading-relaxed">Bro split or Push/Pull/Legs. Warmup, main lifts, abs circuit, cooldown & back pain relief every day.</p>
            <div className="mt-4 flex gap-2 flex-wrap">
              {['Bro Split','PPL','Timer','Form Guide','Abs Circuit'].map(t=>(
                <span key={t} className="text-xs px-2 py-1 rounded-full font-mono" style={{background:'rgba(255,107,53,0.12)',color:'#FF9F6B'}}>{t}</span>
              ))}
            </div>
          </div>
        </Link>
        <Link href="/diet">
          <div className="glass2 rounded-2xl p-6 cursor-pointer" style={{background:'linear-gradient(135deg,rgba(52,199,89,0.08),rgba(52,199,89,0.02))'}}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{background:'rgba(52,199,89,0.2)'}}>
                <UtensilsCrossed size={22} style={{color:'#34C759'}}/>
              </div>
              <ChevronRight size={20} style={{color:'#34C759'}} className="mt-1"/>
            </div>
            <h2 className="font-display text-3xl tracking-wider mb-1" style={{color:'#f0f0f5'}}>DIET PLAN</h2>
            <p style={{color:'#8888a0'}} className="text-sm leading-relaxed">31-day Indian vegetarian plan. Full recipes, ingredients, macros. ~130-140g protein/day.</p>
            <div className="mt-4 flex gap-2 flex-wrap">
              {['31 Days','Indian Veg','No Egg','Recipes','Shopping List'].map(t=>(
                <span key={t} className="text-xs px-2 py-1 rounded-full font-mono" style={{background:'rgba(52,199,89,0.12)',color:'#5EE87F'}}>{t}</span>
              ))}
            </div>
          </div>
        </Link>
      </div>
      <footer className="px-6 py-8 text-center">
        <p className="text-xs font-mono" style={{color:'#555570'}}>Age 35 · 73 kg · 5'10" · Goal: Lean Muscle & Abs</p>
      </footer>
    </main>
  );
}
