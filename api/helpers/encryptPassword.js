const bcrypt = require('bcrypt');

const encryptPassword = async password => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

module.exports = encryptPassword;
