// Giphy API - client-side only, public beta key
const KEY = 'dc6zaTOxFJmzC';

// Exercise → best search query mapping
const QUERIES: [string[], string][] = [
  // CHEST
  [['bench press flat','db bench press','dumbbell bench press'], 'dumbbell bench press exercise'],
  [['incline press','incline bench'],                            'incline dumbbell press chest'],
  [['chest fly','dumbbell fly'],                                 'dumbbell chest fly pec workout'],
  [['decline press'],                                            'decline dumbbell press chest workout'],
  [['close-grip press','close grip'],                            'close grip dumbbell press tricep'],
  // BACK
  [['pull-up','pullup','pull up'],                               'pull up exercise back workout'],
  [['chin-up','chinup','chin up'],                               'chin up exercise bicep back'],
  [['bent-over row','bent over row'],                            'dumbbell bent over row back workout'],
  [['single-arm row','single arm row','one arm row'],            'one arm dumbbell row back exercise'],
  [['reverse fly'],                                              'dumbbell reverse fly rear delt'],
  // SHOULDERS
  [['overhead press','shoulder press'],                          'dumbbell overhead shoulder press'],
  [['lateral raise'],                                            'dumbbell lateral raise shoulder'],
  [['front raise'],                                              'dumbbell front raise shoulder workout'],
  [['arnold press'],                                             'arnold press dumbbell shoulder'],
  // LEGS
  [['goblet squat'],                                             'goblet squat dumbbell legs workout'],
  [['romanian deadlift','rdl'],                                  'romanian deadlift dumbbell hamstring'],
  [['walking lunge','dumbbell lunge'],                           'dumbbell walking lunge legs workout'],
  [['calf raise','calf'],                                        'calf raise standing exercise legs'],
  [['split squat','bulgarian'],                                  'bulgarian split squat dumbbell legs'],
  // BICEPS
  [['bicep curl','biceps curl','dumbbell curl','standing curl'], 'dumbbell bicep curl workout'],
  [['hammer curl'],                                              'hammer curl dumbbell bicep workout'],
  [['concentration curl'],                                       'concentration curl dumbbell bicep'],
  [['incline curl'],                                             'incline dumbbell curl bicep workout'],
  [['zottman curl'],                                             'zottman curl dumbbell exercise'],
  // TRICEPS
  [['overhead tricep','overhead extension'],                     'overhead tricep extension dumbbell'],
  [['tricep kickback','kickback'],                               'tricep kickback dumbbell workout'],
  [['skull crusher'],                                            'skull crusher dumbbell tricep'],
  // FOREARMS
  [['wrist curl'],                                               'wrist curl forearm dumbbell exercise'],
  [['wrist extension'],                                          'wrist extension forearm exercise'],
  [['reverse curl'],                                             'reverse curl dumbbell forearm'],
  [["farmer's carry","farmers carry","farmers walk"],            'farmers walk grip strength exercise'],
  // ABS
  [['wood chop'],                                                'wood chop exercise core rotation'],
  [['side bend'],                                                'side bend dumbbell oblique workout'],
  [['russian twist'],                                            'russian twist core ab workout'],
  [['windmill'],                                                 'dumbbell windmill core exercise'],
  [['halo'],                                                     'kettlebell halo core shoulder exercise'],
  [['overhead crunch','standing crunch'],                        'standing oblique crunch exercise'],
  [['leg raise','knee raise'],                                   'hanging leg raise abs workout'],
  [['plank'],                                                    'plank core exercise abs'],
  [['bicycle crunch'],                                           'bicycle crunch ab workout'],
  [['mountain climber'],                                         'mountain climbers core exercise'],
  [['dead bug'],                                                 'dead bug exercise core stability'],
  [['hollow hold','hollow body'],                                'hollow body hold exercise'],
  [['v-sit','v sit'],                                            'v sit exercise abs core'],
  // WARMUP
  [['arm circle'],                                               'arm circles warmup stretch exercise'],
  [['shoulder roll'],                                            'shoulder rolls warmup mobility'],
  [['hip circle','hip rotation'],                                'hip circles mobility warmup'],
  [['leg swing'],                                                'leg swings dynamic stretch warmup'],
  [['bodyweight squat','air squat'],                             'bodyweight squat form exercise'],
  [['cat-cow','cat cow'],                                        'cat cow yoga spine stretch'],
  [['doorway stretch','chest open'],                             'chest stretch doorway warmup'],
  [['thread the needle'],                                        'thread the needle stretch spine'],
  [['hip flexor stretch','pigeon'],                              'hip flexor stretch mobility'],
  [['wrist circle'],                                             'wrist circles warmup forearm'],
  [['ankle circle'],                                             'ankle circles warmup mobility'],
  [['glute bridge'],                                             'glute bridge warmup activation'],
  [['band pull apart','shoulder dislocate'],                     'band pull apart shoulder warmup'],
  [['thoracic rotation','t-spine'],                              'thoracic spine rotation stretch'],
  [['inchworm'],                                                 'inchworm exercise warmup'],
  [['world greatest stretch','world greatest'],                  'world greatest stretch mobility'],
  // COOLDOWN / STRETCHES
  [["child's pose",'childs pose'],                               'childs pose yoga back stretch'],
  [['chest stretch'],                                            'chest stretch wall pec stretch'],
  [['hamstring stretch'],                                        'hamstring stretch floor exercise'],
  [['hip flexor'],                                               'hip flexor stretch lunge position'],
  [['quad stretch'],                                             'quad stretch standing leg workout'],
  [['piriformis'],                                               'piriformis stretch glute exercise'],
  [['figure four','pigeon'],                                     'pigeon pose hip opener stretch'],
  [['cobra stretch','upward dog'],                               'cobra pose yoga back stretch'],
  [['seated twist'],                                             'seated spinal twist stretch yoga'],
  // BACK PAIN
  [['knee to chest'],                                            'knee to chest stretch lower back'],
  [['pelvic tilt'],                                              'pelvic tilt exercise lower back'],
  [['bird dog'],                                                 'bird dog exercise core stability'],
  [['bridge'],                                                   'glute bridge exercise lower back'],
  [['superman'],                                                 'superman exercise back strength'],
  // MISC
  [['easy walk','walking','active recovery'],                    'walking exercise fitness cardio'],
];

export function gifQuery(exerciseName: string): string {
  const n = exerciseName.toLowerCase().trim();
  for (const [keys, q] of QUERIES) {
    for (const k of keys) if (n.includes(k)) return q;
  }
  return `${exerciseName} exercise workout fitness`;
}

export async function fetchGifUrl(exerciseName: string): Promise<string | null> {
  const q = gifQuery(exerciseName);
  try {
    const res = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${KEY}&q=${encodeURIComponent(q)}&limit=8&rating=pg&lang=en`,
      { cache: 'force-cache' }
    );
    const data = await res.json();
    if (!data.data?.length) return null;
    // Pick a deterministic result based on exercise name (not always the first)
    const idx = exerciseName.length % Math.min(data.data.length, 5);
    const gif = data.data[idx];
    return gif?.images?.fixed_height?.url ?? gif?.images?.original?.url ?? null;
  } catch { return null; }
}
