# FitCore — Workout & Diet App

A complete fitness app built with Next.js 16 + TypeScript + Tailwind CSS.

## Features

### 🏋️ Workout
- **Bro Split**: Chest · Back · Shoulders · Legs · Biceps · Triceps · Forearms
- **Push/Pull/Legs**: PPL × 2 + Active Rest
- Every day includes:
  - 5-min pre-workout warmup
  - Main exercises (4 per day) with full HOW-TO and common mistakes
  - 15-min standing abs circuit (6 movements)
  - Post-workout cooldown (5 stretches)
  - Back pain relief routine (5 exercises)
- **Exercise Timer** with Web Audio API beeps and countdown sounds
- **Rest Timer** overlay between sets
- Set tracking with progress dots
- Exercise navigator (swipe between exercises)
- Generated form guide images for every muscle group

### 🥗 Diet
- 31-day Indian vegetarian plan (no egg)
- 6 meals per day: Breakfast · Snack · Lunch · Pre-workout · Recovery · Dinner
- Full recipes with ingredients + step-by-step method
- Protein + calorie tracking per meal
- **Interactive shopping list** with tap-to-check items
- ~130–140g protein/day, ~2,050–2,100 kcal
- 7 rotating day themes cycling through the month

## Tech Stack
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (lucide-react icons)
- Web Audio API (timer sounds, no external deps)
- PIL-generated exercise images

## Deploy to Vercel

```bash
# 1. Push to GitHub
git init && git add . && git commit -m "initial"
git remote add origin https://github.com/YOUR_USERNAME/fitcore.git
git push -u origin main

# 2. Go to vercel.com → New Project → Import from GitHub
# 3. Framework: Next.js (auto-detected)
# 4. Click Deploy
```

## Run Locally
```bash
npm install
npm run dev
# Visit http://localhost:3000
```

## Profile
- Age: 35 · Weight: 73 kg · Height: 5'10"
- Goal: Lean body with defined muscles and abs
- Equipment: 5–45 lb dumbbells, bench, pull-up bar
- Diet: Indian vegetarian, no egg
