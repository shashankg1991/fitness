'use client';
import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Clock, Repeat } from 'lucide-react';
import { BRO_SPLIT, PPL_SPLIT } from '@/lib/workoutData';

export default function DayPage({ params }: { params: Promise<{ mode: string; day: string }> }) {
  const { mode, day } = use(params);
  const split = mode === 'ppl' ? PPL_SPLIT : BRO_SPLIT;
  const dayData = split.find(d => d.day === parseInt(day));

  if (!dayData) return <div className="p-6 text-white">Day not found</div>;

  const sectionColors: Record<string, string> = {
    warmup: '#F5C842', main: dayData.color, abs: '#00C7BE', cooldown: '#64B4FF', backpain: '#8E8EFF'
  };

  const sectionDurations: Record<string, string> = {
    warmup: '5 min', main: '25–35 min', abs: '15 min', cooldown: '8 min', backpain: '10 min'
  };

  return (
    <main className="min-h-screen" style={{background:'#0a0a0f'}}>
      {/* Header */}
      <div className="relative px-6 pt-10 pb-8" style={{
        background:`linear-gradient(135deg, ${dayData.color}18 0%, transparent 60%)`
      }}>
        <div className="flex items-center gap-4 mb-6">
          <Link href="/workout" className="w-8 h-8 glass rounded-lg flex items-center justify-center">
            <ArrowLeft size={16} style={{color:'#f0f0f5'}}/>
          </Link>
          <div className="text-xs font-mono" style={{color:'#8888a0'}}>
            {mode.toUpperCase()} SPLIT · DAY {day}
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="font-display text-5xl tracking-wider mb-1" style={{color: dayData.color}}>
              {dayData.muscle.toUpperCase()}
            </div>
            <div className="text-sm" style={{color:'#8888a0'}}>
              {dayData.sections.find(s=>s.id==='main')?.exercises.length} main exercises · abs · cooldown · back relief
            </div>
          </div>
          <div className="font-display text-lg tracking-widest glass px-4 py-2 rounded-xl" style={{color: dayData.color}}>
            {dayData.badge}
          </div>
        </div>
      </div>

      {/* Total time estimate */}
      <div className="mx-6 mb-6 glass rounded-xl p-4 flex items-center gap-3">
        <Clock size={16} style={{color:'#8888a0'}}/>
        <div className="text-sm" style={{color:'#f0f0f5'}}>
          Estimated total: <span style={{color: dayData.color}} className="font-mono">55–70 min</span>
        </div>
        <div className="ml-auto text-xs font-mono" style={{color:'#8888a0'}}>all sections</div>
      </div>

      {/* Sections */}
      <div className="px-6">
        <div className="text-xs font-mono mb-4" style={{color:'#8888a0'}}>SELECT A SECTION</div>
        <div className="flex flex-col gap-3">
          {dayData.sections.map((section, idx) => {
            const color = sectionColors[section.id] || dayData.color;
            return (
              <Link key={section.id} href={`/workout/${mode}/${day}/section/${section.id}`}>
                <div className="glass2 rounded-2xl p-5 section-card flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-2xl"
                    style={{background:`${color}18`}}>
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-display text-xl tracking-wider" style={{color: '#f0f0f5'}}>
                      {section.title}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs font-mono" style={{color}}>
                        {sectionDurations[section.id] || '–'}
                      </span>
                      <span className="text-xs" style={{color:'#8888a0'}}>·</span>
                      <span className="text-xs" style={{color:'#8888a0'}}>
                        {section.exercises.length} exercise{section.exercises.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="text-xs font-mono" style={{color:'#555570'}}>
                      Step {idx + 1}
                    </div>
                    <ChevronRight size={16} style={{color}}/>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Start All button */}
        <Link href={`/workout/${mode}/${day}/section/${dayData.sections[0].id}`}>
          <div className="mt-6 rounded-2xl p-4 text-center font-display text-xl tracking-wider cursor-pointer"
            style={{background: dayData.color, color:'#fff'}}>
            START WORKOUT
          </div>
        </Link>
        <div className="pb-10"/>
      </div>
    </main>
  );
}
