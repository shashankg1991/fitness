const BASE = 'http://d205bpvrqc9yn1.cloudfront.net';
const gif = (id: string) => `${BASE}/${id}.gif`;

const MAP: Array<[string[], string]> = [
  // CHEST
  [['bench press flat','db bench press','dumbbell bench press'],'0289'],
  [['incline press','incline bench press'],'0314'],
  [['incline fly'],'0319'],
  [['chest fly','dumbbell fly'],'0308'],
  [['decline press','decline bench'],'0301'],
  [['close-grip press','close grip press','dumbbell close grip'],'1731'],
  // BACK
  [['wide grip pull-up','pull-up','pull up','pullup'],'1429'],
  [['chin-up','chin up','chinup'],'1326'],
  [['bent-over row','bent over row','dumbbell row'],'0293'],
  [['single-arm row','single arm row','one arm row','one arm bent'],'0292'],
  [['reverse fly'],'0383'],
  // SHOULDERS
  [['overhead press','standing overhead press','shoulder press'],'0426'],
  [['lateral raise'],'0334'],
  [['front raise'],'0310'],
  [['arnold press'],'2137'],
  // LEGS
  [['goblet squat'],'1760'],
  [['romanian deadlift','rdl'],'1459'],
  [['walking lunge'],'1460'],
  [['dumbbell lunge','db lunge'],'0336'],
  [['calf raise','calf'],'0417'],
  [['split squat','bulgarian'],'0809'],
  // BICEPS
  [['standing bicep curl','bicep curl','biceps curl','dumbbell curl'],'0294'],
  [['hammer curl'],'0313'],
  [['concentration curl'],'0297'],
  [['incline curl','incline biceps curl'],'0315'],
  [['zottman curl'],'0439'],
  // TRICEPS
  [['overhead tricep','overhead extension','tricep extension'],'0385'],
  [['tricep kickback','kickback'],'0333'],
  [['skull crusher'],'0376'],
  // FOREARMS
  [['wrist curl'],'1415'],
  [['wrist extension','reverse wrist'],'0358'],
  [['reverse curl'],'0429'],
  [["farmer's carry",'farmers carry','farmers walk'],'2133'],
  // ABS
  [['wood chop'],'0222'],
  [['side bend'],'0002'],
  [['russian twist'],'0846'],
  [['windmill'],'3204'],
  [['halo'],'0003'],
  [['overhead crunch'],'0006'],
  // WARMUP
  [['arm circle'],'1368'],
  [['shoulder roll'],'1366'],
  [['hip circle'],'3213'],
  [['leg swing'],'1604'],
  [['bodyweight squat','air squat'],'0809'],
  // COOLDOWN
  [["child's pose",'childs pose','child pose'],'1366'],
  [['chest stretch'],'1405'],
  [['hamstring stretch'],'1511'],
  [['hip flexor'],'1564'],
  [['cat-cow','cat cow'],'1314'],
  // BACK PAIN
  [['knee to chest'],'1709'],
  [['pelvic tilt'],'3147'],
  [['bird dog'],'1314'],
  [['piriformis'],'2567'],
  // CARDIO
  [['easy walk','walking','active recovery'],'1460'],
];

export function getExerciseGifUrl(exerciseName: string): string | null {
  const n = exerciseName.toLowerCase().trim();
  for (const [keywords, id] of MAP) {
    for (const kw of keywords) {
      if (n.includes(kw)) return gif(id);
    }
  }
  return null;
}

export async function fetchGiphyFallback(exerciseName: string): Promise<string | null> {
  try {
    const q = `${exerciseName} exercise workout`;
    const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=${encodeURIComponent(q)}&limit=5&rating=pg`);
    const data = await res.json();
    return data.data?.[0]?.images?.fixed_height?.url ?? null;
  } catch { return null; }
}
