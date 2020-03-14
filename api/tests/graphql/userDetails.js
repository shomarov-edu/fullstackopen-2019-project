const { gql } = require('apollo-server');
const shortRecipeDetails = require('./shortRecipeDetails');

module.exports.userDetails = gql`
  fragment UserDetailsTest on User {
    id
    name
    username
    registered
    publishedRecipes {
      ...RecipePreview
    }
    following {
      id
      name
      username
    }
    followers {
      id
      name
      username
    }
  }
  ${shortRecipeDetails}
`;
