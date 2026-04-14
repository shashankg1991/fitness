export type Recipe = {
  ingredients: string[];
  steps: string[];
  protein: number;
  calories: number;
  prepTime: string;
};

export type Meal = {
  time: string;
  label: string;
  name: string;
  items: string[];
  proteinG: number;
  calories: number;
  recipe: Recipe;
  swapOptions?: { name: string; proteinG: number; calories: number; items: string[] }[];
  prepAhead?: string; // what to do the previous evening
};

export type DayDiet = {
  day: number;
  theme: string;
  totalProtein: number;
  totalCalories: number;
  shopping: string[];
  prepAhead: string[]; // list of things to prep night before
  meals: Meal[];
};

// ── SHAWARMA ROLL OPTIONS ────────────────────────────────────────────────────
// Analysis: All three are excellent daily options
// Paneer roll: ~22g protein, 380 kcal — great calcium + protein
// Falafel roll: ~14g protein, 340 kcal — high fibre, slightly lower protein, pair with extra curd
// Soya chunks roll: ~28g protein, 360 kcal — best protein of the three for muscle goals
// Key: use WHOLE WHEAT roti/wrap, load vegetables, light yogurt sauce (not mayo)
// Verdict: Rotate all three as lunch. Soya > Paneer > Falafel for protein goals.

const SHAWARMA_SWAP = {
  name: 'Protein Shawarma Roll',
  proteinG: 24,
  calories: 365,
  items: ['1 whole wheat roti or wrap', 'Filling: 120g paneer tikka OR soya chunks OR 4 falafel', 'Cabbage, tomato, onion, bell pepper shredded', 'Green chutney or light yogurt-tahini sauce', 'Pinch of chaat masala'],
};

const SHAWARMA_VARIANTS = [
  {
    name: 'Paneer Tikka Shawarma Roll',
    proteinG: 22,
    calories: 380,
    items: ['1 whole wheat roti/wrap','120g paneer (cubed, marinated in spices + curd)','Shredded cabbage, tomato, onion, bell pepper','Green chutney + 1 tbsp hung curd sauce','Chaat masala, lemon juice'],
  },
  {
    name: 'Soya Chunks Shawarma Roll',
    proteinG: 28,
    calories: 355,
    items: ['1 whole wheat roti/wrap','80g dry soya chunks (soaked + spiced)','Shredded cabbage, tomato, onion, capsicum','Garlic-yogurt sauce + green chutney','Cumin, red chilli, coriander seasoning'],
  },
  {
    name: 'Falafel Shawarma Roll',
    proteinG: 14,
    calories: 340,
    items: ['1 whole wheat roti/wrap','4 baked/air-fried falafel patties','Shredded cabbage, tomato, cucumber, onion','2 tbsp hummus + 1 tbsp yogurt-tahini sauce','Lemon juice, parsley, chilli flakes'],
  },
];

// ── 7 DAY TEMPLATES ──────────────────────────────────────────────────────────
const templates: Omit<DayDiet, 'day'>[] = [
  {
    theme: 'Moong Dal Power',
    totalProtein: 132, totalCalories: 2050,
    prepAhead: [
      'Soak moong dal overnight in water — ready to blend for chilla batter in the morning',
      'Soak rajma overnight if using dried — pressure cook and refrigerate for lunch',
      'Chop onion, tomato, green chilli and store in fridge for quick bhurji cooking',
      'Prepare lassi base (curd + water + cumin) and refrigerate',
    ],
    shopping: ['Moong dal 250g','Paneer 200g','Brown rice 100g','Rajma 200g','Onions 3','Tomatoes 3','Banana 2','Almonds 30g','Greek yogurt 200g','Curd 150g','Whole wheat flour 200g','Spinach 100g','Lemons 2','Ginger','Cumin seeds','Turmeric','Ghee','Green chilli','Coriander'],
    meals: [
      {
        time:'7:00 AM', label:'Breakfast', name:'Moong Dal Chilla + Paneer Bhurji',
        proteinG:28, calories:420,
        items:['2 moong dal chillas (crispy)','80g paneer bhurji','1 tsp ghee','Black coffee'],
        prepAhead: 'Soak moong dal in water before bed — blend in morning',
        recipe: {
          protein:28, calories:420, prepTime:'20 min',
          ingredients:['½ cup moong dal (soaked)','80g paneer crumbled','1 onion','1 tomato','¼ tsp turmeric','¼ tsp cumin','1 green chilli','½ tsp ginger','1 tsp oil','Salt, coriander'],
          steps:['Blend soaked dal with minimal water to thick batter. Add turmeric, cumin, ginger, chilli, salt.',
                 'Heat non-stick pan. Pour batter, spread thin. Cook 2–3 min until golden, flip 1 min.',
                 'Bhurji: sauté onion 2 min, add tomato and spices. Add paneer, stir 3 min. Garnish coriander.'],
        },
        swapOptions:[SHAWARMA_SWAP],
      },
      {
        time:'10:00 AM', label:'Snack', name:'Banana + Almonds',
        proteinG:6, calories:160,
        items:['1 banana','12 almonds','Water'],
        recipe:{ protein:6, calories:160, prepTime:'0 min', ingredients:['1 banana','12 almonds'], steps:['No prep — eat together for carb + fat + protein snack.'] },
      },
      {
        time:'1:00 PM', label:'Lunch', name:'Rajma Brown Rice Thali',
        proteinG:28, calories:580,
        items:['1 cup rajma curry','¾ cup brown rice','Mixed salad','1 glass lassi'],
        prepAhead: 'Soak rajma overnight. Pressure cook and refrigerate — reheat for lunch.',
        recipe:{
          protein:22, calories:380, prepTime:'35 min',
          ingredients:['1 cup rajma (soaked overnight)','2 tomatoes pureed','1 onion chopped','1 tsp ginger-garlic paste','1 tsp cumin','½ tsp garam masala','1 tsp coriander powder','1 tsp oil','Salt'],
          steps:['Pressure cook rajma 4–5 whistles.','Heat oil, add cumin, onion until golden.','Add ginger-garlic, tomato puree, cook until oil separates.','Add spices, cooked rajma + water. Simmer 10 min.'],
        },
        swapOptions: SHAWARMA_VARIANTS,
      },
      {
        time:'4:00 PM', label:'Pre-Workout', name:'Banana + Roasted Chana',
        proteinG:8, calories:160,
        items:['1 banana','2 tbsp roasted chana','Water'],
        recipe:{ protein:8, calories:160, prepTime:'0 min', ingredients:['1 banana','2 tbsp roasted chana'], steps:['Eat 30–45 min before workout. Simple carbs + protein.'] },
      },
      {
        time:'Post-Workout', label:'Recovery', name:'Whey Protein + Banana',
        proteinG:30, calories:220,
        items:['30g veg whey protein in 250ml water','1 banana'],
        recipe:{ protein:30, calories:220, prepTime:'2 min', ingredients:['30g veg whey protein','250ml cold water','1 banana'], steps:['Shake whey in water. Drink within 30 min of workout.','If no whey: 150g paneer + 1 glass whole milk immediately post-workout.'] },
      },
      {
        time:'8:00 PM', label:'Dinner', name:'Mixed Dal + Chapati + Sabzi',
        proteinG:18, calories:450,
        items:['1 cup mixed dal','2 whole wheat chapatis','1 cup seasonal sabzi','1 bowl curd'],
        prepAhead: 'Cook mixed dal in advance and refrigerate — reheat with fresh tadka',
        recipe:{
          protein:14, calories:280, prepTime:'25 min',
          ingredients:['½ cup toor dal','¼ cup masoor dal','1 onion','1 tomato','1 tsp cumin','½ tsp turmeric','1 dried red chilli','1 tsp ghee','Salt'],
          steps:['Boil both dals with turmeric until soft. Mash lightly.','Heat ghee, add cumin and dried chilli. Add onion until golden, add tomato.','Pour tadka over dal, simmer 5 min.'],
        },
      },
    ],
  },
  {
    theme: 'Oats & Tofu Day',
    totalProtein: 136, totalCalories: 2070,
    prepAhead: [
      'Make overnight oats the night before — oats + milk + chia + honey in a jar, refrigerate',
      'Press tofu under a heavy plate for 30 min, cube and marinate in spices — refrigerate overnight',
      'Pre-cook brown rice and refrigerate — takes 35 min, saves lunch prep time',
      'Wash and sprout moong if using sprouts — takes 2 days, start 2 days ahead',
    ],
    shopping: ['Rolled oats 80g','Firm tofu 300g','Greek yogurt 200g','Chia seeds 2 tbsp','Banana 2','Peanut butter 2 tbsp','Chickpeas 200g','Spinach 150g','Bell pepper 1','Mushrooms 100g','Quinoa 80g','Flaxseeds 1 tbsp','Lemons 2','Curd 150g','Paneer 80g'],
    meals: [
      {
        time:'7:00 AM', label:'Breakfast', name:'Overnight Oats + Paneer',
        proteinG:26, calories:430,
        items:['1 cup oats (prepped overnight in milk)','2 tsp chia seeds','1 tsp honey','80g paneer cubes','Black coffee'],
        prepAhead: 'Mix oats + milk + chia + honey in jar, refrigerate overnight — zero morning effort',
        recipe:{
          protein:26, calories:430, prepTime:'5 min (night before)',
          ingredients:['80g rolled oats','250ml low-fat milk','2 tsp chia seeds','1 tsp honey','80g paneer cubed'],
          steps:['Night before: Mix oats + milk + chia + honey in jar. Seal and refrigerate.','Morning: Stir well. Add splash of milk if too thick. Top with paneer cubes.'],
        },
        swapOptions:[SHAWARMA_SWAP],
      },
      {
        time:'10:00 AM', label:'Snack', name:'Sprouted Moong Salad',
        proteinG:12, calories:150,
        items:['1 cup sprouted moong','½ tomato','¼ cucumber','Lemon + chaat masala'],
        recipe:{ protein:12, calories:150, prepTime:'5 min', ingredients:['1 cup moong sprouts','Tomato, cucumber, lemon, chaat masala, salt'], steps:['Mix all. Season. Eat fresh.'] },
      },
      {
        time:'1:00 PM', label:'Lunch', name:'Tofu Stir-fry + Dal + Rice',
        proteinG:32, calories:600,
        items:['150g tofu stir-fried with spinach + bell pepper','¾ cup brown rice','1 cup toor dal','1 glass lassi'],
        prepAhead: 'Marinate tofu the night before in soy + turmeric + pepper — refrigerate',
        recipe:{
          protein:22, calories:320, prepTime:'20 min',
          ingredients:['150g firm tofu (pressed, cubed)','1 bell pepper sliced','100g spinach','1 clove garlic','½ tsp soy sauce','¼ tsp black pepper','1 tsp oil','Salt'],
          steps:['Press and cube tofu. Heat oil, brown tofu 3 min each side.','Add garlic, bell pepper 2 min. Add spinach, wilt.','Add soy sauce, pepper, salt. Serve over rice.'],
        },
        swapOptions: SHAWARMA_VARIANTS,
      },
      {
        time:'4:00 PM', label:'Pre-Workout', name:'Rice Cakes + Peanut Butter',
        proteinG:8, calories:180,
        items:['2 plain rice cakes','2 tbsp natural peanut butter','Water'],
        recipe:{ protein:8, calories:180, prepTime:'2 min', ingredients:['2 rice cakes','2 tbsp peanut butter'], steps:['Spread peanut butter. Eat 30–45 min before workout.'] },
      },
      {
        time:'Post-Workout', label:'Recovery', name:'Greek Yogurt Bowl',
        proteinG:22, calories:200,
        items:['200g Greek yogurt','1 tbsp honey','½ banana sliced'],
        recipe:{ protein:22, calories:200, prepTime:'2 min', ingredients:['200g Greek yogurt','1 tbsp honey','½ banana'], steps:['Mix yogurt and honey. Top with banana. Eat immediately post-workout.'] },
      },
      {
        time:'8:00 PM', label:'Dinner', name:'Palak Paneer Light + Chapati',
        proteinG:20, calories:460,
        items:['1 cup light palak paneer (no cream)','2 chapatis','1 cup salad'],
        prepAhead: 'Blanch and blend spinach the night before — store purée in fridge',
        recipe:{
          protein:20, calories:320, prepTime:'25 min',
          ingredients:['150g paneer cubed','2 bunches spinach (blanched)','1 onion','2 garlic cloves','½ tsp cumin','¼ tsp garam masala','1 tbsp curd','1 tsp oil','Salt'],
          steps:['Blanch spinach 2 min, blend smooth.','Sauté onion + garlic golden. Add spinach purée, curd, spices. Simmer 5 min.','Add paneer, cook 3 min.'],
        },
      },
    ],
  },
  {
    theme: 'Paneer Tikka Day',
    totalProtein: 138, totalCalories: 2090,
    prepAhead: [
      'Marinate paneer tikka in curd + spices + lemon overnight — ready to grill in the morning or at lunch',
      'Soak chickpeas overnight if not using canned — pressure cook and refrigerate',
      'Cook quinoa and refrigerate — takes 15 min, use cold in salads or reheat',
      'Mix paneer paratha dough and refrigerate in cling wrap — rest 8 hrs for best texture',
    ],
    shopping: ['Paneer 300g','Curd 300g','Brown rice 100g','Chickpeas 200g','Quinoa 80g','Bell peppers 2','Onions 3','Tomatoes 3','Banana 2','Walnuts 30g','Makhana 30g','Whole wheat flour 200g','Garam masala','Red chilli powder','Lemon 3','Greek yogurt 200g'],
    meals: [
      {
        time:'7:00 AM', label:'Breakfast', name:'Paneer Paratha + Curd',
        proteinG:26, calories:440,
        items:['2 paneer-stuffed whole wheat parathas (light oil)','1 cup curd with cumin','Black coffee'],
        prepAhead: 'Prepare dough and paneer filling previous night — refrigerate separately, assemble and cook in morning',
        recipe:{
          protein:26, calories:440, prepTime:'20 min',
          ingredients:['100g whole wheat flour','80g paneer grated','¼ tsp cumin','¼ tsp ajwain','1 green chilli chopped','Salt','1 tsp oil for cooking'],
          steps:['Mix flour + water to soft dough. Rest 10 min (or overnight).','Mix grated paneer with cumin, ajwain, chilli, salt.','Roll dough, place filling in centre, seal and roll flat.','Cook on hot tawa with light oil — golden on both sides, 2 min each.'],
        },
        swapOptions:[SHAWARMA_SWAP],
      },
      {
        time:'10:00 AM', label:'Snack', name:'Walnuts + Greek Yogurt',
        proteinG:10, calories:180,
        items:['150g Greek yogurt','6 walnut halves','1 tsp honey'],
        recipe:{ protein:10, calories:180, prepTime:'2 min', ingredients:['150g Greek yogurt','6 walnut halves','1 tsp honey'], steps:['Mix yogurt and honey. Top with walnuts.'] },
      },
      {
        time:'1:00 PM', label:'Lunch', name:'Paneer Tikka Shawarma Roll',
        proteinG:36, calories:620,
        items:['Paneer tikka shawarma roll (whole wheat roti)','½ cup boiled chana on side','Salad','1 glass lassi'],
        prepAhead: 'Paneer marinates overnight — just grill/pan-fry at lunchtime',
        recipe:{
          protein:28, calories:380, prepTime:'45 min (10 min if marinated)',
          ingredients:['150g paneer cubed','3 tbsp curd','1 tsp ginger-garlic paste','½ tsp cumin','½ tsp red chilli','¼ tsp turmeric','Lemon juice','1 whole wheat roti','Cabbage, tomato, onion shredded','Green chutney'],
          steps:['Mix curd + spices + lemon. Coat paneer. Marinate 30 min (or overnight).','Grill/pan-fry on high heat until charred at edges — 2 min each side.','Lay roti flat, spread green chutney, add paneer + shredded vegetables.','Roll tightly. Serve with curd dip or extra chutney.'],
        },
        swapOptions: SHAWARMA_VARIANTS,
      },
      {
        time:'4:00 PM', label:'Pre-Workout', name:'Makhana + Banana',
        proteinG:6, calories:150,
        items:['1 cup roasted makhana','1 banana'],
        recipe:{ protein:6, calories:150, prepTime:'8 min', ingredients:['1 cup makhana','½ tsp ghee','Salt, black pepper'], steps:['Heat ghee. Roast makhana on low heat 8 min until crispy. Season.'] },
      },
      {
        time:'Post-Workout', label:'Recovery', name:'Paneer + Milk Shake',
        proteinG:28, calories:240,
        items:['100g paneer','1 glass cold milk','1 banana','1 tsp honey'],
        recipe:{ protein:28, calories:240, prepTime:'3 min', ingredients:['100g paneer','250ml cold milk','1 banana','1 tsp honey'], steps:['Blend all until smooth. Drink within 30 min post-workout.'] },
      },
      {
        time:'8:00 PM', label:'Dinner', name:'Chana Masala + Chapati',
        proteinG:16, calories:430,
        items:['1 cup chana masala','2 chapatis','1 cup salad','Buttermilk'],
        prepAhead: 'Boil chickpeas and refrigerate — just make the masala gravy fresh',
        recipe:{
          protein:16, calories:280, prepTime:'30 min',
          ingredients:['1 cup chickpeas (soaked + cooked)','2 tomatoes pureed','1 onion','1 tsp ginger-garlic paste','1 tsp chole masala','½ tsp turmeric','1 tsp oil','Salt','Lemon'],
          steps:['Heat oil, brown onion. Add ginger-garlic. Add tomato purée, cook until oil separates.','Add chole masala, turmeric, salt. Add chickpeas + water. Simmer 10 min.','Squeeze lemon before serving.'],
        },
      },
    ],
  },
  {
    theme: 'Soya Chunks Day',
    totalProtein: 140, totalCalories: 2060,
    prepAhead: [
      'Soak soya chunks in hot water for 1 hour, squeeze dry, marinate in spices — refrigerate overnight',
      'Make dosa batter in advance if using from scratch — needs 6–8 hrs fermentation',
      'Cook toor dal and refrigerate — quick to reheat with fresh tadka',
      'Make falafel mix from chickpeas and refrigerate as patties — fry/bake next day',
    ],
    shopping: ['Soya chunks 150g (dry)','Dosa batter 400g','Paneer 100g','Greek yogurt 200g','Banana 2','Dates 3','Peanuts 30g','Brown rice 80g','Curd 200g','Lemon 2','Toor dal 100g','Spinach 200g','Bell pepper 1','Garam masala','Soy sauce','Chickpeas 200g for falafel'],
    meals: [
      {
        time:'7:00 AM', label:'Breakfast', name:'Ragi Dosa + Sambhar',
        proteinG:18, calories:380,
        items:['2 medium ragi dosas','1 cup vegetable sambhar','1 tbsp coconut chutney','Black coffee'],
        prepAhead: 'Sambhar vegetables can be chopped and dal cooked the night before — reheat and add tadka in morning',
        recipe:{
          protein:18, calories:380, prepTime:'25 min',
          ingredients:['400g ragi dosa batter','½ cup toor dal for sambhar','Mixed vegetables (carrot, tomato, drumstick)','1 tsp sambhar powder','Mustard seeds, curry leaves','1 tsp oil'],
          steps:['Cook dal + vegetables until soft. Add sambhar powder, mustard + curry leaf tadka. Simmer 10 min.','Heat tawa on high. Pour batter, spread in circles. Cook until edges crisp. Fold and serve.'],
        },
        swapOptions:[SHAWARMA_SWAP],
      },
      {
        time:'10:00 AM', label:'Snack', name:'Paneer Cubes + Green Tea',
        proteinG:14, calories:130,
        items:['80g raw paneer with black pepper + lemon','1 cup green tea'],
        recipe:{ protein:14, calories:130, prepTime:'2 min', ingredients:['80g paneer','Black pepper','Lemon juice','Chaat masala'], steps:['Cut paneer. Drizzle lemon, sprinkle pepper and chaat masala. Eat fresh.'] },
      },
      {
        time:'1:00 PM', label:'Lunch', name:'Soya Chunks Shawarma Roll',
        proteinG:34, calories:600,
        items:['Soya chunks shawarma roll (whole wheat roti)','½ cup dal on side','Salad','1 glass lassi'],
        prepAhead: 'Soak and marinate soya chunks overnight — cook and roll at lunch in 10 min',
        recipe:{
          protein:28, calories:360, prepTime:'15 min (if soaked overnight)',
          ingredients:['80g dry soya chunks (soaked in hot water, squeezed)','1 tsp ginger-garlic paste','½ tsp cumin','½ tsp red chilli','¼ tsp garam masala','1 tsp soy sauce','1 tsp oil','1 whole wheat roti/wrap','Shredded cabbage, tomato, onion, capsicum','Garlic-yogurt sauce or green chutney'],
          steps:['Squeeze water from soaked soya. Mix with ginger-garlic, cumin, chilli, garam masala, soy sauce.','Heat oil in pan. Cook soya on high heat 5–6 min until slightly charred and fragrant.','Warm roti. Spread sauce, add soya and vegetables. Roll tightly.','Serve with extra chutney or curd dip.'],
        },
        swapOptions: SHAWARMA_VARIANTS,
      },
      {
        time:'4:00 PM', label:'Pre-Workout', name:'Dates + Peanuts',
        proteinG:6, calories:155,
        items:['3 Medjool dates','30g roasted peanuts','Water'],
        recipe:{ protein:6, calories:155, prepTime:'0 min', ingredients:['3 dates','30g roasted peanuts'], steps:['Eat 30 min pre-workout. Quick energy + sustained fuel.'] },
      },
      {
        time:'Post-Workout', label:'Recovery', name:'Whey Protein Shake',
        proteinG:30, calories:200,
        items:['30g veg whey in 250ml water','Optional: 1 banana'],
        recipe:{ protein:30, calories:200, prepTime:'2 min', ingredients:['30g whey protein','250ml cold water'], steps:['Shake. Drink within 30 min.'] },
      },
      {
        time:'8:00 PM', label:'Dinner', name:'Moong Dal + Vegetables + Chapati',
        proteinG:16, calories:430,
        items:['1 cup moong dal','1 cup stir-fried vegetables','2 chapatis','1 bowl curd'],
        prepAhead: 'Cook moong dal and refrigerate — reheat in 5 min',
        recipe:{
          protein:16, calories:300, prepTime:'20 min',
          ingredients:['½ cup moong dal','1 cup mixed vegetables (broccoli, mushroom, carrot)','1 tsp cumin','¼ tsp turmeric','1 tsp oil','Salt'],
          steps:['Cook moong dal with turmeric + water until soft.','Stir-fry vegetables with cumin and spices 5–7 min.','Serve together with chapati and curd.'],
        },
      },
    ],
  },
  {
    theme: 'Chole & Quinoa Day',
    totalProtein: 134, totalCalories: 2060,
    prepAhead: [
      'Soak chickpeas overnight — pressure cook and refrigerate for both lunch and dinner',
      'Cook quinoa and refrigerate — stays fresh 3 days, use in bowls or salads',
      'Mix and refrigerate energy balls (dates + oats + peanut butter) — grab as pre-workout snack',
      'Prep overnight oats or chia pudding in jar — refrigerate before bed',
    ],
    shopping: ['Chickpeas 200g','Quinoa 150g','Paneer 150g','Greek yogurt 200g','Banana 2','Sweet potato 1','Peanut butter 2 tbsp','Almonds 25g','Curd 200g','Whole wheat flour 150g','Tomatoes 3','Onions 2','Spinach 100g','Makhana 30g','Dates 5','Rolled oats 100g'],
    meals: [
      {
        time:'7:00 AM', label:'Breakfast', name:'Greek Yogurt Power Bowl',
        proteinG:22, calories:390,
        items:['200g Greek yogurt','1 tbsp honey','2 tbsp flaxseeds','6 walnuts','Pomegranate seeds','Black coffee'],
        recipe:{ protein:22, calories:390, prepTime:'3 min', ingredients:['200g Greek yogurt','1 tbsp honey','2 tbsp flaxseeds','6 walnut halves','3 tbsp pomegranate seeds'], steps:['Layer yogurt in bowl. Drizzle honey.','Top with flaxseeds, walnuts, pomegranate seeds.'] },
        swapOptions:[SHAWARMA_SWAP],
      },
      {
        time:'10:00 AM', label:'Snack', name:'Roasted Makhana',
        proteinG:5, calories:120,
        items:['1 cup roasted makhana','Pinch of black salt + pepper'],
        recipe:{ protein:5, calories:120, prepTime:'10 min', ingredients:['1 cup makhana','½ tsp ghee','Black salt, pepper, optional chilli'], steps:['Heat ghee. Add makhana. Roast on low heat 8 min until crispy. Season.'] },
      },
      {
        time:'1:00 PM', label:'Lunch', name:'Rajma Quinoa Bowl',
        proteinG:32, calories:620,
        items:['1 cup rajma curry','¾ cup cooked quinoa','Mixed salad','1 glass lassi'],
        prepAhead: 'Cook quinoa and rajma previous night — assemble cold bowl at lunch in 3 min',
        recipe:{
          protein:28, calories:420, prepTime:'15 min',
          ingredients:['¾ cup dry quinoa','1 cup rajma (cooked)','Lemon juice','Cucumber, tomato, onion for salad'],
          steps:['Rinse quinoa, cook in 1.5x water 12 min until absorbed. Fluff.','Serve rajma curry over quinoa. Add salad with lemon dressing.'],
        },
        swapOptions: SHAWARMA_VARIANTS,
      },
      {
        time:'4:00 PM', label:'Pre-Workout', name:'Sweet Potato + Peanut Butter',
        proteinG:7, calories:165,
        items:['1 medium sweet potato (boiled)','1 tbsp peanut butter'],
        prepAhead: 'Boil or microwave sweet potato — refrigerate and eat cold with peanut butter',
        recipe:{ protein:7, calories:165, prepTime:'15 min', ingredients:['1 sweet potato','1 tbsp peanut butter'], steps:['Boil sweet potato. Eat with peanut butter. Excellent pre-workout energy.'] },
      },
      {
        time:'Post-Workout', label:'Recovery', name:'Paneer Smoothie',
        proteinG:26, calories:230,
        items:['100g paneer','1 glass cold milk','1 banana','1 tsp honey'],
        recipe:{ protein:26, calories:230, prepTime:'3 min', ingredients:['100g paneer','250ml cold milk','1 banana','1 tsp honey'], steps:['Blend all until smooth. Drink immediately post-workout.'] },
      },
      {
        time:'8:00 PM', label:'Dinner', name:'Dal Tadka + Spinach Sabzi + Chapati',
        proteinG:16, calories:430,
        items:['1 cup dal tadka','1 cup palak sabzi','1 chapati','1 bowl curd'],
        recipe:{
          protein:16, calories:300, prepTime:'20 min',
          ingredients:['½ cup toor dal','100g spinach','1 tsp ghee','Cumin, garlic, dried chilli','Turmeric, salt'],
          steps:['Cook dal with turmeric until soft. Prepare tadka with ghee, cumin, garlic, chilli. Pour over dal.','Wilt spinach with garlic and pinch of salt.'],
        },
      },
    ],
  },
  {
    theme: 'Poha & Paneer Day',
    totalProtein: 131, totalCalories: 2030,
    prepAhead: [
      'Falafel mix: blend chickpeas with herbs + spices, form into patties, refrigerate overnight — bake/air-fry at lunch',
      'Pre-chop all vegetables (onion, tomato, capsicum) for poha — refrigerate in zip-lock',
      'Prepare chia pudding in jar with milk + honey — refrigerate overnight',
      'Cook mixed dal and refrigerate',
    ],
    shopping: ['Poha thick 80g','Paneer 250g','Peanuts 50g','Brown rice 80g','Toor dal 100g','Banana 2','Greek yogurt 200g','Curd 200g','Tomatoes 2','Onions 2','Bell pepper 1','Carrots 2','Chickpeas 200g for falafel','Whole wheat flour 200g','Almonds 25g','Dates 2','Lemon 2','Tahini 2 tbsp'],
    meals: [
      {
        time:'7:00 AM', label:'Breakfast', name:'Poha + Peanuts + Paneer',
        proteinG:22, calories:400,
        items:['1 cup poha with peanuts and vegetables','80g paneer cubes','Black coffee'],
        recipe:{
          protein:22, calories:400, prepTime:'15 min',
          ingredients:['80g thick poha','30g peanuts','½ onion','½ tomato','1 green chilli','½ tsp mustard seeds','¼ tsp turmeric','Curry leaves','Lemon juice','Salt, coriander'],
          steps:['Rinse poha under cold water, drain. It softens immediately.','Heat oil, add mustard seeds. When they pop, add curry leaves, chilli, onion. Cook 2 min.','Add tomato, turmeric, cook 1 min. Add peanuts and poha. Mix gently 2 min.','Squeeze lemon. Serve with paneer cubes on side.'],
        },
        swapOptions:[SHAWARMA_SWAP],
      },
      {
        time:'10:00 AM', label:'Snack', name:'Chia Pudding',
        proteinG:8, calories:160,
        items:['3 tbsp chia seeds in 200ml milk','1 tsp honey','(Prepared night before)'],
        prepAhead: 'Mix chia + milk + honey in jar the night before — refrigerate, zero morning effort',
        recipe:{ protein:8, calories:160, prepTime:'5 min + overnight', ingredients:['3 tbsp chia seeds','200ml low-fat milk','1 tsp honey'], steps:['Mix chia seeds in milk with honey. Refrigerate overnight. Stir in morning.'] },
      },
      {
        time:'1:00 PM', label:'Lunch', name:'Falafel Shawarma Roll',
        proteinG:28, calories:580,
        items:['Falafel shawarma roll (whole wheat roti)','Hummus + yogurt-tahini dip','Salad','Buttermilk'],
        prepAhead: 'Make falafel patties night before from soaked chickpeas — bake fresh at lunch time',
        recipe:{
          protein:18, calories:340, prepTime:'30 min (10 if patties are prepped)',
          ingredients:['1 cup chickpeas (soaked + drained)','2 tbsp chickpea flour','1 garlic clove','1 tsp cumin','½ tsp coriander','Parsley/coriander leaves','Salt','1 whole wheat roti','Shredded cabbage, tomato, cucumber, onion','2 tbsp hummus + 1 tbsp yogurt-tahini sauce'],
          steps:['Blend chickpeas coarsely. Add chickpea flour, garlic, cumin, coriander, herbs, salt. Do NOT over-blend.','Form into round patties. Refrigerate 30 min to firm up.','Bake at 200°C for 20 min (flip halfway) or air-fry at 190°C for 14 min.','Lay roti flat. Spread hummus, add falafel and vegetables. Drizzle tahini-yogurt sauce. Roll tight.'],
        },
        swapOptions: SHAWARMA_VARIANTS,
      },
      {
        time:'4:00 PM', label:'Pre-Workout', name:'Banana + Almonds',
        proteinG:6, calories:155,
        items:['1 banana','12 almonds'],
        recipe:{ protein:6, calories:155, prepTime:'0 min', ingredients:['1 banana','12 almonds'], steps:['No prep needed.'] },
      },
      {
        time:'Post-Workout', label:'Recovery', name:'Whey Protein Shake',
        proteinG:30, calories:200,
        items:['30g veg whey in 250ml water'],
        recipe:{ protein:30, calories:200, prepTime:'2 min', ingredients:['30g whey protein','250ml cold water'], steps:['Shake and drink within 30 min of workout.'] },
      },
      {
        time:'8:00 PM', label:'Dinner', name:'Vegetable Khichdi + Curd',
        proteinG:14, calories:390,
        items:['1 bowl moong dal khichdi with vegetables','1 cup curd','Salad'],
        prepAhead: 'Khichdi can be cooked in advance and refrigerated — reheat gently with a splash of water',
        recipe:{
          protein:14, calories:280, prepTime:'25 min',
          ingredients:['½ cup moong dal','½ cup brown rice','1 carrot, ½ cup peas','½ tsp cumin','¼ tsp turmeric','1 tsp ghee','Salt','3 cups water'],
          steps:['Rinse dal and rice. Heat ghee in pressure cooker. Add cumin, vegetables. Sauté 1 min.','Add dal, rice, turmeric, salt, water. Pressure cook 3 whistles. Release. Stir to porridge texture.'],
        },
      },
    ],
  },
  {
    theme: 'High Protein Sunday',
    totalProtein: 140, totalCalories: 2100,
    prepAhead: [
      'Soak moong dal overnight for Sunday chilla batter',
      'Marinate soya chunks or paneer for Sunday\'s roll',
      'Pre-cook extra rajma, dal, or quinoa for the coming week — batch cook saves daily effort',
      'Prepare energy balls (dates + oats + peanut butter) — will last the whole week in fridge',
    ],
    shopping: ['Paneer 300g','Tofu 200g','Greek yogurt 300g','Quinoa 100g','Brown rice 80g','Chickpeas 200g','Banana 2','Dates 3','Peanut butter 2 tbsp','Milk 500ml','Honey 1 tbsp','Spinach 100g','Onions 2','Tomatoes 2','Almonds 30g','Walnuts 20g','Lemon 2','Moong dal 100g'],
    meals: [
      {
        time:'7:00 AM', label:'Breakfast', name:'Triple Protein Breakfast',
        proteinG:32, calories:460,
        items:['3 moong dal chillas','100g paneer bhurji','1 glass low-fat milk','Black coffee'],
        prepAhead: 'Soak moong dal overnight — batter takes 5 min to blend in morning',
        recipe:{
          protein:32, calories:460, prepTime:'25 min',
          ingredients:['¾ cup moong dal (soaked)','100g paneer crumbled','1 onion','1 tomato','½ tsp each cumin, turmeric, red chilli','1 tsp oil','Salt, coriander'],
          steps:['Blend dal to thick batter. Make 3 chillas on hot tawa.','Bhurji: sauté onion 2 min, add spices, tomato. Add paneer, stir 3 min.','Serve together with cold milk.'],
        },
        swapOptions:[SHAWARMA_SWAP],
      },
      {
        time:'10:00 AM', label:'Snack', name:'Protein Shake + Fruit',
        proteinG:26, calories:200,
        items:['30g veg whey in 200ml milk','1 apple'],
        recipe:{ protein:26, calories:200, prepTime:'2 min', ingredients:['30g whey protein','200ml milk','1 apple'], steps:['Mix whey, drink. Eat apple alongside.'] },
      },
      {
        time:'1:00 PM', label:'Lunch', name:'Full Protein Thali',
        proteinG:34, calories:650,
        items:['1 cup dal','1 cup paneer sabzi','¾ cup brown rice or quinoa','1 chapati','Salad','Lassi'],
        recipe:{
          protein:30, calories:500, prepTime:'30 min',
          ingredients:['150g paneer cubed','1 cup toor dal','Spinach or mixed vegetables','Onion, tomato, cumin, garam masala'],
          steps:['Cook dal with tadka.','Paneer sabzi: sauté onion, add tomato + spices. Add paneer + spinach. Cook 5 min.','Serve as full thali.'],
        },
        swapOptions: SHAWARMA_VARIANTS,
      },
      {
        time:'4:00 PM', label:'Pre-Workout', name:'Energy Balls',
        proteinG:8, calories:170,
        items:['2 date-oat energy balls','Water'],
        prepAhead: 'Make a batch of 8–10 energy balls and refrigerate — lasts the full week',
        recipe:{
          protein:8, calories:170, prepTime:'15 min + chill',
          ingredients:['4 dates (pitted)','3 tbsp rolled oats','1 tbsp peanut butter','1 tsp honey','Pinch of cardamom'],
          steps:['Blend all in food processor to sticky dough.','Roll into 4 balls. Refrigerate 30 min to firm. Eat 2 balls pre-workout.','Store remaining in fridge up to 1 week.'],
        },
      },
      {
        time:'Post-Workout', label:'Recovery', name:'Whey + Banana Smoothie',
        proteinG:32, calories:240,
        items:['30g whey protein','1 banana','250ml cold milk','1 tsp honey'],
        recipe:{ protein:32, calories:240, prepTime:'3 min', ingredients:['30g whey','1 banana','250ml cold milk','1 tsp honey'], steps:['Blend until smooth. Drink within 30 min.'] },
      },
      {
        time:'8:00 PM', label:'Dinner', name:'Light Tofu Curry + Chapati',
        proteinG:16, calories:370,
        items:['150g tofu in light tomato curry','1 chapati','Salad','1 bowl curd'],
        recipe:{
          protein:16, calories:260, prepTime:'20 min',
          ingredients:['150g firm tofu cubed','2 tomatoes pureed','1 onion','½ tsp cumin','¼ tsp turmeric','½ tsp coriander','1 tsp oil','Salt'],
          steps:['Sauté onion until golden. Add spices and tomato purée, cook until oil separates.','Add tofu gently. Simmer 8 min. Garnish with coriander.'],
        },
      },
    ],
  },
];

export const DIET_PLAN: DayDiet[] = Array.from({ length: 31 }, (_, i) => ({
  day: i + 1,
  ...templates[i % templates.length],
}));

// ── WEEKLY GROCERY LIST ──────────────────────────────────────────────────────
// Covers 7 days, grouped by category with quantities

export type GroceryCategory = {
  name: string; icon: string; color: string;
  items: { name: string; qty: string; note?: string }[];
};

export const WEEKLY_GROCERY: GroceryCategory[] = [
  {
    name: 'Proteins', icon: '🥩', color: '#ff6b35',
    items: [
      { name: 'Paneer', qty: '700g', note: 'For breakfast bhurji, tikka, sabzi, shawarma' },
      { name: 'Firm tofu', qty: '400g', note: 'For stir-fry, curry, shawarma' },
      { name: 'Soya chunks (dry)', qty: '150g', note: 'Soaks to ~4x weight — great protein' },
      { name: 'Veg whey protein', qty: '210g (7 scoops)', note: '30g post-workout daily' },
      { name: 'Chickpeas (dried)', qty: '300g', note: 'For chole, falafel, hummus' },
      { name: 'Rajma (dried)', qty: '200g', note: 'Soak night before use' },
    ],
  },
  {
    name: 'Dairy', icon: '🥛', color: '#4eb8ff',
    items: [
      { name: 'Low-fat curd', qty: '1kg', note: 'Daily use — dips, marinade, bhurji' },
      { name: 'Greek yogurt', qty: '400g', note: 'High protein — snacks and recovery' },
      { name: 'Low-fat milk', qty: '1.5 litres', note: 'Protein shakes, oats, haldi milk' },
      { name: 'Buttermilk (or make from curd)', qty: '500ml', note: 'Dinner drink' },
    ],
  },
  {
    name: 'Grains & Carbs', icon: '🌾', color: '#ffd60a',
    items: [
      { name: 'Whole wheat flour (atta)', qty: '1kg', note: 'Chapatis, parathas, wraps' },
      { name: 'Brown rice', qty: '500g', note: 'Lunch base — takes 30 min, batch cook' },
      { name: 'Quinoa', qty: '300g', note: 'Higher protein than rice, 15 min to cook' },
      { name: 'Rolled oats', qty: '500g', note: 'Breakfast + energy balls' },
      { name: 'Moong dal', qty: '500g', note: 'Chillas, dal, khichdi' },
      { name: 'Toor dal', qty: '300g', note: 'Dal tadka, sambhar' },
      { name: 'Masoor dal (red lentil)', qty: '200g', note: 'Quick cooking, 15 min' },
      { name: 'Poha (thick)', qty: '200g', note: 'Quick breakfast' },
      { name: 'Ragi dosa batter', qty: '500g', note: 'Ready-made or make from scratch' },
    ],
  },
  {
    name: 'Vegetables', icon: '🥦', color: '#30d158',
    items: [
      { name: 'Onions', qty: '8–10 medium', note: 'Every dish' },
      { name: 'Tomatoes', qty: '10 medium', note: 'Gravy base for all curries' },
      { name: 'Spinach / Palak', qty: '400g', note: 'Dal, sabzi, stir-fry' },
      { name: 'Bell peppers (mixed)', qty: '4', note: 'Stir-fry, shawarma filling' },
      { name: 'Mushrooms', qty: '200g', note: 'Sabzi, stir-fry' },
      { name: 'Cabbage', qty: '¼ head', note: 'Shawarma filling — shredded' },
      { name: 'Cucumber', qty: '3', note: 'Salads, roll filling' },
      { name: 'Carrots', qty: '4', note: 'Khichdi, stir-fry, salads' },
      { name: 'Sweet potato', qty: '2 medium', note: 'Pre-workout snack' },
    ],
  },
  {
    name: 'Fruits & Nuts', icon: '🍌', color: '#bf5af2',
    items: [
      { name: 'Bananas', qty: '10–12', note: 'Pre/post workout daily' },
      { name: 'Almonds (raw)', qty: '200g', note: 'Snacks, 12/day' },
      { name: 'Walnuts', qty: '100g', note: '6 halves daily with yogurt' },
      { name: 'Dates (Medjool)', qty: '10–15', note: 'Energy balls, pre-workout' },
      { name: 'Roasted peanuts', qty: '150g', note: 'Poha, snack' },
      { name: 'Makhana (fox nuts)', qty: '150g', note: 'Pre-workout snack — roast in ghee' },
      { name: 'Chia seeds', qty: '100g', note: 'Overnight oats, pudding' },
      { name: 'Flaxseeds (ground)', qty: '100g', note: 'Yogurt bowl, oats' },
      { name: 'Natural peanut butter', qty: '250g', note: 'Rice cakes, energy balls, smoothie' },
    ],
  },
  {
    name: 'Aromatics & Condiments', icon: '🧄', color: '#5ac8fa',
    items: [
      { name: 'Ginger (fresh)', qty: '1 large piece', note: 'Grate fresh daily' },
      { name: 'Garlic', qty: '2 heads', note: 'Ginger-garlic paste, tadka' },
      { name: 'Green chilli', qty: '10–12', note: 'Chillas, bhurji, chutneys' },
      { name: 'Fresh coriander (cilantro)', qty: '2 bunches', note: 'Garnish, chutney' },
      { name: 'Lemons', qty: '8', note: 'Salads, roll dressing, dal' },
      { name: 'Green chutney', qty: 'Make fresh or buy 200ml', note: 'Rolls, chillas' },
      { name: 'Tahini (sesame paste)', qty: '100g', note: 'Falafel rolls — 1 jar lasts weeks' },
      { name: 'Soy sauce', qty: '1 bottle', note: 'Tofu and soya marinade' },
      { name: 'Ghee', qty: '100g', note: 'Cooking, makhana roasting' },
      { name: 'Cold-pressed oil', qty: '500ml', note: 'All cooking' },
      { name: 'Honey', qty: '200g', note: 'Oats, yogurt, smoothies' },
    ],
  },
  {
    name: 'Spices (keep stocked always)', icon: '🌿', color: 'rgba(255,255,255,0.4)',
    items: [
      { name: 'Cumin seeds', qty: 'Keep stocked' },
      { name: 'Turmeric powder', qty: 'Keep stocked' },
      { name: 'Red chilli powder', qty: 'Keep stocked' },
      { name: 'Coriander powder', qty: 'Keep stocked' },
      { name: 'Garam masala', qty: 'Keep stocked' },
      { name: 'Chole / Sambhar masala', qty: 'Keep stocked' },
      { name: 'Mustard seeds', qty: 'Keep stocked' },
      { name: 'Curry leaves (fresh or dried)', qty: 'Keep stocked' },
      { name: 'Dried red chilli', qty: 'Keep stocked' },
      { name: 'Ajwain (carom seeds)', qty: 'Keep stocked' },
      { name: 'Chaat masala', qty: 'Keep stocked' },
      { name: 'Black pepper', qty: 'Keep stocked' },
    ],
  },
];

// ── SHAWARMA INFO ───────────────────────────────────────────────────────────
export const SHAWARMA_INFO = {
  verdict: '✅ Yes — excellent daily lunch option',
  explanation: 'All three are nutritious, high-protein, and fit perfectly into a lean muscle plan at 35. Use whole wheat roti only, not maida. Load on vegetables and use a yogurt-based sauce instead of mayo.',
  options: [
    {
      name: 'Paneer Tikka Roll',
      protein: '22g', calories: '380', rating: '⭐⭐⭐⭐',
      pros: ['High protein + calcium', 'Great post-workout or lunch', 'Very satiating'],
      tip: 'Marinate overnight for best flavour. Grill rather than fry.',
    },
    {
      name: 'Soya Chunks Roll',
      protein: '28g', calories: '355', rating: '⭐⭐⭐⭐⭐',
      pros: ['Highest protein of all three', 'Lowest fat', 'Excellent for lean muscle at 35'],
      tip: 'Best for post-workout or lunch. Soya is a complete protein like meat.',
    },
    {
      name: 'Falafel Roll',
      protein: '14g', calories: '340', rating: '⭐⭐⭐',
      pros: ['High fibre', 'Heart healthy', 'Great flavour with tahini'],
      tip: 'Bake or air-fry, never deep-fry. Pair with extra hummus for more protein.',
    },
  ],
};
