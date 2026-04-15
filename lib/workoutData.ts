export type Exercise = {
  id: string; name: string; sets: number;
  reps?: string; duration?: number; rest: number;
  how: string; mistakes: string[];
};
export type WorkoutSection = {
  id: string; title: string; icon: string; color: string; exercises: Exercise[];
};
export type DayWorkout = {
  day: number; muscle: string; badge: string; color: string; sections: WorkoutSection[];
};

// ── BACK PAIN RELIEF (same every day) ────────────────────────────────────────
const BACK_PAIN: WorkoutSection = {
  id:'backpain', title:'Back Pain Relief', icon:'🔄', color:'#8E8EFF',
  exercises:[
    {id:'b1',name:'Knee to Chest Hold',sets:1,duration:30,rest:10,
      how:'Lie flat on back. Gently pull both knees to chest. Hold and breathe deeply for 30 sec. Releases lower back compression.',
      mistakes:['Pulling too hard — gentle traction','Holding breath — breathe deeply throughout']},
    {id:'b2',name:'Pelvic Tilt',sets:2,reps:'10 × 10-sec holds',rest:15,
      how:'Lie on back, knees bent. Flatten lower back to floor by tightening abs. Hold 10 sec. Release. 10 reps.',
      mistakes:['Pushing with glutes — use core only','Holding breath during the hold']},
    {id:'b3',name:'Bird Dog',sets:2,reps:'10 each side',rest:20,
      how:'On all fours, neutral spine. Extend opposite arm and leg level with body. Hold 5 sec. Keep hips completely level.',
      mistakes:['Rotating hips when extending','Rushing — the 5-sec hold is the point']},
    {id:'b4',name:'Piriformis Stretch',sets:1,duration:30,rest:10,
      how:'Lie on back. Cross right ankle over left knee (figure-4). Pull left thigh toward chest until deep glute stretch. Switch sides.',
      mistakes:['Not feeling it in the glute — adjust ankle position on knee']},
    {id:'b5',name:"Child's Pose",sets:1,duration:60,rest:0,
      how:'Kneel, reach arms far forward. Let spine elongate and release. Breathe deeply for 60 sec. Decompresses vertebrae.',
      mistakes:['Less than 60 sec — decompression takes time','Holding tension in shoulders']},
  ]
};

// ── COOLDOWN (same every day) ─────────────────────────────────────────────────
const COOLDOWN: WorkoutSection = {
  id:'cooldown', title:'Post-Workout Cooldown', icon:'🌊', color:'#64B4FF',
  exercises:[
    {id:'c1',name:"Child's Pose",sets:1,duration:45,rest:10,
      how:'Kneel, arms extended forward. Forehead rests down. Breathe deeply. Releases the whole spine.',
      mistakes:['Rushing — needs full 45 sec','Holding breath']},
    {id:'c2',name:'Chest Stretch',sets:1,duration:30,rest:10,
      how:'Stand in doorway, arms wide at shoulder height. Gently press chest forward. Feel pecs and front shoulders open.',
      mistakes:['Forcing aggressively','Not breathing through the stretch']},
    {id:'c3',name:'Hamstring Stretch',sets:1,duration:30,rest:10,
      how:'Sit, one leg extended. Hinge from hips and reach toward toes. Hold — do not bounce. Switch legs.',
      mistakes:['Bouncing instead of holding','Rounding spine — hinge from hips']},
    {id:'c4',name:'Hip Flexor Stretch',sets:1,duration:30,rest:10,
      how:'Lunge with back knee on floor. Press hips forward and down. Feel deep stretch at front of hip/thigh. Switch sides.',
      mistakes:['Not pressing hips forward — just standing in a lunge']},
    {id:'c5',name:'Cat-Cow Spine',sets:1,reps:'10 each',rest:15,
      how:'On all fours. Inhale — arch spine down, head up (cow). Exhale — round spine up, head down (cat). One breath per movement.',
      mistakes:['Moving too fast — one breath per movement']},
  ]
};

// ── MUSCLE-SPECIFIC WARMUPS ───────────────────────────────────────────────────
// Every warmup ends with back stretching: Cat-Cow + Thoracic Rotation

const BACK_WARMUP_EXERCISES: Exercise[] = [
  {id:'bw1',name:'Cat-Cow Spine',sets:1,reps:'10 slow breaths',rest:10,
    how:'On all fours. Arch spine down on inhale (cow), round spine up on exhale (cat). Slow and deliberate — one full breath per rep. Mobilises the entire spine.',
    mistakes:['Rushing — one full breath each rep','Moving neck only — use the whole spine']},
  {id:'bw2',name:'Thoracic Rotation Stretch',sets:1,reps:'8 each side',rest:10,
    how:'Sit on heels or cross-legged. Place one hand behind head. Rotate that elbow toward the ceiling, opening the chest. Hold 2 sec at peak. Targets mid-back stiffness.',
    mistakes:['Rotating from the hips — movement is from the mid-back','Not reaching full rotation — go as far as comfortable']},
];

function warmup(id_prefix: string, exercises: Exercise[]): WorkoutSection {
  return {
    id:'warmup', title:'Pre-Workout Warmup', icon:'🌅', color:'#F5C842',
    exercises: [
      ...exercises,
      ...BACK_WARMUP_EXERCISES,
    ]
  };
}

// CHEST warmup: shoulder joint + chest openers + pec activation
const CHEST_WARMUP = warmup('ch', [
  {id:'w_ch1',name:'Arm Circles',sets:1,reps:'15 forward + 15 back',rest:10,
    how:'Extend arms wide. Start with small circles, gradually expand to full range. 15 forward then 15 backward. Opens the shoulder joint and chest.',
    mistakes:['Too small — make them progressively large','Shrugging shoulders — keep them relaxed down']},
  {id:'w_ch2',name:'Shoulder Rolls',sets:1,reps:'10 backward + 10 forward',rest:10,
    how:'Roll shoulders in large backward circles 10 times, then forward. Exaggerate the movement to mobilise the shoulder joint fully.',
    mistakes:['Going too fast — slow deliberate rolls','Not completing the full circle']},
  {id:'w_ch3',name:'Inchworm',sets:1,reps:'6 reps',rest:15,
    how:'Stand tall. Hinge at hips, walk hands forward to plank. Do 1 push-up (optional). Walk hands back. Stand. Activates chest, shoulders, core, and stretches hamstrings.',
    mistakes:['Letting hips sag in plank position','Bending knees instead of keeping legs straight']},
  {id:'w_ch4',name:'Band Pull Apart (or Arms Wide)',sets:1,reps:'15 reps',rest:10,
    how:'Hold arms straight in front at shoulder height. Open them wide to sides like a chest fly. Feel pecs stretch and rear delts activate. Excellent chest day activation.',
    mistakes:['Bending elbows — keep arms straight','Not squeezing shoulder blades at the back']},
]);

// BACK warmup: shoulder mobility + lat activation + spine mobility
const BACK_WARMUP = warmup('bk', [
  {id:'w_bk1',name:'Arm Circles',sets:1,reps:'12 forward + 12 back',rest:10,
    how:'Full large circles. Opens shoulder joint for pulling movements. Lead with the elbow on the backward circle.',
    mistakes:['Small restricted circles — go large','Tensing neck and traps']},
  {id:'w_bk2',name:'Thread the Needle',sets:1,reps:'8 each side',rest:10,
    how:'On all fours. Slide one arm under the body and through, rotating the upper back until the shoulder touches the floor. Hold 2 sec. Mobilises the thoracic spine directly — essential for back day.',
    mistakes:['Rotating from the hips — the movement is from the mid-back only','Forcing range — go as far as comfortable']},
  {id:'w_bk3',name:'Dead Hang or Active Hang',sets:1,duration:20,rest:15,
    how:'Hang from the pull-up bar. Let the spine decompress completely. For active hang, gently depress shoulder blades to feel lats engage. Primes the lats for pulling.',
    mistakes:['Letting shoulders completely disengage — try gentle scapular depression','Holding breath — breathe normally throughout']},
  {id:'w_bk4',name:'World Greatest Stretch',sets:1,reps:'5 each side',rest:10,
    how:'Lunge forward, place same-side hand beside front foot. Rotate upper body and reach the free arm toward ceiling. Hold 2 sec. Works hips, thoracic spine, and hip flexors together.',
    mistakes:['Front knee caving inward','Rushing through — hold the top position']},
]);

// SHOULDER warmup: rotator cuff + joint mobility + lat/chest opener
const SHOULDER_WARMUP = warmup('sh', [
  {id:'w_sh1',name:'Arm Circles',sets:1,reps:'15 small + 15 large each direction',rest:10,
    how:'Start with small tight circles, gradually expand to max range. Both directions. The rotator cuff must be thoroughly warmed before overhead pressing.',
    mistakes:['Skipping small circles — progress from small to large','Going too fast']},
  {id:'w_sh2',name:'Shoulder Dislocate (with towel or band)',sets:1,reps:'10 slow',rest:10,
    how:'Hold a towel or band wider than shoulder width. Keep arms straight and slowly arc overhead and behind the body, then return. This is the single best shoulder mobility drill.',
    mistakes:['Grip too narrow — causes shoulder pain, start very wide','Bending elbows to compensate — arms must stay straight']},
  {id:'w_sh3',name:'Hip Circles',sets:1,reps:'10 each direction',rest:10,
    how:'Hands on hips. Large slow circles to warm the core and hips, which stabilise during overhead pressing.',
    mistakes:['Small circles — make them as large as possible']},
  {id:'w_sh4',name:'Band Pull Apart',sets:1,reps:'15 reps',rest:10,
    how:'Arms in front, shoulder height, hands shoulder-width. Pull apart to a T-position, squeezing rear delts. Critical for shoulder health before pressing.',
    mistakes:['Bending elbows','Not getting to full T-position at the back']},
]);

// LEGS warmup: hips + knees + ankles + glute activation
const LEGS_WARMUP = warmup('lg', [
  {id:'w_lg1',name:'Hip Circles',sets:1,reps:'12 each direction',rest:10,
    how:'Hands on hips. Large slow circles to open hip flexors, hip capsule, and piriformis. Make them as large as possible.',
    mistakes:['Small circles — bigger = better mobility','Moving the upper body instead of the hips']},
  {id:'w_lg2',name:'Leg Swings',sets:1,reps:'12 forward/back + 12 side to side each leg',rest:10,
    how:'Hold wall for balance. Swing one leg forward and back in a pendulum 12 times. Then swing side to side 12 times. Switch legs. Opens the hip joint dynamically.',
    mistakes:['Swinging too forcefully — controlled arc','Not holding something stable — you need balance support']},
  {id:'w_lg3',name:'Bodyweight Squat',sets:2,reps:'10 slow',rest:20,
    how:'Feet shoulder-width, toes slightly out. Squat slowly to full depth. Pause at bottom 2 sec. Rise. Warms up quads, glutes, hamstrings, and ankles together.',
    mistakes:['Heels rising — go lighter or widen stance','Chest collapsing — keep torso tall','Not reaching depth']},
  {id:'w_lg4',name:'Glute Bridge',sets:1,reps:'15 slow reps',rest:15,
    how:'Lie on back, feet flat, knees bent. Drive hips toward ceiling. Squeeze glutes hard at top for 2 sec. Lower slowly. Essential glute activation before squats and deadlifts.',
    mistakes:['Using lower back to push up — squeeze glutes, not back','Feet too far or too close — shins should be vertical at the top']},
]);

// BICEPS warmup: elbow joint + wrist + forearm
const BICEPS_WARMUP = warmup('bi', [
  {id:'w_bi1',name:'Arm Circles',sets:1,reps:'10 small + 10 large each direction',rest:10,
    how:'Warm up shoulder joint which stabilises during curls. Progress from small to large circles.',
    mistakes:['Skipping — shoulder stability is key for curling mechanics']},
  {id:'w_bi2',name:'Wrist Circles',sets:1,reps:'15 each direction each wrist',rest:10,
    how:'Extend arms in front. Make large circles with each wrist — clockwise then counter-clockwise. Warms the wrist and forearm which work hard during curls.',
    mistakes:['Too small — full range rotations only']},
  {id:'w_bi3',name:'Shoulder Rolls',sets:1,reps:'10 backward + 10 forward',rest:10,
    how:'Roll shoulders in large backward circles, then forward. Opens the shoulder joint for the elbow flexion pattern.',
    mistakes:['Too fast — slow and deliberate rolls']},
  {id:'w_bi4',name:'Inchworm',sets:1,reps:'5 reps',rest:15,
    how:'Walk hands to plank, do a push-up, walk back to standing. Activates the whole arm chain — biceps, shoulders, forearms — before isolation work.',
    mistakes:['Hips sagging — tight plank throughout']},
]);

// TRICEPS warmup: elbow joint + shoulder + wrist
const TRICEPS_WARMUP = warmup('tr', [
  {id:'w_tr1',name:'Arm Circles',sets:1,reps:'15 forward + 15 back',rest:10,
    how:'Full shoulder warm-up before heavy tricep pressing and extensions. Large progressive circles.',
    mistakes:['Too fast — go slow and large']},
  {id:'w_tr2',name:'Tricep Stretch Overhead',sets:1,reps:'10 each arm (15-sec holds)',rest:10,
    how:'Raise one arm, bend elbow behind head. Use free hand to gently push elbow for deeper stretch. Warm up the tricep and elbow joint before loading them.',
    mistakes:['Pulling too hard — gentle pressure only','Leaning sideways to compensate']},
  {id:'w_tr3',name:'Wrist Circles',sets:1,reps:'15 each direction each wrist',rest:10,
    how:'Wrists take load in overhead extensions and close-grip presses. Warm them fully before starting.',
    mistakes:['Small circles — full range only']},
  {id:'w_tr4',name:'Push-up (slow)',sets:1,reps:'8 slow reps',rest:20,
    how:'Slow controlled push-ups to activate the chest, triceps, and shoulder pressing pattern. 3 sec down, 2 sec up.',
    mistakes:['Rushing — these are activation reps not max effort','Hips sagging or piking']},
]);

// FOREARMS warmup: wrist + grip + elbow
const FOREARMS_WARMUP = warmup('fw', [
  {id:'w_fw1',name:'Wrist Circles',sets:1,reps:'20 each direction each wrist',rest:10,
    how:'Full large circles with each wrist. Lubricate the wrist joints before heavy wrist curls and extensions. Do more reps than you think you need.',
    mistakes:['Too few reps — forearm joints need thorough warming']},
  {id:'w_fw2',name:'Finger Extensions',sets:1,reps:'15 reps',rest:10,
    how:'Make a fist, then spread fingers as wide as possible. This activates the extensor side of the forearm, which is underdeveloped in most people.',
    mistakes:['Only doing partial extension — spread to maximum']},
  {id:'w_fw3',name:'Arm Circles',sets:1,reps:'10 each direction',rest:10,
    how:'Shoulder and elbow joint warm-up. Forearm work loads the elbow at all angles.',
    mistakes:['Skipping — elbow health depends on full warm-up']},
  {id:'w_fw4',name:'Grip Squeeze',sets:1,reps:'15 reps (3-sec squeeze each)',rest:10,
    how:'Make tight fist, hold 3 sec, fully open hand. Activates intrinsic hand muscles before farmer carries and grip work.',
    mistakes:['Partial squeeze — maximum effort per rep']},
]);

// ── ABS SECTIONS — 7 different daily focuses ──────────────────────────────────
// Day 1 (Mon/Chest): OBLIQUES
// Day 2 (Tue/Back): UPPER ABS + COMPRESSION
// Day 3 (Wed/Shoulders): ROTATIONAL CORE
// Day 4 (Thu/Legs): ANTI-ROTATION + STABILITY
// Day 5 (Fri/Biceps): LOWER ABS + HIP FLEXORS
// Day 6 (Sat/Triceps): FULL CORE CIRCUIT
// Day 7 (Sun/Forearms): ISOMETRIC HOLDS

const ABS_OBLIQUES: WorkoutSection = {
  id:'abs', title:'Abs — Obliques Focus', icon:'🎯', color:'#00C7BE',
  exercises:[
    {id:'ao1',name:'Standing DB Wood Chop',sets:3,reps:'15 each side',rest:20,
      how:'Hold DB both hands. Rotate diagonally from high to low across body. Pivot rear foot. Torso initiates — arms follow.',
      mistakes:['Arms only — torso must rotate','No rear foot pivot']},
    {id:'ao2',name:'Standing DB Side Bend',sets:3,reps:'15 each side',rest:20,
      how:'DB in one hand. Bend directly sideways — pure lateral plane. Squeeze the opposite oblique hard on the return.',
      mistakes:['Leaning forward — pure lateral only','Swinging the weight']},
    {id:'ao3',name:'Standing DB Russian Twist',sets:3,reps:'15 each side',rest:20,
      how:'DB at chest. Feet hip-width, knees soft. Rotate torso fully left then right. Hips square forward throughout.',
      mistakes:['Rotating hips — torso rotates, hips stay still','Going too fast']},
  ]
};

const ABS_UPPER: WorkoutSection = {
  id:'abs', title:'Abs — Upper Abs Focus', icon:'🎯', color:'#00C7BE',
  exercises:[
    {id:'au1',name:'Standing DB Overhead Crunch',sets:3,reps:'15 reps',rest:20,
      how:'Hold DB overhead, arms straight. Crunch ribcage DOWN toward hips by squeezing upper abs. Arms stay straight — they do not bend.',
      mistakes:['Bending elbows','Tilting forward instead of crunching down']},
    {id:'au2',name:'Standing DB Pullover Crunch',sets:3,reps:'12 reps',rest:20,
      how:'Hold DB overhead. As you crunch down, pull DB toward chest and drive elbows toward knees. Combines upper ab crunch with lat activation.',
      mistakes:['Making it a shoulder exercise — the crunch leads, the arms follow']},
    {id:'au3',name:'Standing DB Halo',sets:3,reps:'12 each direction',rest:20,
      how:'DB at chest. Circle slowly around head — keep core completely rigid. No torso sway. Challenges upper core stability.',
      mistakes:['Swaying body to move the DB','Too heavy a DB']},
  ]
};

const ABS_ROTATIONAL: WorkoutSection = {
  id:'abs', title:'Abs — Rotational Core', icon:'🎯', color:'#00C7BE',
  exercises:[
    {id:'ar1',name:'Standing DB Russian Twist',sets:3,reps:'20 each side',rest:20,
      how:'DB at chest. Rotate torso fully with control. Hips stay forward and square. Each side counts as one rep.',
      mistakes:['Rushing the rotation','Hips rotating with the torso']},
    {id:'ar2',name:'Standing DB Wood Chop (Low to High)',sets:3,reps:'12 each side',rest:20,
      how:'Start DB at outside knee, rotate diagonally up to opposite shoulder. Pivot rear foot. Trains the rotational power chain from hip to shoulder.',
      mistakes:['Arms lifting instead of torso rotating','No pivot — limits range']},
    {id:'ar3',name:'Standing DB Windmill',sets:3,reps:'10 each side',rest:25,
      how:'DB overhead in one arm. Push hips to same side as raised arm. Slide free hand down opposite leg. Keep eyes on DB. Deep oblique and core stretch-crunch.',
      mistakes:['Bending forward instead of sideways','Dropping overhead arm']},
  ]
};

const ABS_STABILITY: WorkoutSection = {
  id:'abs', title:'Abs — Anti-Rotation & Stability', icon:'🎯', color:'#00C7BE',
  exercises:[
    {id:'as1',name:'Standing DB Halo',sets:3,reps:'10 each direction',rest:20,
      how:'DB at chest or overhead. Circle slowly around head while keeping torso completely rigid. Core must resist the rotation force.',
      mistakes:['Letting body sway','Going too fast — slow defeats the stability challenge']},
    {id:'as2',name:'Standing Single-arm DB Press Out',sets:3,reps:'12 each side',rest:20,
      how:'Hold DB in one hand at chest. Slowly press it straight out in front to full arm extension. Hold 2 sec. Slowly pull back. Core resists the asymmetric load.',
      mistakes:['Leaning to counterbalance — stay tall and rigid','Holding breath']},
    {id:'as3',name:'Standing DB Carry (Suitcase)',sets:2,duration:30,rest:25,
      how:'Hold a heavy DB in ONE hand at side. Walk 10 steps back and forth, keeping torso completely upright. Switch hands. Core works hard against lateral lean.',
      mistakes:['Leaning toward the DB side','Taking short steps — stride normally']},
  ]
};

const ABS_LOWER: WorkoutSection = {
  id:'abs', title:'Abs — Lower Abs & Hip Flexors', icon:'🎯', color:'#00C7BE',
  exercises:[
    {id:'al1',name:'Standing DB High Knee March',sets:2,duration:40,rest:20,
      how:'Hold DB overhead with both hands. March on the spot, driving knees high above hip level. The overhead weight forces core to work against extension with every knee drive.',
      mistakes:['Low knees — must come above hip height','Leaning backward']},
    {id:'al2',name:'Standing DB Squat + Press',sets:3,reps:'12 reps',rest:25,
      how:'DB at shoulders. Squat deep. As you stand, press DB overhead. The transition from squat to press forces lower core and hip flexors to stabilise.',
      mistakes:['Pressing before standing — complete the squat first','Lower back arching during the press']},
    {id:'al3',name:'Standing DB Side Bend',sets:3,reps:'15 each side',rest:20,
      how:'Pure lateral — target the obliques and the muscles that stabilise the lower spine. Squeeze the working side at full bend.',
      mistakes:['Rotating forward','Short range — go to maximum lateral bend']},
  ]
};

const ABS_FULL: WorkoutSection = {
  id:'abs', title:'Abs — Full Core Circuit', icon:'🎯', color:'#00C7BE',
  exercises:[
    {id:'af1',name:'Standing DB Wood Chop',sets:2,reps:'12 each side',rest:15,
      how:'High to low diagonal rotation. Pivot rear foot. Brief pause at the low position before returning.',
      mistakes:['Arms only — the torso must drive the rotation']},
    {id:'af2',name:'Standing DB Russian Twist',sets:2,reps:'15 each side',rest:15,
      how:'Full torso rotation each side. Hips stay square. Keep the DB close to the chest for better core activation.',
      mistakes:['Hips rotating','Short range — full rotation to each side']},
    {id:'af3',name:'Standing DB Overhead Crunch',sets:2,reps:'15 reps',rest:15,
      how:'Arms straight overhead. Crunch ribcage toward hips. Return to full extension. Complete upper-lower chain.',
      mistakes:['Bending elbows']},
    {id:'af4',name:'Standing DB Windmill',sets:2,reps:'8 each side',rest:20,
      how:'DB overhead, push hips out, slide hand down leg. Full oblique stretch and contraction.',
      mistakes:['Forward lean instead of lateral']},
  ]
};

const ABS_ISOMETRIC: WorkoutSection = {
  id:'abs', title:'Abs — Isometric Holds', icon:'🎯', color:'#00C7BE',
  exercises:[
    {id:'ai1',name:'Standing DB Halo',sets:3,duration:20,rest:20,
      how:'Hold DB overhead, arms extended. Do NOT circle it — hold it steady while resisting any sway. Pure anti-rotation isometric for 20 sec.',
      mistakes:['Moving the DB — this is a static hold','Holding breath — breathe continuously']},
    {id:'ai2',name:'Standing DB Press Out Hold',sets:3,duration:20,rest:20,
      how:'Hold DB in both hands. Press out to full arm extension at chest height. Hold position completely still for 20 sec. Intense core anti-extension challenge.',
      mistakes:['Dropping the DB height during the hold','Rounding forward']},
    {id:'ai3',name:'Standing DB Suitcase Hold',sets:2,duration:30,rest:20,
      how:'Heavy DB in one hand at side. Stand absolutely upright for 30 sec. Core must resist lateral lean. This is deceptively hard and highly effective.',
      mistakes:['Leaning even slightly — stay military-straight','Shrugging the shoulder holding the DB']},
  ]
};

// Map: abs section by (day-1) % 7
const ABS_BY_DAY = [ABS_OBLIQUES, ABS_UPPER, ABS_ROTATIONAL, ABS_STABILITY, ABS_LOWER, ABS_FULL, ABS_ISOMETRIC];

// ── BRO SPLIT ─────────────────────────────────────────────────────────────────
export const BRO_SPLIT: DayWorkout[] = [
  { day:1, muscle:'Chest', badge:'MON', color:'#FF6B35',
    sections:[ CHEST_WARMUP,
      { id:'main', title:'Chest Workout', icon:'💪', color:'#FF6B35', exercises:[
        {id:'ch1',name:'DB Bench Press (Flat)',sets:3,reps:'12–15',rest:60,
          how:'Lie flat, feet planted. Lower DBs to chest with elbows at 45°. Press up without full lockout. 3-sec controlled negative.',
          mistakes:['Elbows flaring to 90° — shoulder injury','Bouncing off chest','Excessive back arch']},
        {id:'ch2',name:'DB Incline Press',sets:3,reps:'12',rest:60,
          how:'Bench at 30–45°. Press from upper chest. Shoulder blades squeezed back and down throughout.',
          mistakes:['Bench too steep — shifts to shoulders','Not controlling descent']},
        {id:'ch3',name:'DB Chest Fly',sets:3,reps:'12',rest:60,
          how:'Slight fixed elbow bend. Arc wide, feel pec stretch, squeeze at top. This is isolation — not a press.',
          mistakes:['Straightening elbows','Going too heavy — defeats isolation purpose']},
        {id:'ch4',name:'DB Decline Press',sets:3,reps:'12',rest:60,
          how:'Lower bench angle for lower chest. Elbows at 45°. Core tight for stability on the decline.',
          mistakes:['DBs drifting wide at top','Rushing the range of motion']},
      ]}, ABS_BY_DAY[0], COOLDOWN, BACK_PAIN ] },

  { day:2, muscle:'Back', badge:'TUE', color:'#34C759',
    sections:[ BACK_WARMUP,
      { id:'main', title:'Back Workout', icon:'🏋️', color:'#34C759', exercises:[
        {id:'bk1',name:'Pull-ups (Wide Grip)',sets:3,reps:'Max reps',rest:90,
          how:'Grip wider than shoulders. Pull chest to bar — not just chin. Squeeze shoulder blades at top. Full dead hang at bottom every rep.',
          mistakes:['Kipping — strict reps only','Not reaching full hang','Using biceps not lats']},
        {id:'bk2',name:'DB Bent-over Row',sets:3,reps:'12 per arm',rest:60,
          how:'Hinge at hips 45°, neutral spine. Drive elbow straight back past hip. Hold 1 sec at top. 3-sec negative.',
          mistakes:['Rounding lower back — biggest injury risk','Jerking with momentum','Torso rotation per rep']},
        {id:'bk3',name:'DB Single-arm Row',sets:3,reps:'12 per arm',rest:60,
          how:'Knee and hand on bench. Pull to hip — not shoulder. Think elbow to ceiling. Arm fully extended at bottom.',
          mistakes:['Pulling toward shoulder — uses rear delt','Not stabilising support arm']},
        {id:'bk4',name:'DB Reverse Fly',sets:3,reps:'15',rest:60,
          how:'Bend forward 90°. Arms with soft bend. Raise to shoulder height. Rear delts and upper back.',
          mistakes:['Too heavy — control is everything','Straightening arms fully']},
      ]}, ABS_BY_DAY[1], COOLDOWN, BACK_PAIN ] },

  { day:3, muscle:'Shoulders', badge:'WED', color:'#AF52DE',
    sections:[ SHOULDER_WARMUP,
      { id:'main', title:'Shoulder Workout', icon:'🎯', color:'#AF52DE', exercises:[
        {id:'sh1',name:'DB Overhead Press',sets:3,reps:'12',rest:60,
          how:'Start at shoulders, palms forward. Press straight up. Core braced. Lower to ear level.',
          mistakes:['Hip thrust to assist','Flaring elbows too wide','Partial reps']},
        {id:'sh2',name:'DB Lateral Raise',sets:3,reps:'15',rest:60,
          how:'Lead with elbows to shoulder height. Pause 1 sec. Shoulders pulled DOWN — no shrugging.',
          mistakes:['Shrugging traps','Heavy weight with swing','Above shoulder height']},
        {id:'sh3',name:'DB Front Raise',sets:3,reps:'12',rest:60,
          how:'Raise to shoulder height, thumbs slightly up. Control the full descent. Alternating or together.',
          mistakes:['Swinging body backward','Above shoulder height']},
        {id:'sh4',name:'DB Arnold Press',sets:3,reps:'12',rest:60,
          how:'Start palms facing you at chin. Rotate outward as you press. Reverse on descent. Full rotation every rep.',
          mistakes:['Rushing the rotation','Partial range of motion']},
      ]}, ABS_BY_DAY[2], COOLDOWN, BACK_PAIN ] },

  { day:4, muscle:'Legs', badge:'THU', color:'#FFD60A',
    sections:[ LEGS_WARMUP,
      { id:'main', title:'Leg Workout', icon:'🦵', color:'#FFD60A', exercises:[
        {id:'lg1',name:'DB Goblet Squat',sets:3,reps:'15',rest:60,
          how:'DB vertically at chest. Feet shoulder-width, toes out. Squat deep — thighs parallel or below. Chest stays tall.',
          mistakes:['Heels rising','Knees caving inward','Forward lean']},
        {id:'lg2',name:'DB Romanian Deadlift',sets:3,reps:'12',rest:60,
          how:'Hold DBs in front. Hinge at hips — push hips back. Lower until strong hamstring stretch. Drive hips forward to return.',
          mistakes:['Rounding lower back — critical','Too much knee bend — this is a hip hinge','DBs swinging away from legs']},
        {id:'lg3',name:'DB Walking Lunge',sets:3,reps:'10 each leg',rest:60,
          how:'Step forward, lower back knee near floor. Front shin vertical. Push off front foot to step into next lunge.',
          mistakes:['Front knee past toes','Torso leaning forward','Short steps']},
        {id:'lg4',name:'DB Calf Raise',sets:3,reps:'20',rest:45,
          how:'Stand on step edge. Full range — deep stretch down, squeeze and hold at top 1 sec.',
          mistakes:['Partial reps — calves need full range','Going too fast']},
      ]}, ABS_BY_DAY[3], COOLDOWN, BACK_PAIN ] },

  { day:5, muscle:'Biceps', badge:'FRI', color:'#FF2D55',
    sections:[ BICEPS_WARMUP,
      { id:'main', title:'Biceps Workout', icon:'💪', color:'#FF2D55', exercises:[
        {id:'bi1',name:'DB Standing Bicep Curl',sets:3,reps:'12',rest:60,
          how:'Elbows pinned to sides. Curl both DBs, supinate fully at top. Lower slowly — 3 full seconds.',
          mistakes:['Body swing — elbows fixed to ribs','Not supinating at top','Dropping the weight']},
        {id:'bi2',name:'DB Hammer Curl',sets:3,reps:'12',rest:60,
          how:'Neutral grip (palms facing each other) throughout. Targets brachialis — key for arm width and thickness.',
          mistakes:['Rotating wrist during curl','Swinging elbows forward']},
        {id:'bi3',name:'DB Concentration Curl',sets:3,reps:'12 per arm',rest:60,
          how:'Elbow on inner thigh as brace. Curl, squeeze hard at top, lower to full extension. Zero swing.',
          mistakes:['Using thigh to push elbow','Short range at bottom']},
        {id:'bi4',name:'DB Incline Curl',sets:3,reps:'12',rest:60,
          how:'Incline bench at 45°. Arms hang in full stretch. Curl from stretched position — maximum long-head activation.',
          mistakes:['Bench too upright','Swinging elbows off bench']},
      ]}, ABS_BY_DAY[4], COOLDOWN, BACK_PAIN ] },

  { day:6, muscle:'Triceps', badge:'SAT', color:'#FF9500',
    sections:[ TRICEPS_WARMUP,
      { id:'main', title:'Triceps Workout', icon:'🔱', color:'#FF9500', exercises:[
        {id:'tr1',name:'DB Overhead Tricep Extension',sets:3,reps:'12',rest:60,
          how:'Hold one DB overhead both hands. Lower behind head — ONLY elbows move. Upper arms stay vertical.',
          mistakes:['Elbows flaring out','Moving upper arms','Partial range behind head']},
        {id:'tr2',name:'DB Tricep Kickback',sets:3,reps:'15 per arm',rest:60,
          how:'Hinge forward. Upper arm parallel and locked to floor. Extend to full lockout. Squeeze at full extension.',
          mistakes:['Upper arm drooping','Swinging with momentum','Not reaching full lockout']},
        {id:'tr3',name:'DB Close-grip Press',sets:3,reps:'12',rest:60,
          how:'DBs close together, palms facing each other. Press up — elbows tucked to sides the entire time.',
          mistakes:['Elbows flaring out — becomes chest press','DBs drifting apart at top']},
        {id:'tr4',name:'DB Skull Crusher',sets:3,reps:'10',rest:60,
          how:'Arms extended over chest. Bend only at elbows, lower to temples. Elbows point up. Go lighter.',
          mistakes:['Moving upper arms forward','Too heavy — elbow strain risk']},
      ]}, ABS_BY_DAY[5], COOLDOWN, BACK_PAIN ] },

  { day:7, muscle:'Forearms', badge:'SUN', color:'#30D158',
    sections:[ FOREARMS_WARMUP,
      { id:'main', title:'Forearm Workout', icon:'🤜', color:'#30D158', exercises:[
        {id:'fw1',name:'DB Wrist Curl (Palms Up)',sets:3,reps:'20',rest:45,
          how:'Forearm on thigh, palm up. Full wrist curl range — open completely, curl fully. Slow descent.',
          mistakes:['Whole forearm moving — wrist only','Too heavy — forearms need reps']},
        {id:'fw2',name:'DB Wrist Extension (Palms Down)',sets:3,reps:'20',rest:45,
          how:'Palm down. Extend wrist upward. Targets extensors — commonly neglected causing imbalance.',
          mistakes:['Neglecting this side — causes tennis elbow','Incomplete range']},
        {id:'fw3',name:'DB Hammer Curl',sets:3,reps:'15',rest:60,
          how:'Neutral grip. Slow and controlled. Brachioradialis — thick outer forearm muscle.',
          mistakes:['Body swing','Not going to full extension at bottom']},
        {id:'fw4',name:"DB Farmer's Carry",sets:3,duration:30,rest:45,
          how:'Heavy DBs at sides. Walk tall. Grip as hard as possible. King of forearm and grip training.',
          mistakes:['Leaning to one side','DBs bouncing against thighs']},
      ]}, ABS_BY_DAY[6], COOLDOWN, BACK_PAIN ] },
];

// ── PPL SPLIT ─────────────────────────────────────────────────────────────────
export const PPL_SPLIT: DayWorkout[] = [
  { day:1, muscle:'Push', badge:'DAY 1', color:'#FF6B35',
    sections:[ CHEST_WARMUP,
      { id:'main', title:'Push — Chest, Shoulders & Triceps', icon:'💪', color:'#FF6B35', exercises:[
        {id:'p1',name:'DB Bench Press',sets:3,reps:'12',rest:60,
          how:'Lie flat. Lower to chest, elbows 45°. Press up without full lockout. 3-sec controlled descent.',
          mistakes:['Elbows flaring','Bouncing off chest','Back arch']},
        {id:'p2',name:'DB Overhead Press',sets:3,reps:'12',rest:60,
          how:'Start at shoulders, palms forward. Press straight up. Core braced. Lower to ear level.',
          mistakes:['Hip thrust','Partial reps','Elbows too wide']},
        {id:'p3',name:'DB Lateral Raise',sets:3,reps:'15',rest:45,
          how:'Lead with elbows to shoulder height. Pause 1 sec. Shoulders DOWN — no shrugging.',
          mistakes:['Shrugging traps','Swing with heavy weight']},
        {id:'p4',name:'DB Tricep Overhead Extension',sets:3,reps:'12',rest:60,
          how:'DB overhead both hands. Lower behind head — only elbows bend. Upper arms vertical.',
          mistakes:['Elbows flaring','Moving upper arms']},
      ]}, ABS_BY_DAY[0], COOLDOWN, BACK_PAIN ] },

  { day:2, muscle:'Pull', badge:'DAY 2', color:'#34C759',
    sections:[ BACK_WARMUP,
      { id:'main', title:'Pull — Back & Biceps', icon:'🏋️', color:'#34C759', exercises:[
        {id:'pl1',name:'Pull-ups',sets:3,reps:'Max reps',rest:90,
          how:'Wide grip, pull chest to bar, squeeze shoulder blades. Full dead hang at bottom. Strict — no kipping.',
          mistakes:['Kipping','Partial range','Arms not lats']},
        {id:'pl2',name:'DB Bent-over Row',sets:3,reps:'12 per arm',rest:60,
          how:'Hinge 45°, drive elbow past hip, hold 1 sec at top, 3-sec negative.',
          mistakes:['Rounding back','Jerking weight','Torso rotation']},
        {id:'pl3',name:'DB Bicep Curl',sets:3,reps:'12',rest:60,
          how:'Elbows pinned to sides. Supinate fully at top. 3-second negative. No body swing.',
          mistakes:['Body swing','Not supinating','Rushing negative']},
        {id:'pl4',name:'DB Hammer Curl',sets:3,reps:'12',rest:60,
          how:'Neutral grip throughout. Alternating arms. Targets brachialis for arm thickness.',
          mistakes:['Rotating wrist','Swinging elbows forward']},
      ]}, ABS_BY_DAY[1], COOLDOWN, BACK_PAIN ] },

  { day:3, muscle:'Legs', badge:'DAY 3', color:'#FFD60A',
    sections:[ LEGS_WARMUP,
      { id:'main', title:'Legs — Quads, Hamstrings & Calves', icon:'🦵', color:'#FFD60A', exercises:[
        {id:'ll1',name:'DB Goblet Squat',sets:3,reps:'15',rest:60,
          how:'DB at chest, squat below parallel, chest tall, knees over toes.',
          mistakes:['Heels rising','Knees caving','Forward lean']},
        {id:'ll2',name:'DB Romanian Deadlift',sets:3,reps:'12',rest:60,
          how:'Hip hinge, push hips back, lower to hamstring stretch, drive hips forward.',
          mistakes:['Rounding back','Too much knee bend','DBs swinging out']},
        {id:'ll3',name:'DB Walking Lunge',sets:3,reps:'10 each',rest:60,
          how:'Front shin vertical. Back knee near floor. Push off and step forward.',
          mistakes:['Front knee past toes','Torso leaning','Short steps']},
        {id:'ll4',name:'DB Calf Raise',sets:3,reps:'20',rest:45,
          how:'Full range. Deep stretch. Squeeze and hold at top 1 sec.',
          mistakes:['Partial reps','Going too fast']},
      ]}, ABS_BY_DAY[2], COOLDOWN, BACK_PAIN ] },

  { day:4, muscle:'Push+', badge:'DAY 4', color:'#FF9500',
    sections:[ CHEST_WARMUP,
      { id:'main', title:'Push 2 — Incline & Arm Focus', icon:'💪', color:'#FF9500', exercises:[
        {id:'p21',name:'DB Incline Press',sets:4,reps:'10',rest:75,
          how:'Bench 30–45°. Press from upper chest. Blades squeezed back. 3-sec negative.',
          mistakes:['Bench too steep','Not controlling descent']},
        {id:'p22',name:'DB Arnold Press',sets:3,reps:'12',rest:60,
          how:'Start palms facing you. Rotate outward as you press. Full rotation each rep.',
          mistakes:['Rushing rotation','Partial range']},
        {id:'p23',name:'DB Chest Fly',sets:3,reps:'12',rest:60,
          how:'Fixed elbow bend, arc motion, feel pec stretch, squeeze at top.',
          mistakes:['Turning into a press','Too heavy']},
        {id:'p24',name:'DB Tricep Kickback',sets:3,reps:'15 each',rest:45,
          how:'Hinge forward. Upper arm parallel, locked. Extend to full lockout. Squeeze.',
          mistakes:['Upper arm drooping','Swinging for momentum']},
      ]}, ABS_BY_DAY[3], COOLDOWN, BACK_PAIN ] },

  { day:5, muscle:'Pull+', badge:'DAY 5', color:'#AF52DE',
    sections:[ BACK_WARMUP,
      { id:'main', title:'Pull 2 — Thickness & Arms', icon:'🏋️', color:'#AF52DE', exercises:[
        {id:'pl21',name:'Chin-ups',sets:3,reps:'Max reps',rest:90,
          how:'Underhand grip, shoulder-width. Pull chest to bar. 3-sec descent. Full range.',
          mistakes:['Kipping','Chin only — pull chest to bar','Rushing descent']},
        {id:'pl22',name:'DB Single-arm Row',sets:3,reps:'12 each',rest:60,
          how:'Knee and hand on bench. Elbow to ceiling. Arm fully extended at bottom.',
          mistakes:['Pulling toward shoulder','Torso rotation']},
        {id:'pl23',name:'DB Concentration Curl',sets:3,reps:'12 each',rest:60,
          how:'Elbow on thigh. Squeeze at top. Full extension at bottom. Zero swing.',
          mistakes:['Thigh pushing elbow','Short range']},
        {id:'pl24',name:'DB Zottman Curl',sets:3,reps:'10',rest:60,
          how:'Curl up palms-up, rotate to palms-down at top, lower palms-down. Hits biceps and forearms.',
          mistakes:['Rotating too early — wait until fully curled','Too heavy']},
      ]}, ABS_BY_DAY[4], COOLDOWN, BACK_PAIN ] },

  { day:6, muscle:'Legs+', badge:'DAY 6', color:'#30D158',
    sections:[ LEGS_WARMUP,
      { id:'main', title:'Legs 2 — Power & Unilateral', icon:'🦵', color:'#30D158', exercises:[
        {id:'ll21',name:'DB Bulgarian Split Squat',sets:4,reps:'8 each leg',rest:90,
          how:'Rear foot on bench, front foot far forward. Lower until front thigh is parallel. Go lighter — very challenging.',
          mistakes:['Front foot too close — knee past toes','Dropping too fast — 2–3 sec descent']},
        {id:'ll22',name:'DB Romanian Deadlift',sets:4,reps:'10',rest:75,
          how:'Heavier than Day 3. Hold 1 sec at bottom in hamstring stretch.',
          mistakes:['Rounding back at heavier weight','Losing hip hinge pattern']},
        {id:'ll23',name:'DB Goblet Squat',sets:3,reps:'12',rest:60,
          how:'3-sec descent, explosive rise. Heavier DB. Full depth every rep.',
          mistakes:['Speeding on descent','Heels rising under heavier load']},
        {id:'ll24',name:'DB Single-leg Calf Raise',sets:3,reps:'15 each',rest:45,
          how:'Hold same-side DB. Light wall touch for balance. Full range — calf does all the work.',
          mistakes:['Using wall to assist','Half reps under load']},
      ]}, ABS_BY_DAY[5], COOLDOWN, BACK_PAIN ] },

  { day:7, muscle:'Active Rest', badge:'DAY 7', color:'#636366',
    sections:[
      { id:'warmup', title:'Light Mobility', icon:'🌅', color:'#F5C842', exercises:[
        ...BACK_WARMUP_EXERCISES,
        {id:'ar_h1',name:'Hip Circles',sets:1,reps:'12 each direction',rest:10,
          how:'Large slow hip circles. Both directions. Keep everything else still.',
          mistakes:['Small circles']},
        {id:'ar_ls1',name:'Leg Swings',sets:1,reps:'10 each leg each direction',rest:10,
          how:'Forward/back and side-to-side. Hold wall for balance.',
          mistakes:['Swinging too forcefully']},
      ]},
      { id:'main', title:'Active Recovery', icon:'🌿', color:'#636366', exercises:[
        {id:'ar1',name:'20–30 Min Easy Walk',sets:1,duration:1200,rest:0,
          how:'Easy-paced walk outdoors or treadmill. Focus on breathing. Not a workout — movement aids recovery.',
          mistakes:['Going too fast — should feel effortless','Skipping — movement aids recovery significantly']},
      ]}, COOLDOWN, BACK_PAIN ] },
];
