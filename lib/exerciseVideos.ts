// YouTube video IDs for exercise demonstrations
// Format: YouTube embed URL = https://www.youtube.com/embed/{VIDEO_ID}
// Sourced from: Athlean-X, Jeff Nippard, ScottHermanFitness, Renaissance Periodization

const VIDEOS: Array<[string[], string, string]> = [
  // [keywords[], videoId, channelHint]

  // ── CHEST ──────────────────────────────────────────────────────────────────
  [['bench press flat','db bench press','dumbbell bench press'],     'XWD1bj-3rHQ', 'Dumbbell Bench Press'],
  [['incline press','incline bench press'],                          'DbFgADa2PL8', 'Incline Dumbbell Press'],
  [['chest fly','dumbbell fly'],                                     'eozdVDA78K0', 'Dumbbell Chest Fly'],
  [['decline press','decline bench'],                                'LfyQThu6E4I', 'Decline Dumbbell Press'],
  [['close-grip press','close grip press'],                          'nEF0bv2FW7s', 'Close Grip Press'],

  // ── BACK ───────────────────────────────────────────────────────────────────
  [['pull-up','pullup','pull up','wide grip pull'],                  'eGo4IYlbE5g', 'Pull Ups'],
  [['chin-up','chinup','chin up'],                                   'cRuzKFG5jQc', 'Chin Ups'],
  [['bent-over row','bent over row','dumbbell row'],                 'FWJR5Ve8bnQ', 'Bent Over Row'],
  [['single-arm row','single arm row','one arm row'],                'pYcpY20QaE8', 'Single Arm Row'],
  [['reverse fly'],                                                  'lPt0GqwaqEw', 'Reverse Fly'],

  // ── SHOULDERS ──────────────────────────────────────────────────────────────
  [['overhead press','shoulder press','dumbbell press'],             'qEwKCR5JCog', 'Dumbbell Shoulder Press'],
  [['lateral raise'],                                                '3VcKaXpzqRo', 'Lateral Raise'],
  [['front raise'],                                                  'sOoBhDmBNfc', 'Front Raise'],
  [['arnold press'],                                                 'iSGqfOF4gxo', 'Arnold Press'],

  // ── LEGS ───────────────────────────────────────────────────────────────────
  [['goblet squat'],                                                 'MxsFDh5Wv-o', 'Goblet Squat'],
  [['romanian deadlift','rdl','stiff leg'],                          'JCXUYuzwNrM', 'Romanian Deadlift'],
  [['walking lunge','dumbbell lunge'],                               'L8fvypPrzzs', 'Walking Lunges'],
  [['calf raise','calf'],                                            'gwLzBJYoWlQ', 'Calf Raise'],
  [['split squat','bulgarian'],                                      '2C-uNgKwPLE', 'Bulgarian Split Squat'],

  // ── BICEPS ─────────────────────────────────────────────────────────────────
  [['standing bicep curl','bicep curl','biceps curl','dumbbell curl'], 'ykJmrZ5v0Oo', 'Dumbbell Curl'],
  [['hammer curl'],                                                  'TwD-YGVP4Bk', 'Hammer Curl'],
  [['concentration curl'],                                           'Jvj2wV0vOYU', 'Concentration Curl'],
  [['incline curl','incline biceps curl'],                           'soxrZlIl35U', 'Incline Curl'],
  [['zottman curl'],                                                 'ZrFZFGkYFpg', 'Zottman Curl'],

  // ── TRICEPS ────────────────────────────────────────────────────────────────
  [['overhead tricep','overhead extension','tricep extension'],       'YbX7Wd8jQ-Q', 'Overhead Tricep Extension'],
  [['tricep kickback','kickback'],                                   '6SS6K3lAwZ8', 'Tricep Kickback'],
  [['skull crusher'],                                                'NIEjEydyRB8', 'Skull Crushers'],
  [['close-grip bench','close grip bench'],                          'nEF0bv2FW7s', 'Close Grip Press'],

  // ── FOREARMS ───────────────────────────────────────────────────────────────
  [['wrist curl'],                                                   'v7O7I5_lX5E', 'Wrist Curl'],
  [['wrist extension'],                                              'v7O7I5_lX5E', 'Wrist Extension'],
  [['reverse curl'],                                                 'nkNExzfaYX0', 'Reverse Curl'],
  [["farmer's carry","farmers carry","farmers walk"],                'rt6MmSaRXOI', "Farmer's Carry"],

  // ── ABS ────────────────────────────────────────────────────────────────────
  [['wood chop'],                                                    'G_1QsyA7oGQ', 'Wood Chop'],
  [['side bend'],                                                    'Cx7KCxJkYFI', 'Side Bend'],
  [['russian twist'],                                                'JyUqwkVpsi8', 'Russian Twist'],
  [['windmill'],                                                     'YZBEkqP85xo', 'Windmill'],
  [['halo'],                                                         'JnFJGRy7gHA', 'Halo Exercise'],
  [['overhead crunch','standing crunch'],                            'Cx7KCxJkYFI', 'Overhead Crunch'],
  [['high knee march','high knee'],                                  'ZZZoCNMU48U', 'High Knees'],
  [['suitcase carry','suitcase hold'],                               'rt6MmSaRXOI', 'Suitcase Carry'],
  [['press out','press-out'],                                        '3VcKaXpzqRo', 'Press Out'],

  // ── WARMUP ─────────────────────────────────────────────────────────────────
  [['arm circle'],                                                   'nVFNQQaGAW8', 'Arm Circles'],
  [['shoulder roll'],                                                'nVFNQQaGAW8', 'Shoulder Rolls'],
  [['hip circle','hip rotation'],                                    'AHkpUlWJyOw', 'Hip Circles'],
  [['leg swing'],                                                    'SzRToiN7vOY', 'Leg Swings'],
  [['bodyweight squat','air squat'],                                 'aclHkVaku9U', 'Bodyweight Squat'],
  [['inchworm'],                                                     'jLJGMC56Bmo', 'Inchworm'],
  [['glute bridge'],                                                 '8bbE64NuDTU', 'Glute Bridge'],
  [['cat-cow','cat cow'],                                            'kqnua4rHVVA', 'Cat Cow'],
  [['thread the needle'],                                            '49k1bF83mj0', 'Thread the Needle'],
  [['dead hang','active hang'],                                      'cRuzKFG5jQc', 'Dead Hang'],
  [['world greatest stretch','world greatest'],                      'SzRToiN7vOY', 'World Greatest Stretch'],
  [['shoulder dislocate'],                                           'nVFNQQaGAW8', 'Shoulder Dislocate'],
  [['thoracic rotation','t-spine rotation'],                         '49k1bF83mj0', 'Thoracic Rotation'],
  [['band pull apart','pull apart'],                                 'nVFNQQaGAW8', 'Band Pull Apart'],
  [['grip squeeze','finger extension'],                              'v7O7I5_lX5E', 'Grip Exercise'],
  [['wrist circle'],                                                 'v7O7I5_lX5E', 'Wrist Circles'],
  [['overhead tricep stretch'],                                      'YbX7Wd8jQ-Q', 'Tricep Stretch'],
  [['push-up slow','slow push-up','push-up'],                       'IODxDxX7oi4', 'Push Ups'],

  // ── COOLDOWN ───────────────────────────────────────────────────────────────
  [["child's pose",'childs pose'],                                  'kqnua4rHVVA', "Child's Pose"],
  [['chest stretch'],                                                'nVFNQQaGAW8', 'Chest Stretch'],
  [['hamstring stretch'],                                            'g7Uhp5tpfDI', 'Hamstring Stretch'],
  [['hip flexor stretch','hip flexor'],                              'YQmpR9OC3lQ', 'Hip Flexor Stretch'],
  [['quad stretch'],                                                 'YQmpR9OC3lQ', 'Quad Stretch'],
  [['cat-cow spine'],                                                'kqnua4rHVVA', 'Cat Cow Spine'],

  // ── BACK PAIN ──────────────────────────────────────────────────────────────
  [['knee to chest'],                                                'kqnua4rHVVA', 'Knee to Chest'],
  [['pelvic tilt'],                                                  '8bbE64NuDTU', 'Pelvic Tilt'],
  [['bird dog'],                                                     'wiFNA3sqjCA', 'Bird Dog'],
  [['piriformis'],                                                   'YQmpR9OC3lQ', 'Piriformis Stretch'],

  // ── RESISTANCE BAND ────────────────────────────────────────────────────────
  [['band push-up','band push up'],                                  'IODxDxX7oi4', 'Band Push Up'],
  [['band chest press'],                                             'XWD1bj-3rHQ', 'Band Chest Press'],
  [['band overhead press'],                                          'qEwKCR5JCog', 'Band Overhead Press'],
  [['band lateral raise'],                                           '3VcKaXpzqRo', 'Band Lateral Raise'],
  [['band bent-over row','band row'],                                'FWJR5Ve8bnQ', 'Band Row'],
  [['band face pull','face pull'],                                   'rep-qVOkqgk', 'Face Pull'],
  [['band bicep curl','band curl'],                                  'ykJmrZ5v0Oo', 'Band Curl'],
  [['band hammer curl'],                                             'TwD-YGVP4Bk', 'Band Hammer Curl'],
  [['band squat'],                                                   'MxsFDh5Wv-o', 'Band Squat'],
  [['band romanian deadlift','band rdl'],                            'JCXUYuzwNrM', 'Band RDL'],
  [['band glute bridge'],                                            '8bbE64NuDTU', 'Band Glute Bridge'],
  [['lateral walk','crab walk'],                                     'AHkpUlWJyOw', 'Crab Walk'],
  [['band concentration curl'],                                      'Jvj2wV0vOYU', 'Band Concentration Curl'],
  [['band overhead tricep','band tricep extension'],                 'YbX7Wd8jQ-Q', 'Band Tricep Extension'],
  [['band tricep pressdown','pressdown'],                            '6SS6K3lAwZ8', 'Tricep Pressdown'],
  [['band arnold press'],                                            'iSGqfOF4gxo', 'Band Arnold Press'],
  [['band squat to press','squat to press'],                         'MxsFDh5Wv-o', 'Squat to Press'],
  [['band deadlift'],                                                'JCXUYuzwNrM', 'Band Deadlift'],
  [['band split squat'],                                             '2C-uNgKwPLE', 'Band Split Squat'],
  [['donkey kick'],                                                  '8bbE64NuDTU', 'Donkey Kick'],
  [['clamshell'],                                                    'AHkpUlWJyOw', 'Clamshell'],
  [['standing kickback','band kickback'],                            '6SS6K3lAwZ8', 'Band Kickback'],
  [['band squat to lateral','squat to lateral'],                     '3VcKaXpzqRo', 'Squat Lateral Raise'],

  // ── CARDIO ─────────────────────────────────────────────────────────────────
  [['easy walk','walking','active recovery'],                        'ZZZoCNMU48U', 'Walking'],
];

export function getYouTubeVideoId(exerciseName: string): { id: string; label: string } | null {
  const n = exerciseName.toLowerCase().trim();
  for (const [keywords, id, label] of VIDEOS) {
    for (const kw of keywords) {
      if (n.includes(kw)) return { id, label };
    }
  }
  return null;
}

export function getEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&playsinline=1`;
}
