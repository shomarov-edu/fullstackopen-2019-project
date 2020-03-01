const validator = require('validator');
const { UserInputError } = require('apollo-server');

// TODO: isAlpha, isEmail, normalizeEmail, trim, isInt({ min: 1, max: 5 }),
// isLength(str,{min:0, max: undefined}), isMongoId(str), isURL(str [, options])

const validateSignUpInput = input => {
  const { firstname, lastname, email, username } = input;

  if (!firstname.isAlpha())
    throw new UserInputError({ invalidArgs: firstname });

  if (!lastname.isAlpha()) throw new UserInputError({ invalidArgs: lastname });
  if (!email.isEmail()) throw new UserInputError({ invalidArgs: email });
  if (!username.isAlpha()) throw new UserInputError({ invalidArgs: username });

  firstname.trim();
  lastname.trim();
  email.normalizeEmail();
  firstname.trim();
};

const validateLoginInput = input => {
  const { usernameOrEmail, password } = input;
};

const validateUserInput = input => {};
const validateRecipeInput = input => {};

const validateFollowUserInput = input => {};
const validateUpdateUserInput = input => {};
const validateUpdateUsernameInput = input => {};
const validateUpdatePasswordInput = input => {};
const validateCreateRecipeInput = input => {};
const validateUpdateRecipeInput = input => {};
const validatePublishRecipeInput = input => {};
const validateCommentRecipeInput = input => {};
const validateDeleteCommentInput = input => {};
const validateRateRecipeInput = input => {};
