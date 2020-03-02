const { prisma, query, mutate } = require('./config');
const queries = require('../graphql/queries');
const mutations = require('../graphql/mutations');
const getUser = require('./helpers/getUser');

describe('user is able to signup, login, create and save a new recipe', () => {
  let token;

  beforeAll(async () => {
    await prisma.deleteManyRecipes();
    await prisma.deleteManyUsers();
  });

  it('signs up', async () => {
    const variables = {
      username: 'user',
      firstname: 'User',
      lastname: 'Usersson',
      email: 'user@user.com',
      password: 'password'
    };

    const result = await mutate({
      mutation: mutations.signup,
      variables
    });

    expect(result.data.signup).toBe(true);
  });

  it('logs in', async () => {
    const variables = {
      usernameOrEmail: 'user@user.com',
      password: 'password'
    };

    const result = await mutate({
      mutation: mutations.login,
      variables
    });

    expect(result.data.login.token).toBeDefined();

    token = result.data.login.token;
  });

  it('creates and saves a new recipe', async () => {
    const variables = {
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
      source: 'https://www.bbcgoodfood.com/user/4614791/recipe/vegan-lemon-cake'
    };

    const result = await mutate({
      auth: { req: { headers: { authorization: `Bearer ${token}` } } },
      mutation: mutations.createRecipe,
      variables
    });

    console.log(result);
    expect(result.data.createRecipe.id).toBeDefined;

    const user = getUser(token);

    expect(result.data.createRecipe.username).toBe(user.username);
  });
});
