const { prisma, query, mutate } = require('./config');
const queries = require('../graphql/queries');
const mutations = require('../graphql/mutations');
const getUser = require('./helpers/getUser');

let token;

beforeAll(async () => {
  await prisma.deleteManyUsers();
});

describe('user is able to signup, login and recive own data', () => {
  it('makes sure the database does not contain users', async () => {
    const result = await query({
      query: queries.users
    });

    expect(result.errors).toBeUndefined();
    expect(result.data.users.length).toBe(0);
  });

  it('signs up without email and fails', async () => {
    const variables = {
      username: 'user',
      firstname: 'User',
      lastname: 'Usersson',
      password: 'password'
    };

    const result = await mutate({
      mutation: mutations.signup,
      variables
    });

    expect(result.errors).toBeDefined();
    expect(result.data).toBeUndefined();
  });

  it('creates a new user with valid input', async () => {
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

  it('fails to login with wrong password', async () => {
    const variables = {
      usernameOrEmail: 'user@user.com',
      password: 'god'
    };

    const result = await mutate({
      mutation: mutations.login,
      variables
    });

    expect(result.errors).toBeDefined();
    expect(result.data.login).toBeNull();
  });

  it('logs in successfully and receives jwt', async () => {
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

  it('queries own data with jwt and receives it', async () => {
    const result = await query({
      auth: { req: { headers: { authorization: `Bearer ${token}` } } },
      query: queries.me
    });

    expect(result.errors).toBeUndefined();
    expect(result.data.me).toBeDefined();

    const user = result.data.me;
    const decodedUser = await getUser(token);

    expect(user.username).toEqual(decodedUser.username);
  });
});

afterAll(async () => await prisma.deleteManyUsers());
