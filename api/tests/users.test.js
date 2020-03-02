const { prisma, query, mutate } = require('./config');
const queries = require('../graphql/queries');
const mutations = require('../graphql/mutations');
const getUser = require('./helpers/getUser');

beforeEach(async () => {
  await prisma.deleteManyRecipes();
  await prisma.deleteManyUsers();

  let token;

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
});

describe('user is able to update his personal information', () => {
  it('updates first name and last name', async () => {}),
    it('updates email', async () => {}),
    it('updates password', async () => {});
});

describe('user is able to follow other users', () => {
  it('user follows other user', () => {});
});
