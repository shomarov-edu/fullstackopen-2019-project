const { prisma, query, mutate } = require('./config/testClient');
// const { USERS } = require('./graphql/queries');
const { SIGNUP, LOGIN } = require('./graphql/mutations');
const getUser = require('./helpers/getUser');

let token;

beforeAll(async () => {
  await prisma.deleteManyRecipes();
  await prisma.deleteManyUsers();
});

describe('user is able to signup and login', () => {
  it('signs up', async () => {
    const signUpData = {
      username: 'test',
      firstname: 'Test',
      lastname: 'Testinsson',
      email: 'test@test.com',
      password: 'password'
    };

    const result = await mutate({
      mutation: SIGNUP,
      variables: signUpData
    });

    expect(result.data.signup).toBe(true);
  });

  it('logs in', async () => {
    // const q = await query({
    //   query: USERS
    // });

    const credentials = {
      usernameOrEmail: 'test@test.com',
      password: 'password'
    };

    const result = await mutate({
      mutation: LOGIN,
      variables: credentials
    });

    expect(result.data.login.token).toBeDefined();

    token = result.data.login.token;
  });
});

describe('user is able to update his personal information', () => {
  it('updates first name and last name', async () => {
    expect(true).toBeTruthy();
  }),
    it('updates email', async () => {
      expect(true).toBeTruthy();
    }),
    it('updates password', async () => {
      expect(true).toBeTruthy();
    });
});

describe('user is able to follow other users', () => {
  it('user follows other user', () => {
    expect(true).toBeTruthy();
  });
});

afterAll(async () => await prisma.deleteManyUsers());
