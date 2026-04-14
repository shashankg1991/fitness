const API_KEY = 'dc6zaTOxFJmzC';

const Q: Record<string, string> = {
  'bench press': 'dumbbell bench press workout',
  'incline press': 'incline dumbbell press chest exercise',
  'chest fly': 'dumbbell chest fly pec exercise',
  'decline press': 'decline chest press dumbbell exercise',
  'pull-ups': 'pull ups back exercise gym',
  'pullups': 'pull ups back exercise gym',
  'chin-ups': 'chin ups exercise bicep',
  'bent-over row': 'dumbbell bent over row back exercise',
  'single-arm row': 'single arm dumbbell row exercise',
  'reverse fly': 'reverse fly rear delt exercise',
  'overhead press': 'dumbbell overhead press shoulder',
  'lateral raise': 'lateral raise shoulder exercise',
  'front raise': 'front raise shoulder dumbbell',
  'arnold press': 'arnold press shoulder exercise',
  'goblet squat': 'goblet squat exercise legs',
  'romanian deadlift': 'romanian deadlift rdl exercise',
  'walking lunge': 'walking lunges dumbbell legs',
  'calf raise': 'calf raise exercise gym',
  'bulgarian split squat': 'bulgarian split squat legs exercise',
  'bicep curl': 'dumbbell bicep curl exercise',
  'hammer curl': 'hammer curl exercise bicep',
  'concentration curl': 'concentration curl bicep exercise',
  'incline curl': 'incline dumbbell curl bicep',
  'zottman curl': 'zottman curl exercise bicep',
  'overhead tricep': 'overhead tricep extension dumbbell',
  'tricep kickback': 'tricep kickback exercise dumbbell',
  'close-grip press': 'close grip press tricep exercise',
  'skull crusher': 'skull crusher tricep exercise',
  'wrist curl': 'wrist curl forearm exercise',
  'wrist extension': 'wrist extension forearm exercise',
  "farmer": 'farmers walk grip exercise',
  'wood chop': 'wood chop exercise core rotation',
  'side bend': 'dumbbell side bend oblique exercise',
  'russian twist': 'russian twist core exercise',
  'windmill': 'windmill exercise kettlebell core',
  'halo': 'halo exercise kettlebell core',
  'overhead crunch': 'standing oblique crunch exercise',
  'arm circles': 'arm circles warmup stretch',
  'shoulder rolls': 'shoulder rolls warmup exercise',
  'hip circles': 'hip mobility circles exercise',
  'leg swings': 'leg swings dynamic stretch warmup',
  'bodyweight squat': 'bodyweight squat exercise form',
  "child's pose": 'childs pose yoga stretch',
  'chest stretch': 'chest stretch pec stretch',
  'hamstring stretch': 'hamstring stretch exercise',
  'hip flexor': 'hip flexor stretch exercise',
  'cat-cow': 'cat cow yoga spine stretch',
  'knee to chest': 'knee to chest stretch lower back',
  'pelvic tilt': 'pelvic tilt core exercise',
  'bird dog': 'bird dog exercise core stability',
  'piriformis': 'piriformis stretch glute exercise',
  'easy walk': 'walking exercise fitness',
};

export function gifQuery(name: string): string {
  const l = name.toLowerCase();
  for (const [k, v] of Object.entries(Q)) {
    if (l.includes(k)) return v;
  }
  return `${name} exercise workout`;
}

export async function fetchGifUrl(query: string): Promise<string | null> {
  try {
    const r = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(query)}&limit=5&rating=pg&lang=en`
    );
    const d = await r.json();
    if (d.data?.length > 0) {
      // Pick the one with most relevant title
      const gif = d.data[0];
      return gif.images?.fixed_height?.url ?? gif.images?.original?.url ?? null;
    }
    return null;
  } catch {
    return null;
  }
}
