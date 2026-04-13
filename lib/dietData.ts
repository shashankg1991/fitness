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
};

export type DayDiet = {
  day: number;
  theme: string;
  totalProtein: number;
  totalCalories: number;
  shopping: string[];
  meals: Meal[];
};

const makeRecipe = (ing: string[], steps: string[], p: number, cal: number, time: string): Recipe =>
  ({ ingredients: ing, steps, protein: p, calories: cal, prepTime: time });

// 7 unique day templates that repeat across 31 days
const templates: Omit<DayDiet, 'day'>[] = [
  {
    theme: 'Moong Dal Power', totalProtein: 132, totalCalories: 2050,
    shopping: ['Moong dal 250g','Paneer 200g','Brown rice 100g','Rajma 200g','Onions 3','Tomatoes 3','Banana 2','Almonds 30g','Greek yogurt 200g','Curd 150g','Whole wheat flour 200g','Mixed vegetables','Lemons 2','Ginger','Cumin seeds','Turmeric','Ghee 1 tsp','Green chilli','Coriander leaves'],
    meals: [
      { time:'7:00 AM', label:'Breakfast', name:'Moong Dal Chilla + Paneer Bhurji', proteinG:28, calories:420,
        items:['2 moong dal chillas (thick, crispy)','80g paneer bhurji (spiced)','1 tsp ghee on chillas','Black coffee or green tea'],
        recipe: makeRecipe(
          ['½ cup moong dal (soaked 4 hrs)','80g paneer crumbled','1 medium onion','1 tomato','¼ tsp turmeric','¼ tsp cumin','1 green chilli','½ tsp ginger paste','1 tsp oil','Salt and coriander'],
          ['Drain dal, blend with minimal water to a thick batter. Add turmeric, cumin, ginger, chilli, salt.','Heat non-stick pan on medium. Pour a ladle of batter, spread thin. Cook 2–3 min until golden underneath.','Flip and cook 1 min. Repeat for second chilla. Drizzle a little ghee on each.','For bhurji: sauté onion 2 min, add tomato, cook until soft. Add crumbled paneer and spices. Stir 3 min. Garnish with coriander.'],
          28, 420, '20 min') },
      { time:'10:00 AM', label:'Snack', name:'Banana + Almonds', proteinG:6, calories:160,
        items:['1 ripe banana','12 almonds (raw or roasted)','1 large glass of water'],
        recipe: makeRecipe(['1 banana','12 almonds'],['No prep needed — eat together for combined carb + fat + protein snack.'],6,160,'0 min') },
      { time:'1:00 PM', label:'Lunch', name:'Rajma Brown Rice Thali', proteinG:28, calories:580,
        items:['1 cup rajma curry','¾ cup cooked brown rice','Mixed salad (cucumber, tomato, onion, lemon)','1 glass lassi (no sugar, with cumin)'],
        recipe: makeRecipe(
          ['1 cup rajma (soaked overnight)','2 tomatoes pureed','1 onion finely chopped','1 tsp ginger-garlic paste','1 tsp cumin seeds','½ tsp garam masala','1 tsp coriander powder','1 tsp oil','Salt to taste'],
          ['Pressure cook soaked rajma for 4–5 whistles until soft. Reserve the water.','Heat oil in a pan. Add cumin, let splutter. Add onion and cook until golden (5 min).','Add ginger-garlic paste, cook 1 min. Add pureed tomato, cook until oil separates (8 min).','Add all spices, stir. Add cooked rajma with its water. Simmer 10–12 min. Adjust salt. Garnish with coriander.'],
          22, 380, '35 min') },
      { time:'4:00 PM', label:'Pre-Workout', name:'Banana + Roasted Chana', proteinG:8, calories:160,
        items:['1 banana','2 tbsp roasted chana','1 glass water'],
        recipe: makeRecipe(['1 banana','2 tbsp roasted chana'],['Eat 30–45 min before workout. Simple carbs from banana + protein from chana = ideal pre-workout.'],8,160,'0 min') },
      { time:'Post-Workout', label:'Recovery', name:'Whey Protein + Banana', proteinG:30, calories:220,
        items:['30g veg whey protein in 250ml water','1 banana (optional, for carb refuelling)'],
        recipe: makeRecipe(['30g vegetarian whey protein powder','250ml cold water','1 banana'],['Mix whey in water, shake well. Eat banana alongside. Consume within 30 min of finishing workout.','If no whey: 150g paneer + 1 glass whole milk immediately post-workout.'],30,220,'2 min') },
      { time:'8:00 PM', label:'Dinner', name:'Mixed Dal + Chapati + Sabzi', proteinG:18, calories:450,
        items:['1 cup mixed dal (toor + masoor)','2 whole wheat chapatis','1 cup seasonal sabzi','1 small bowl curd'],
        recipe: makeRecipe(
          ['½ cup toor dal','¼ cup masoor dal','1 onion','1 tomato','1 tsp cumin seeds','½ tsp turmeric','1 dried red chilli','1 tsp ghee','Salt'],
          ['Boil both dals together with turmeric and 2 cups water until very soft. Mash lightly.','Heat ghee in a small pan (tadka) — add cumin and dried chilli. Sizzle 30 sec.','Add onion, cook golden. Add ginger and tomato, cook until soft.','Pour tadka over dal, stir well, simmer 5 min. Season to taste.'],
          14, 280, '25 min') },
    ]
  },
  {
    theme: 'Oats & Tofu Day', totalProtein: 136, totalCalories: 2070,
    shopping: ['Rolled oats 80g','Firm tofu 300g','Greek yogurt 200g','Chia seeds 2 tbsp','Banana 2','Peanut butter 2 tbsp','Chickpeas 200g','Spinach 150g','Bell pepper 1','Mushrooms 100g','Quinoa 80g','Flaxseeds 1 tbsp','Lemons 2','Curd 150g','Paneer 80g','Coconut water 300ml'],
    meals: [
      { time:'7:00 AM', label:'Breakfast', name:'Protein Oats Bowl + Paneer', proteinG:26, calories:430,
        items:['1 cup oats cooked in low-fat milk','2 tsp chia seeds stirred in','1 tsp honey','80g paneer cubes on the side','Black coffee'],
        recipe: makeRecipe(
          ['80g rolled oats','250ml low-fat milk','2 tsp chia seeds','1 tsp honey','80g paneer cubed','Pinch of cardamom (optional)'],
          ['Bring milk to simmer. Add oats, stir and cook 4–5 min until thick and creamy.','Stir in chia seeds and cardamom. Remove from heat. Add honey.','Serve in a bowl with paneer cubes on the side. Add a sprinkle of cinnamon if desired.'],
          26, 430, '10 min') },
      { time:'10:00 AM', label:'Snack', name:'Sprouted Moong Salad', proteinG:12, calories:150,
        items:['1 cup sprouted moong','½ tomato diced','¼ cucumber diced','Lemon juice','Chaat masala','Fresh coriander'],
        recipe: makeRecipe(
          ['1 cup moong sprouts','½ tomato','¼ cucumber','1 tbsp lemon juice','¼ tsp chaat masala','Salt and coriander'],
          ['If desired, lightly steam sprouts 3 min. Cool completely.','Mix all vegetables with sprouts.','Add lemon, chaat masala, salt. Toss well and serve immediately.'],
          12, 150, '5 min') },
      { time:'1:00 PM', label:'Lunch', name:'Tofu Stir-fry + Dal + Rice', proteinG:32, calories:600,
        items:['150g firm tofu stir-fried with bell pepper and spinach','¾ cup brown rice','1 cup toor dal','1 glass lassi'],
        recipe: makeRecipe(
          ['150g firm tofu (pressed and cubed)','1 bell pepper sliced','100g spinach','1 clove garlic','½ tsp soy sauce','¼ tsp black pepper','1 tsp oil','Salt'],
          ['Press tofu between two plates to remove water, 15 min. Cut into cubes.','Heat oil in wok or pan. Add garlic 30 sec. Add tofu, let it brown on one side 3 min, flip.','Add bell pepper, stir-fry 2 min. Add spinach, stir until wilted.','Add soy sauce, pepper, salt. Toss and serve over rice.'],
          22, 320, '20 min') },
      { time:'4:00 PM', label:'Pre-Workout', name:'Peanut Butter Rice Cakes', proteinG:8, calories:180,
        items:['2 plain rice cakes','2 tbsp natural peanut butter','1 glass water or coconut water'],
        recipe: makeRecipe(['2 rice cakes','2 tbsp peanut butter'],['Spread peanut butter on rice cakes. Eat 30–45 min before workout.'],8,180,'2 min') },
      { time:'Post-Workout', label:'Recovery', name:'Greek Yogurt Recovery Bowl', proteinG:22, calories:200,
        items:['200g Greek yogurt','1 tbsp honey','½ banana sliced'],
        recipe: makeRecipe(['200g full-fat Greek yogurt','1 tbsp honey','½ banana'],['Mix yogurt with honey. Top with banana slices. Eat immediately post-workout.'],22,200,'2 min') },
      { time:'8:00 PM', label:'Dinner', name:'Palak Paneer Light + Chapati', proteinG:20, calories:460,
        items:['1 cup light palak paneer (no cream)','2 whole wheat chapatis','1 cup salad'],
        recipe: makeRecipe(
          ['150g paneer cubed','2 bunches spinach (blanched)','1 onion','2 garlic cloves','½ tsp cumin','¼ tsp garam masala','1 tbsp low-fat curd (no cream)','1 tsp oil','Salt'],
          ['Blanch spinach 2 min in boiling water. Drain and blend to smooth puree.','Heat oil, add cumin, then onion and garlic. Cook until golden.','Add spinach puree, curd, garam masala, salt. Stir well, simmer 5 min.','Add paneer cubes, cook 3 min. Serve with chapatis.'],
          20, 320, '25 min') },
    ]
  },
  {
    theme: 'Paneer Tikka Day', totalProtein: 138, totalCalories: 2090,
    shopping: ['Paneer 300g','Curd 300g','Brown rice 100g','Chickpeas 200g','Quinoa 80g','Bell peppers 2','Onions 3','Tomatoes 3','Banana 2','Walnuts 30g','Makhana 30g','Whole wheat flour 200g','Ginger-garlic paste','Garam masala','Red chilli powder','Coriander powder','Lemon 3','Greek yogurt 200g'],
    meals: [
      { time:'7:00 AM', label:'Breakfast', name:'Paneer Paratha + Curd', proteinG:26, calories:440,
        items:['2 paneer-stuffed whole wheat parathas (light oil)','1 cup curd with cumin','Black coffee'],
        recipe: makeRecipe(
          ['100g whole wheat flour','80g paneer grated','¼ tsp cumin','¼ tsp ajwain','½ green chilli chopped','Salt','1 tsp oil for cooking'],
          ['Mix flour with water to a soft dough. Rest 10 min.','Mix grated paneer with cumin, ajwain, chilli, salt for filling.','Roll dough into circle, place filling in centre, fold and seal, roll flat.','Cook on hot tawa with light oil until golden on both sides — 2 min per side.'],
          26, 440, '20 min') },
      { time:'10:00 AM', label:'Snack', name:'Walnuts + Greek Yogurt', proteinG:10, calories:180,
        items:['150g Greek yogurt','6 walnuts (halves)','1 tsp honey'],
        recipe: makeRecipe(['150g Greek yogurt','6 walnut halves','1 tsp honey'],['Mix yogurt with honey. Top with walnuts. Eat immediately.'],10,180,'2 min') },
      { time:'1:00 PM', label:'Lunch', name:'Paneer Tikka + Quinoa + Chana', proteinG:36, calories:620,
        items:['150g paneer tikka (grilled)','¾ cup quinoa','½ cup chana (boiled)','Mixed salad'],
        recipe: makeRecipe(
          ['150g paneer cubed','3 tbsp low-fat curd','1 tsp ginger-garlic paste','½ tsp cumin','½ tsp red chilli','¼ tsp turmeric','1 tsp lemon juice','Bell pepper and onion chunks'],
          ['Mix curd + all spices + lemon juice into marinade. Add paneer and veg. Marinate 30 min minimum.','Thread onto skewers alternating paneer and vegetables.','Grill in oven at 220°C for 12–15 min, turning halfway. Or use a non-stick pan on high heat.','Serve with mint chutney and onion rings.'],
          28, 380, '45 min') },
      { time:'4:00 PM', label:'Pre-Workout', name:'Makhana + Banana', proteinG:6, calories:150,
        items:['1 cup roasted makhana (fox nuts)','1 banana'],
        recipe: makeRecipe(['1 cup makhana','½ tsp ghee','Salt and black pepper'],['Heat ghee in pan, add makhana. Roast on low heat 5–8 min until crispy. Add salt and pepper.'],6,150,'8 min') },
      { time:'Post-Workout', label:'Recovery', name:'Paneer + Milk Shake', proteinG:28, calories:240,
        items:['100g paneer','1 glass full-fat milk','1 banana','1 tsp honey'],
        recipe: makeRecipe(['100g paneer','250ml cold milk','1 banana','1 tsp honey'],['Blend all ingredients until smooth. Drink immediately post-workout.','If no blender: eat paneer and drink milk separately.'],28,240,'3 min') },
      { time:'8:00 PM', label:'Dinner', name:'Chana Masala + Chapati', proteinG:16, calories:430,
        items:['1 cup chana masala','2 whole wheat chapatis','1 cup salad','1 glass buttermilk'],
        recipe: makeRecipe(
          ['1 cup chickpeas (soaked overnight)','2 tomatoes pureed','1 onion','1 tsp ginger-garlic paste','1 tsp chole masala','½ tsp turmeric','1 tsp oil','Salt','Lemon juice'],
          ['Pressure cook chickpeas 3–4 whistles. Drain, keep water.','Heat oil, add onion until golden. Add ginger-garlic, 1 min.','Add tomato puree, cook until oil separates. Add chole masala, turmeric, salt.','Add chickpeas + water. Simmer 10 min. Squeeze lemon before serving.'],
          16, 280, '30 min') },
    ]
  },
  {
    theme: 'Dosa & Tofu Day', totalProtein: 130, totalCalories: 2040,
    shopping: ['Dosa batter 400g (ragi or wheat)','Firm tofu 200g','Sambhar ingredients','Spinach 200g','Moong dal 150g','Greek yogurt 200g','Banana 2','Almonds 30g','Dates 3','Peanuts 30g','Brown rice 80g','Paneer 100g','Coconut chutney (ready)','Curd 200g','Lemon 2'],
    meals: [
      { time:'7:00 AM', label:'Breakfast', name:'Ragi Dosa + Sambhar', proteinG:18, calories:380,
        items:['2 medium ragi or wheat dosas','1 cup vegetable sambhar','1 tbsp coconut chutney','Black coffee'],
        recipe: makeRecipe(
          ['400g ragi dosa batter (or wheat-based)','½ cup toor dal for sambhar','Mixed vegetables (carrot, drumstick, tomato)','1 tsp sambhar powder','1 tsp oil','Mustard seeds','Curry leaves','Salt'],
          ['For sambhar: cook dal until soft. In separate pan, sauté mustard + curry leaves + vegetables 3 min. Add sambhar powder, cooked dal, water. Simmer 15 min.','For dosa: heat tawa on high until very hot. Pour ladle of batter, spread in circles. Cook until edges lift. Flip briefly or fold without flipping for soft texture.'],
          18, 380, '25 min') },
      { time:'10:00 AM', label:'Snack', name:'Paneer Cubes + Green Tea', proteinG:14, calories:130,
        items:['80g raw paneer with black pepper and lemon','1 cup green tea'],
        recipe: makeRecipe(['80g paneer','Black pepper','Lemon juice','Pinch of chaat masala'],['Cut paneer into cubes. Drizzle lemon, sprinkle pepper and chaat masala. Eat fresh.'],14,130,'2 min') },
      { time:'1:00 PM', label:'Lunch', name:'Tofu Palak + Brown Rice + Dal', proteinG:30, calories:590,
        items:['150g tofu in palak curry','¾ cup brown rice','1 cup moong dal','1 glass lassi'],
        recipe: makeRecipe(
          ['150g firm tofu cubed','150g spinach','1 onion','2 garlic cloves','1 tomato','½ tsp cumin','¼ tsp garam masala','1 tsp oil','Salt'],
          ['Blanch spinach, blend to puree. In pan, sauté onion and garlic until golden.','Add tomato, cook soft. Add spinach puree, spices, salt. Simmer 5 min.','Add tofu cubes. Simmer 5 more min. Serve with brown rice and moong dal.'],
          22, 380, '25 min') },
      { time:'4:00 PM', label:'Pre-Workout', name:'Dates + Peanuts', proteinG:6, calories:155,
        items:['3 Medjool dates','1 handful roasted peanuts (30g)','1 glass water'],
        recipe: makeRecipe(['3 dates','30g roasted peanuts'],['No prep needed. Dates give quick energy, peanuts provide sustained fuel. Eat 30 min pre-workout.'],6,155,'0 min') },
      { time:'Post-Workout', label:'Recovery', name:'Whey Protein Shake', proteinG:30, calories:200,
        items:['30g veg whey protein','250ml water or coconut water','Optional: 1 banana'],
        recipe: makeRecipe(['30g whey protein','250ml cold water'],['Shake or blend. Drink within 30 min of workout. Add banana for extra carbs if session was intense.'],30,200,'2 min') },
      { time:'8:00 PM', label:'Dinner', name:'Moong Dal + Vegetables + Chapati', proteinG:16, calories:430,
        items:['1 cup moong dal','1 cup stir-fried vegetables (broccoli, mushroom, carrot)','2 whole wheat chapatis','1 bowl curd'],
        recipe: makeRecipe(
          ['½ cup moong dal','1 cup mixed vegetables','1 tsp cumin','¼ tsp turmeric','½ tsp coriander powder','1 tsp oil','Salt'],
          ['Cook moong dal with turmeric and water until soft.','In separate pan, sauté cumin, add vegetables, cook 5–7 min with spices.','Serve dal with vegetables, chapati, and curd.'],
          16, 300, '20 min') },
    ]
  },
  {
    theme: 'Chole & Quinoa Day', totalProtein: 134, totalCalories: 2060,
    shopping: ['Chickpeas 200g','Quinoa 150g','Paneer 150g','Greek yogurt 200g','Banana 2','Sweet potato 1 medium','Peanut butter 2 tbsp','Almonds 25g','Curd 200g','Whole wheat flour 150g','Tomatoes 3','Onions 2','Ginger','Lemon 2','Spinach 100g','Makhana 30g'],
    meals: [
      { time:'7:00 AM', label:'Breakfast', name:'Greek Yogurt Power Bowl', proteinG:22, calories:390,
        items:['200g Greek yogurt','1 tbsp honey','2 tbsp flaxseeds','1 handful walnuts','Pomegranate seeds','Black coffee'],
        recipe: makeRecipe(
          ['200g Greek yogurt','1 tbsp honey','2 tbsp flaxseeds','6 walnut halves','3 tbsp pomegranate seeds'],
          ['No cooking needed. Layer yogurt in bowl, drizzle honey.','Top with flaxseeds, walnuts, and pomegranate seeds. Eat fresh.'],
          22, 390, '3 min') },
      { time:'10:00 AM', label:'Snack', name:'Roasted Makhana', proteinG:5, calories:120,
        items:['1 cup roasted makhana','Pinch of black salt and pepper'],
        recipe: makeRecipe(['1 cup makhana','½ tsp ghee','Black salt','Black pepper','Optional: pinch of chilli'],['Heat ½ tsp ghee in pan. Add makhana, roast on low heat stirring 8 min until crispy. Season.'],5,120,'10 min') },
      { time:'1:00 PM', label:'Lunch', name:'Rajma Quinoa Bowl', proteinG:32, calories:620,
        items:['1 cup rajma curry','¾ cup cooked quinoa','1 cup mixed salad','1 glass lassi'],
        recipe: makeRecipe(
          ['¾ cup dry quinoa','1 cup rajma (cooked)','Lemon juice','Cucumber, tomato, onion for salad'],
          ['Rinse quinoa, cook in 1.5x water until absorbed (12 min). Fluff with fork.','Serve rajma curry over quinoa. Add salad on the side with lemon dressing.'],
          28, 420, '15 min') },
      { time:'4:00 PM', label:'Pre-Workout', name:'Sweet Potato + Peanut Butter', proteinG:7, calories:165,
        items:['1 medium sweet potato (boiled)','1 tbsp peanut butter'],
        recipe: makeRecipe(['1 sweet potato','1 tbsp peanut butter'],['Boil or microwave sweet potato. Eat with peanut butter. Excellent pre-workout energy.'],7,165,'15 min') },
      { time:'Post-Workout', label:'Recovery', name:'Paneer Smoothie', proteinG:26, calories:230,
        items:['100g paneer','1 glass cold milk','1 banana','1 tsp honey'],
        recipe: makeRecipe(['100g paneer','250ml cold milk','1 banana','1 tsp honey','Pinch of cardamom'],['Blend all until smooth and creamy. Drink immediately post-workout.'],26,230,'3 min') },
      { time:'8:00 PM', label:'Dinner', name:'Dal Tadka + Spinach Sabzi + Chapati', proteinG:16, calories:430,
        items:['1 cup dal tadka','1 cup palak sabzi','1 whole wheat chapati','1 bowl curd'],
        recipe: makeRecipe(
          ['½ cup toor dal','100g spinach','1 tsp ghee','Cumin, garlic, dried chilli','Turmeric, salt'],
          ['Cook dal with turmeric until very soft. Prepare tadka with ghee, cumin, garlic, dried chilli.','Pour tadka over dal, simmer 5 min.','Separately wilt spinach with garlic and pinch of salt.'],
          16, 300, '20 min') },
    ]
  },
  {
    theme: 'Poha & Paneer Day', totalProtein: 131, totalCalories: 2030,
    shopping: ['Poha (flattened rice) 80g','Paneer 250g','Peanuts 50g','Brown rice 80g','Toor dal 100g','Banana 2','Greek yogurt 200g','Curd 200g','Tomatoes 2','Onions 2','Bell pepper 1','Carrots 2','Peas ½ cup','Whole wheat flour 200g','Almonds 25g','Dates 2','Lemon 2'],
    meals: [
      { time:'7:00 AM', label:'Breakfast', name:'Poha + Peanuts + Paneer', proteinG:22, calories:400,
        items:['1 cup poha with peanuts and vegetables','80g paneer cubes (lightly spiced)','Black coffee'],
        recipe: makeRecipe(
          ['80g poha (thick)','30g peanuts','½ onion','½ tomato','1 green chilli','½ tsp mustard seeds','¼ tsp turmeric','Curry leaves','Lemon juice','Salt and coriander'],
          ['Rinse poha under cold water, drain. It softens immediately — do not soak.','Heat oil, add mustard seeds. When they pop add curry leaves, chilli, onion. Cook 2 min.','Add tomato, turmeric, cook 1 min. Add peanuts and softened poha. Mix gently 2 min.','Squeeze lemon, add salt and coriander. Serve with paneer cubes on the side.'],
          22, 400, '15 min') },
      { time:'10:00 AM', label:'Snack', name:'Chia Pudding', proteinG:8, calories:160,
        items:['3 tbsp chia seeds in 200ml low-fat milk','1 tsp honey','(Prepared night before)'],
        recipe: makeRecipe(
          ['3 tbsp chia seeds','200ml low-fat milk (or curd)','1 tsp honey','Optional: cardamom'],
          ['Mix chia seeds in milk with honey. Stir well. Refrigerate overnight.','In morning, stir again. Add a splash of milk if too thick. Eat fresh.'],
          8, 160, '5 min + overnight') },
      { time:'1:00 PM', label:'Lunch', name:'Paneer Bhurji + Dal + Chapati', proteinG:32, calories:580,
        items:['150g paneer bhurji','1 cup dal','2 whole wheat chapatis','Salad'],
        recipe: makeRecipe(
          ['150g paneer crumbled','1 onion','2 tomatoes','1 green chilli','½ tsp cumin','½ tsp red chilli powder','¼ tsp turmeric','1 tsp oil','Salt and coriander'],
          ['Heat oil, add cumin, then onion. Cook 3 min until golden.','Add tomato and chilli. Cook until soft, oil separates.','Add turmeric, red chilli, salt. Add crumbled paneer. Stir and mix 3 min.','Garnish with coriander. Serve with dal and chapatis.'],
          24, 360, '20 min') },
      { time:'4:00 PM', label:'Pre-Workout', name:'Banana + Almonds', proteinG:6, calories:155,
        items:['1 banana','12 almonds'],
        recipe: makeRecipe(['1 banana','12 almonds'],['No prep needed. Eat together for the ideal pre-workout snack.'],6,155,'0 min') },
      { time:'Post-Workout', label:'Recovery', name:'Whey Protein Shake', proteinG:30, calories:200,
        items:['30g veg whey protein in water'],
        recipe: makeRecipe(['30g whey protein','250ml cold water'],['Shake and drink within 30 min of workout.'],30,200,'2 min') },
      { time:'8:00 PM', label:'Dinner', name:'Vegetable Khichdi + Curd', proteinG:14, calories:390,
        items:['1 bowl moong dal khichdi with vegetables','1 cup curd','1 cup salad'],
        recipe: makeRecipe(
          ['½ cup moong dal','½ cup brown rice','1 carrot chopped','½ cup peas','½ tsp cumin','¼ tsp turmeric','1 tsp ghee','Salt','3 cups water'],
          ['Rinse dal and rice together well.','Heat ghee in pressure cooker. Add cumin, then vegetables. Sauté 1 min.','Add dal, rice, turmeric, salt, and water.','Pressure cook 3 whistles. Release, stir to porridge texture. Serve with curd.'],
          14, 280, '25 min') },
    ]
  },
  {
    theme: 'High Protein Sunday', totalProtein: 140, totalCalories: 2100,
    shopping: ['Paneer 300g','Tofu 200g','Greek yogurt 300g','Quinoa 100g','Brown rice 80g','Chickpeas 200g','Banana 2','Dates 3','Peanut butter 2 tbsp','Whole milk 500ml','Honey 1 tbsp','Mixed vegetables','Onions 2','Tomatoes 2','Spinach 100g','Almonds 30g','Walnuts 20g','Lemon 2','Ginger'],
    meals: [
      { time:'7:00 AM', label:'Breakfast', name:'Triple Protein Breakfast', proteinG:32, calories:460,
        items:['3 moong dal chillas','100g paneer bhurji','1 glass low-fat milk','Black coffee'],
        recipe: makeRecipe(
          ['¾ cup moong dal soaked','100g paneer crumbled','1 onion','1 tomato','½ tsp each: cumin, turmeric, red chilli','1 tsp oil','Salt, coriander, ginger'],
          ['Make chilla batter from soaked dal. Cook 3 chillas on hot tawa — crispy and golden.','For bhurji: sauté onion 2 min, add spices, tomato. Cook until soft.','Add paneer, stir and cook 3 min. Serve together with a glass of cold milk.'],
          32, 460, '25 min') },
      { time:'10:00 AM', label:'Snack', name:'Protein Shake + Fruit', proteinG:26, calories:200,
        items:['30g veg whey in milk or water','1 apple or pear'],
        recipe: makeRecipe(['30g whey protein','200ml milk or water','1 apple'],['Mix whey, drink. Eat fruit alongside.'],26,200,'2 min') },
      { time:'1:00 PM', label:'Lunch', name:'Full Protein Thali', proteinG:34, calories:650,
        items:['1 cup dal','1 cup paneer sabzi','¾ cup brown rice or quinoa','1 chapati','Salad','Lassi'],
        recipe: makeRecipe(
          ['150g paneer cubed','1 cup dal (toor or masoor)','Spinach or mixed vegetables','Onion, tomato, spices'],
          ['Cook dal with tadka as usual.','For paneer sabzi: sauté onion, add tomato and spices. Add paneer + spinach. Cook 5 min.','Serve everything together as a full thali.'],
          30, 500, '30 min') },
      { time:'4:00 PM', label:'Pre-Workout', name:'Energy Balls', proteinG:8, calories:170,
        items:['2 homemade date-oat energy balls','1 glass water'],
        recipe: makeRecipe(
          ['4 dates (pitted)','3 tbsp rolled oats','1 tbsp peanut butter','1 tsp honey','Pinch of cardamom'],
          ['Blend all ingredients in a food processor until it forms a sticky dough.','Roll into 4 balls. Refrigerate 30 min to firm up. Store up to 1 week in fridge.','Eat 2 balls 30–45 min before workout.'],
          8, 170, '15 min + chill') },
      { time:'Post-Workout', label:'Recovery', name:'Whey + Banana Smoothie', proteinG:32, calories:240,
        items:['30g whey protein','1 banana','250ml cold milk','1 tsp honey'],
        recipe: makeRecipe(['30g whey','1 banana','250ml cold milk','1 tsp honey'],['Blend until smooth. Drink within 30 min of workout.'],32,240,'3 min') },
      { time:'8:00 PM', label:'Dinner', name:'Light Tofu Curry + Chapati', proteinG:16, calories:370,
        items:['150g tofu in light tomato curry','1 whole wheat chapati','Salad','1 bowl curd'],
        recipe: makeRecipe(
          ['150g firm tofu cubed','2 tomatoes pureed','1 onion','½ tsp cumin','¼ tsp turmeric','½ tsp coriander','1 tsp oil','Salt and coriander'],
          ['Sauté onion until golden. Add spices and tomato puree, cook until oil separates.','Add tofu cubes gently. Simmer 8 min. Do not overcook.','Garnish with coriander. Serve light — dinner is the smallest meal.'],
          16, 260, '20 min') },
    ]
  },
];

// Generate 31 days cycling through templates
export const DIET_PLAN: DayDiet[] = Array.from({ length: 31 }, (_, i) => {
  const template = templates[i % templates.length];
  return { day: i + 1, ...template };
});
