const bcrypt = require('bcrypt');

const comparePasswords = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash);
};

module.exports = comparePasswords;
