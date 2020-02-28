const appRoot = require('app-root-path');
const { prisma, query, mutate } = require('./config');
const { queries, mutations } = require('../graphql');
const { getUserForTests } = require('../helpers/authorizationHelper');

let token;

beforeAll(async () => {
  await prisma.deleteManyUsers();
});

test('no users in database', async () => {
  const result = await query({
    query: queries.users
  });

  expect(result.data.users.length).toBe(0);
});

test('user creation fails with invalid input', async () => {
  const result = await mutate({
    mutation: mutations.signupWithoutEmail
  });

  expect(result.errors).toBeDefined();
  expect(result.data).toBeUndefined();
});

test('create new user', async () => {
  const result = await mutate({
    mutation: mutations.signup
  });

  expect(result.data.signup).toBe(true);
});

test('user logs in successfully', async () => {
  const result = await mutate({
    mutation: mutations.login
  });

  expect(result.data.login.token).toBeDefined();

  token = result.data.login.token || null;
});

test('user receives own data', async () => {
  const result = await query({
    auth: { req: { headers: { authorization: `Bearer ${token}` } } },
    query: queries.me
  });

  expect(result.errors).toBeUndefined();
  expect(result.data.me).toBeDefined();

  const user = result.data.me;
  const decodedUser = await getUserForTests(token);

  expect(user.id).toEqual(decodedUser.id);
});
