const { gql } = require('apollo-server');
const fullRecipeDetails = require('./fullRecipeDetails');

const currentUserDetails = gql`
  fragment CurrentUserDetailsTest on User {
    id
    name
    email
    username
    registered
    recipes {
      ...RecipeDetails
    }
    publishedRecipes {
      ...RecipeDetails
    }
    likedRecipes {
      ...RecipeDetails
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
  ${fullRecipeDetails}
`;

module.exports = currentUserDetails;
