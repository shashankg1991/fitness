'use client';
import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BRO_SPLIT, PPL_SPLIT } from '@/lib/workoutData';

const SEC_META: Record<string,{icon:string;color:string;dur:string}> = {
  warmup:   { icon:'🌅', color:'#ffd60a', dur:'5 min' },
  main:     { icon:'🏋️', color:'',        dur:'25–35 min' },
  abs:      { icon:'🎯', color:'#5ac8fa', dur:'15 min' },
  cooldown: { icon:'🌊', color:'#4eb8ff', dur:'8 min' },
  backpain: { icon:'🔄', color:'#bf5af2', dur:'10 min' },
};

export default function DayPage({ params }: { params: Promise<{mode:string;day:string}> }) {
  const { mode, day } = use(params);
  const split = mode==='ppl' ? PPL_SPLIT : BRO_SPLIT;
  const d = split.find(x=>x.day===parseInt(day));
  if (!d) return <div style={{color:'#fff',padding:28}}>Not found</div>;

  return (
    <main style={{ minHeight:'100vh', background:'#09090f', paddingBottom:48 }}>
      {/* Hero */}
      <div style={{ padding:'48px 24px 32px', background:`linear-gradient(180deg, ${d.color}14 0%, transparent 100%)` }}>
        <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:28 }}>
          <Link href="/workout" style={{ width:36,height:36,borderRadius:18,background:'rgba(255,255,255,0.06)',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none' }}>
            <ArrowLeft size={16} color="rgba(255,255,255,0.7)"/>
          </Link>
          <span className="mono" style={{ fontSize:11, color:'rgba(255,255,255,0.35)', letterSpacing:2 }}>{mode.toUpperCase()} · DAY {day}</span>
        </div>
        <h1 className="syne" style={{ fontSize:48, fontWeight:800, color:d.color, marginBottom:8 }}>{d.muscle}</h1>
        <p style={{ fontSize:14, color:'rgba(255,255,255,0.4)' }}>
          {d.sections.find(s=>s.id==='main')?.exercises.length} exercises · 55–70 min total
        </p>
      </div>

      {/* Sections list */}
      <div style={{ padding:'0 24px' }}>
        <p className="mono" style={{ fontSize:10, letterSpacing:3, color:'rgba(255,255,255,0.25)', marginBottom:16 }}>SECTIONS — TAP TO START</p>

        <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:24 }}>
          {d.sections.map((sec,i)=>{
            const meta = SEC_META[sec.id] || SEC_META.main;
            const c = sec.id==='main' ? d.color : meta.color;
            return (
              <Link key={sec.id} href={`/workout/${mode}/${day}/section/${sec.id}`} style={{ textDecoration:'none' }}>
                <div style={{ display:'flex', alignItems:'center', gap:16, padding:'18px 20px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:20 }}>
                  <div style={{ width:46, height:46, borderRadius:15, background:`${c}18`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>
                    {meta.icon}
                  </div>
                  <div style={{ flex:1 }}>
                    <h3 className="syne" style={{ fontSize:16, fontWeight:700, color:'#fff', marginBottom:3 }}>{sec.title}</h3>
                    <div style={{ display:'flex', gap:8 }}>
                      <span className="mono" style={{ fontSize:11, color:c }}>{meta.dur}</span>
                      <span className="mono" style={{ fontSize:11, color:'rgba(255,255,255,0.25)' }}>{sec.exercises.length} exercises</span>
                    </div>
                  </div>
                  <div style={{ width:28,height:28,borderRadius:14,background:`${c}18`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                    <span style={{ color:c, fontSize:16 }}>›</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Start all CTA */}
        <Link href={`/workout/${mode}/${day}/section/${d.sections[0].id}`} style={{ textDecoration:'none', display:'block' }}>
          <div style={{ padding:'18px 0', borderRadius:100, background:d.color, textAlign:'center' }}>
            <span className="syne" style={{ fontSize:18, fontWeight:800, color:'#fff', letterSpacing:1 }}>Start Workout</span>
          </div>
        </Link>
      </div>
    </main>
  );
}
