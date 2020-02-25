const authorization = require('./authorization');
const { prisma } = require('../generated/prisma-client/');
const { getUser } = require('../helpers/authorizationHelper');

const context = async ({ req }) => {
  const tokenWithBearer = req.headers.authorization || '';

  const currentUser = tokenWithBearer ? await getUser(tokenWithBearer) : null;

  return {
    currentUser,
    authorization,
    prisma
  };
};

module.exports = context;
