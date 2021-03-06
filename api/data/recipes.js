const recipes = [
  {
    category: 'DESSERT',
    title: 'Vegan lemon cake',
    description:
      'Try baking a vegan version of lemon cake. Light and zingy, it also works well if you replace the flour and baking powder with gluten-free alternatives',
    cookingTime: 45,
    difficulty: 'INTERMEDIATE',
    ingredients: [
      '100ml vegetable oil, plus extra for the tin',
      '275g self-raising flour',
      '200g golden caster sugar',
      '1 tsp baking powder',
      '1 lemon, zested, ½ juiced',
      '150g icing sugar',
      '½ lemon, juiced'
    ],
    method: [
      'Heat oven to 200C/180C fan/gas 6. Oil a 1lb loaf tin and line it with baking parchment. Mix the flour, sugar, baking powder and lemon zest in a bowl. Add the oil, lemon juice and 170ml cold water, then mix until smooth.',
      'Pour the mixture into the tin. Bake for 30 mins or until a skewer comes out clean. Cool in the tin for 10 mins, then remove and transfer the cake to a wire rack to cool fully.',
      'For the icing, sieve the icing sugar into a bowl. Mix in just enough lemon juice to make an icing thick enough to pour over the loaf (if you make the icing too thin, it will just run off the cake).'
    ],
    notes: ['nice one!'],
    published: true
  },
  {
    category: 'MAIN',
    title: 'Falafel burgers',
    description:
      "A healthy burger that's filling too. These are great for anyone who craves a big bite but doesn't want the calories",
    cookingTime: 30,
    difficulty: 'INTERMEDIATE',
    ingredients: [
      '400g can chickpea, rinsed and drained',
      '1 small red onion, roughly chopped',
      '1 garlic clove, chopped',
      'handful of flat-leaf parsley or curly parsley',
      '1 tsp ground cumin',
      '1 tsp ground coriander',
      '1⁄2 tsp harissa paste or chilli powder',
      '2 tbsp plain flour',
      '2 tbsp sunflower oil',
      'toasted pitta bread, to serve',
      '200g tub tomato salsa, to serve',
      'green salad, to serve'
    ],
    method: [
      'Drain a 400g can chickpeas and pat dry with kitchen paper.',
      'Tip into a food processor along with 1 small roughly chopped red onion, 1 garlic clove, handful of flat-leaf parsley, 1 tsp ground cumin, 1 tsp ground coriander, ½ tsp harissa paste or chillli powder, 2 tbsp plain flour and a little salt.',
      'Blend until fairly smooth, then shape into four patties with your hands.',
      'Heat 2 tbsp sunflower oil in a non-stick frying pan, add the burgers, then quickly fry for 3 mins on each side until lightly golden.',
      'Serve with toasted pitta bread, 200g tub tomato salsa and a green salad.'
    ],
    notes: ['want this'],
    published: true
  },
  {
    category: 'SALAD',
    title: 'Chickpea Tuna Salad',
    description:
      "You want easy? Try this plant-based chickpea tuna salad recipe. Smash some chickpeas, add a few odds and ends and you’re well on your way! This is a fantastic staple dish and by adjusting a few of the ingredients you can keep the flavors fresh and alive so it never gets boring. Serve it as a salad or as a sandwich filling with your favorite toppings - there's no end to the combos you can come up with. You got this!",
    cookingTime: 20,
    difficulty: 'EASY',
    ingredients: [
      '2 cans of chickpeas, drained 580 g',
      '1 cup Classic Cashew Sour Cream or plant-based mayo (optional)',
      '¼ cup corn kernels, either fresh or frozen (can be charred for extra taste)',
      '3 tablespoons sunflower seeds (soaked for an hour in water-optional)',
      '1 stalk celery, diced',
      '1 tablespoon Dijon mustard',
      '½ lemon, juiced',
      '2 teaspoons capers, drained',
      '2 green onions, diced',
      '2 teaspoons fresh dill, chopped',
      '1 teaspoon black pepper, fresh ground',
      'Salt, to taste (optional)'
    ],
    method: [
      'In large bowl add drained chickpeas and mash with a fork or potato masher.',
      'Add in the remaining ingredients and gently fold and stir all together. '
    ],
    notes: [
      'Add chili peppers, (we like birds eye) for that heated boost.',
      'Swap out the corn, dill and capers for roasted red peppers and olives for a different twist.',
      'Try it grilled with some plant-based cheese for a plant-based take on the tuna melt (this will change your life).'
    ],
    published: true
  },
  {
    category: 'MAIN',
    title: 'Millet Mercimek Koftesi',
    description:
      'A lightened up version of traditional Turkish lentil patties using millet - a healthy and satisfying summer lunch.',
    cookingTime: 40,
    difficulty: 'HARD',
    ingredients: [
      '1 cup red lentils, dry',
      '½ cup millet, dry',
      '1 large red onion, finely chopped',
      '2 teaspoons smoked paprika',
      '2 teaspoons cumin powder',
      '½ teaspoons red chili flakes (optional)',
      '2 tablespoon tomato paste',
      'Sea salt and black pepper to taste',
      '1 medium bunch parsley, finely chopped',
      '1 spring onion, finely chopped',
      '1 tablespoon olive oil',
      'Lettuce or greens of choice, to serve'
    ],
    method: [
      'Pre-cook your millet separately according to package method. Bring to a boil then cover and simmer until fluffy.',
      'Add lentils in a pot with enough water to cover, then boil on medium heat for 15-20 mins or until soft. Add the cooked millet and cover, allowing it to absorb the remaining water.',
      'In a separate pan, sautee the onions and tomato paste with olive oil on medium-low heat till just translucent. Season using the spices, salt and pepper.',
      'Combine the onions and tomato paste mixture with the lentils and millet, and mix through until well combined. Allow to cool for 5-10 minutes before folding in the fresh parsley and spring onions.',
      'Form into cigar shaped patties and serve atop a bed of lettuce.'
    ],
    notes: [
      'Add chili peppers, (we like birds eye) for that heated boost.',
      'Swap out the corn, dill and capers for roasted red peppers and olives for a different twist.',
      'Try it grilled with some plant-based cheese for a plant-based take on the tuna melt (this will change your life).'
    ],
    published: true
  },
  {
    category: 'BREAKFAST',
    title: 'Life-Changing Banana Walnut Pancakes (GF)',
    description:
      ' Tender, wholesome banana walnut pancakes made in less than 30 minutes. Naturally sweetened, vegan and gluten-free, and insanely delicious',
    cookingTime: 35,
    difficulty: 'INTERMEDIATE',
    ingredients: [
      '180 g gluten-free oat flour (I ground mine from whole oats)*',
      '240 g gluten-free all-purpose flour (I used my DIY blend)*',
      '56 g almond flour (not almond meal, OR sub more gluten-free blend)*',
      '17 g baking powder',
      '1 tsp sea salt',
      '1 1/2 tsp ground cinnamon',
      '1/4 tsp ground ginger (optional)',
      '1/4 tsp ground nutmeg (optional)',
      '~250 g ripe bananas (the riper the better)',
      '45 ml melted coconut oil* (plus more for cooking)',
      '22 ml vanilla extract',
      '40 ml maple syrup (I like Grade A)',
      '540 ml non-dairy milk (I used plain unsweetened almond milk)',
      '87 g chopped raw walnuts',
      '39 g gluten-free rolled oats'
    ],
    method: [
      'To a large bowl, add oat flour, gluten-free flour, almond flour, baking powder, salt, cinnamon, ginger (optional), and nutmeg (optional). Whisk to combine and set aside.',
      "To a separate mixing bowl, add bananas and mash. Then add melted coconut oil, vanilla extract, maple syrup, and non-dairy milk and whisk to combine. If the coconut oil hardens or clumps, it's not a big deal. You can microwave (for 45 seconds - 1 minute) to remelt - otherwise proceed.",
      'Add the wet ingredients to the dry ingredients and gently fold everything together. Then add the chopped walnuts and oats and gently fold/mix until the batter is well combined. It should be thick but pourable/scoopable.',
      'Heat a large nonstick skillet, griddle, or cast-iron skillet over medium heat. Carefully rub skillet with coconut oil or vegan butter.',
      'Once hot, spoon 1/4 - 1/3 cup of the batter onto skillet. Cook until surface of pancakes have some bubbles and the edges appear dry (~2 minutes). Carefully flip pancakes and cook until browned on the underside (~2 minutes more).',
      'Transfer cooked pancakes to a baking sheet or plate and keep warm in a 200-degree F (94 C) oven. Continue cooking until all batter is used up - about 14-16 pancakes (as original recipe is written).',
      "These pancakes are delicious on their own, but they're amplified with vegan butter or peanut butter, sliced bananas, granola, flaked coconut, and maple syrup. Store cooled leftover pancakes (without toppings) in a container separated with wax or parchment paper to prevent sticking. Will keep in the refrigerator up to 4 days or in the freezer up to 1 month. Reheat in the toaster oven or oven until hot."
    ],
    notes: [
      "*If you can't tolerate oats, you can try subbing a blend of gluten-free flour and almond flour, but I haven't tested it that way and can't guarantee the results.",
      'https://minimalistbaker.com/diy-gluten-free-flour-blend/',
      '*If nut-free, sub the almond milk for rice or light coconut milk. And sub the almond flour for additional gluten-free flour blend.',
      '*If oil-free, try subbing with applesauce or 1 Tbsp nut butter.',
      '*Nutrition information is a rough estimate calculated without toppings.',
      '*These pancakes are adapted from the Banana Walnut Flapjacks at one of my favorite Portland cafes - Harlow. The recipe was generously shared with me here.'
    ],
    published: true
  },
  {
    category: 'DESSERT',
    title: '4-Ingredient Easy Vegan Brownies',
    description:
      'Incredibly rich, vegan, easy brownies made with just 4 ingredients and 1 bowl! Naturally sweetened, grain- and gluten-free, and so satisfying!',
    cookingTime: 25,
    difficulty: 'EASY',
    ingredients: [
      "400 g tightly packed dates, pitted (measured after pitting // make sure they're fresh! If dry, soak in warm water 10 minutes, drain, then add to processor)",
      '60 ml warm water',
      '128 g salted peanut butter* (if unsalted, add a healthy pinch of salt to the batter)',
      '30 ml melted coconut oil* (if avoiding coconut oil, see notes)',
      '32 g cacao or unsweetened cocoa powder',
      '60 g dairy-free dark chocolate chips (optional // we like Enjoy Life)',
      '60 g roughly chopped raw walnuts (optional // or other nut of choice)'
    ],
    method: [
      'Preheat oven to 350 degrees F (176 C) and line a standard loaf pan (or similar size pan) with parchment paper. Set aside.',
      'Add dates to food processor and blend until small bits or a ball forms. If your food processor has a difficult cookingTime processing the dates, ensure there are no pits in the dates and that your dates are fresh and sticky. If too dry they can have a difficult cookingTime blending. (It may also be an issue of food processor strength if it has a hard cookingTime blending.)',
      'Once blended, separate the dates into chunks using a spoon. Then add hot water and blend until a sticky date paste forms. Scrape down sides as needed.',
      'Add peanut butter, coconut oil, and cacao powder and pulse until a sticky batter forms. It should be tacky and thick (scrape down sides as needed). Lastly add chocolate chips and walnuts (optional) and pulse to incorporate.',
      'Transfer batter to lined loaf pan and spread into an even layer. For a smooth top, lay some parchment paper on top and use a flat-bottomed object (like a drinking glass) to press into an even layer.',
      'Bake on the center rack for 15 minutes - the edges should be slightly dry. Remove from oven and let cool in the pan for 10 minutes. Then carefully lift out of the pan using the edges of the parchment paper and let cool on a plate or cooling rack for at least 20 minutes before slicing. The longer they cool, the firmer they will become.',
      'Enjoy warm or cooled. Store leftovers covered at room temperature up to 3 days, in the refrigerator up to 5-6 days, or in the freezer up to 1 month (let thaw before enjoying).'
    ],
    notes: [
      "*If you're peanut-free, I think almond, cashew, or even sesame butter (tahini) would work well here.",
      "*If you're oil-free, you could try subbing something like more nut or seed butter, or potentially applesauce.",
      '*Nutrition information is a rough estimate calculated without optional ingredients.'
    ],
    published: true
  }
];

module.exports = recipes;
