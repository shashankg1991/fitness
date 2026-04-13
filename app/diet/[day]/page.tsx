'use client';
import { use, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, ChevronDown, ChevronUp, Clock, Flame, Zap } from 'lucide-react';
import { DIET_PLAN } from '@/lib/dietData';

const THEME_COLORS: Record<string, string> = {
  'Moong': '#34C759', 'Oats': '#00C7BE', 'Paneer': '#FF9500',
  'Dosa': '#AF52DE', 'Chole': '#FF6B35', 'Poha': '#FFD60A', 'High': '#FF2D55',
};

function getColor(theme: string) {
  const key = Object.keys(THEME_COLORS).find(k => theme.startsWith(k));
  return THEME_COLORS[key || 'Moong'];
}

const MEAL_ICONS: Record<string, string> = {
  'Breakfast': '🌅', 'Snack': '🍎', 'Lunch': '🍛',
  'Pre-Workout': '⚡', 'Recovery': '💪', 'Dinner': '🌙',
};

function RecipeCard({ recipe, color }: { recipe: any; color: string }) {
  return (
    <div className="mt-3 rounded-xl overflow-hidden" style={{ background: '#0a0a0f', border: `1px solid ${color}30` }}>
      <div className="px-4 py-2 flex gap-4 text-xs font-mono" style={{ background: `${color}12` }}>
        <span style={{ color }}><Flame size={10} className="inline mr-1" />{recipe.calories} kcal</span>
        <span style={{ color }}><Zap size={10} className="inline mr-1" />{recipe.protein}g protein</span>
        <span style={{ color: '#8888a0' }}><Clock size={10} className="inline mr-1" />{recipe.prepTime}</span>
      </div>
      <div className="grid grid-cols-2 gap-0">
        <div className="p-3 border-r" style={{ borderColor: `${color}20` }}>
          <div className="text-xs font-mono mb-2" style={{ color: `${color}99` }}>INGREDIENTS</div>
          {recipe.ingredients.map((ing: string, i: number) => (
            <div key={i} className="flex items-start gap-1.5 mb-1">
              <div className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: color }} />
              <span className="text-xs leading-snug" style={{ color: '#c0c0d0' }}>{ing}</span>
            </div>
          ))}
        </div>
        <div className="p-3">
          <div className="text-xs font-mono mb-2" style={{ color: `${color}99` }}>METHOD</div>
          {recipe.steps.map((step: string, i: number) => (
            <div key={i} className="flex items-start gap-1.5 mb-2">
              <span className="text-xs font-mono shrink-0 mt-0.5" style={{ color }}>{i + 1}.</span>
              <span className="text-xs leading-snug" style={{ color: '#c0c0d0' }}>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MealCard({ meal, color, dayNum }: { meal: any; color: string; dayNum: number }) {
  const [open, setOpen] = useState(false);
  const [recipeOpen, setRecipeOpen] = useState(false);
  const icon = MEAL_ICONS[meal.label] || '🍽️';

  return (
    <div className="glass2 rounded-2xl overflow-hidden mb-3">
      <button className="w-full text-left p-4" onClick={() => setOpen(o => !o)}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
            style={{ background: `${color}15` }}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-mono" style={{ color }}>{meal.time}</span>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${color}15`, color }}>
                {meal.label}
              </span>
            </div>
            <div className="text-sm font-medium truncate" style={{ color: '#f0f0f5' }}>{meal.name}</div>
          </div>
          <div className="text-right shrink-0 ml-2">
            <div className="text-xs font-mono" style={{ color }}>{meal.proteinG}g</div>
            <div className="text-xs" style={{ color: '#8888a0' }}>{meal.calories} kcal</div>
          </div>
          <div className="ml-2 shrink-0">
            {open ? <ChevronUp size={16} style={{ color: '#8888a0' }} /> : <ChevronDown size={16} style={{ color: '#8888a0' }} />}
          </div>
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 fade-in">
          {/* Items */}
          <div className="mb-3">
            {meal.items.map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-2 mb-1.5">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: color }} />
                <span className="text-sm" style={{ color: '#c0c0d0' }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Recipe toggle */}
          {meal.recipe && (
            <>
              <button
                onClick={() => setRecipeOpen(o => !o)}
                className="text-xs font-mono flex items-center gap-2 py-2 px-3 rounded-lg w-full"
                style={{ background: `${color}12`, color }}
              >
                {recipeOpen ? '▲' : '▼'} {recipeOpen ? 'HIDE RECIPE' : 'SHOW FULL RECIPE'}
              </button>
              {recipeOpen && <RecipeCard recipe={meal.recipe} color={color} />}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function DietDayPage({ params }: { params: Promise<{ day: string }> }) {
  const { day } = use(params);
  const dayNum = parseInt(day);
  const dayDiet = DIET_PLAN.find(d => d.day === dayNum);
  const [tab, setTab] = useState<'meals' | 'shopping'>('meals');

  if (!dayDiet) return <div className="p-6" style={{ color: '#f0f0f5' }}>Day not found</div>;

  const color = getColor(dayDiet.theme);
  const prevDay = dayNum > 1 ? dayNum - 1 : null;
  const nextDay = dayNum < 31 ? dayNum + 1 : null;

  return (
    <main className="min-h-screen" style={{ background: '#0a0a0f' }}>
      {/* Header */}
      <div className="relative px-5 pt-10 pb-6" style={{
        background: `linear-gradient(135deg, ${color}14 0%, transparent 70%)`
      }}>
        <div className="flex items-center gap-3 mb-5">
          <Link href="/diet" className="w-8 h-8 glass rounded-lg flex items-center justify-center">
            <ArrowLeft size={15} style={{ color: '#f0f0f5' }} />
          </Link>
          <div className="flex-1" />
          {/* Day nav */}
          <div className="flex items-center gap-2">
            {prevDay ? (
              <Link href={`/diet/${prevDay}`} className="text-xs font-mono px-2 py-1 glass rounded-lg" style={{ color: '#8888a0' }}>← {prevDay}</Link>
            ) : <div className="w-12" />}
            <div className="font-display text-sm px-3 py-1 rounded-lg" style={{ background: `${color}22`, color }}>
              DAY {dayNum}
            </div>
            {nextDay ? (
              <Link href={`/diet/${nextDay}`} className="text-xs font-mono px-2 py-1 glass rounded-lg" style={{ color: '#8888a0' }}>{nextDay} →</Link>
            ) : <div className="w-12" />}
          </div>
        </div>

        <div className="font-display text-4xl tracking-wider mb-1" style={{ color }}>{dayDiet.theme.toUpperCase()}</div>
        <div className="text-sm" style={{ color: '#8888a0' }}>Day {dayNum} of 31</div>

        {/* Macro pills */}
        <div className="flex gap-2 flex-wrap mt-4">
          {[
            { label: 'Protein', val: `${dayDiet.totalProtein}g`, c: '#FF6B35' },
            { label: 'Calories', val: `${dayDiet.totalCalories}`, c: color },
            { label: 'Meals', val: `${dayDiet.meals.length}`, c: '#8888a0' },
          ].map(m => (
            <div key={m.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ background: `${m.c}15`, border: `1px solid ${m.c}30` }}>
              <span className="font-display text-base" style={{ color: m.c }}>{m.val}</span>
              <span className="text-xs" style={{ color: '#8888a0' }}>{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 mb-4">
        <div className="flex glass rounded-xl p-1 gap-1">
          {(['meals', 'shopping'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="flex-1 py-2.5 rounded-lg text-sm font-mono transition-all"
              style={{
                background: tab === t ? color : 'transparent',
                color: tab === t ? '#fff' : '#8888a0',
              }}>
              {t === 'meals' ? '🍛 Meals' : '🛒 Shopping'}
            </button>
          ))}
        </div>
      </div>

      {/* Meals tab */}
      {tab === 'meals' && (
        <div className="px-5">
          {/* Meal summary strip */}
          <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
            {dayDiet.meals.map((m, i) => (
              <div key={i} className="shrink-0 px-3 py-2 rounded-xl text-center"
                style={{ background: `${color}12`, border: `1px solid ${color}25`, minWidth: 70 }}>
                <div className="text-base mb-0.5">{MEAL_ICONS[m.label] || '🍽️'}</div>
                <div className="text-xs font-mono" style={{ color }}>{m.proteinG}g</div>
                <div className="text-xs" style={{ color: '#555570' }}>{m.label.split('-')[0]}</div>
              </div>
            ))}
          </div>

          {/* Tip */}
          <div className="glass rounded-xl px-4 py-3 mb-4 flex items-start gap-2">
            <div className="text-base shrink-0">💡</div>
            <div className="text-xs leading-relaxed" style={{ color: '#c0c0d0' }}>
              <strong style={{ color }}>Rule:</strong> Eat biggest carb meals at breakfast & lunch. Dinner is your lightest meal — always.
            </div>
          </div>

          {/* Meal cards */}
          {dayDiet.meals.map((meal, i) => (
            <MealCard key={i} meal={meal} color={color} dayNum={dayNum} />
          ))}
          <div className="pb-10" />
        </div>
      )}

      {/* Shopping tab */}
      {tab === 'shopping' && (
        <div className="px-5">
          <div className="glass2 rounded-2xl p-5 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingCart size={16} style={{ color }} />
              <span className="font-mono text-sm" style={{ color }}>DAY {dayNum} SHOPPING LIST</span>
            </div>
            <div className="grid grid-cols-1 gap-1">
              {dayDiet.shopping.map((item, i) => (
                <ShoppingItem key={i} item={item} color={color} />
              ))}
            </div>
          </div>

          {/* Pantry staples note */}
          <div className="glass rounded-xl p-4 mb-6">
            <div className="text-xs font-mono mb-3" style={{ color: '#8888a0' }}>PANTRY STAPLES (keep stocked always)</div>
            {[
              'Cumin seeds, mustard seeds, turmeric',
              'Red chilli powder, coriander powder, garam masala',
              'Ginger, garlic, green chilli',
              'Whole wheat flour, brown rice',
              'Ghee, cold-pressed oil',
              'Curry leaves, dried red chilli',
              'Salt, black pepper, chaat masala',
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 mb-1.5">
                <div className="w-1 h-1 rounded-full shrink-0" style={{ background: '#555570' }} />
                <span className="text-xs" style={{ color: '#8888a0' }}>{s}</span>
              </div>
            ))}
          </div>

          <div className="pb-10" />
        </div>
      )}
    </main>
  );
}

function ShoppingItem({ item, color }: { item: string; color: string }) {
  const [checked, setChecked] = useState(false);
  return (
    <button
      onClick={() => setChecked(c => !c)}
      className="flex items-center gap-3 py-2.5 px-3 rounded-xl w-full text-left transition-all"
      style={{ background: checked ? `${color}12` : 'transparent' }}
    >
      <div className="w-4 h-4 rounded flex items-center justify-center shrink-0 transition-all"
        style={{
          background: checked ? color : 'transparent',
          border: `1.5px solid ${checked ? color : '#444'}`,
        }}>
        {checked && <span style={{ color: '#fff', fontSize: 10 }}>✓</span>}
      </div>
      <span className="text-sm" style={{ color: checked ? '#555570' : '#c0c0d0', textDecoration: checked ? 'line-through' : 'none' }}>
        {item}
      </span>
    </button>
  );
}
