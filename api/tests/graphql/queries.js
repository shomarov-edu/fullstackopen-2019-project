const { gql } = require('apollo-server');
const currentUserDetails = require('./currentUserDetails');
const userDetails = require('./userDetails');
const fullRecipeDetails = require('./fullRecipeDetails');

module.exports.ME = gql`
  query Me {
    me {
      ...CurrentUserDetailsTest
    }
  }
  ${currentUserDetails}
`;

module.exports.USERS = gql`
  query Users {
    users {
      ...UserDetailsTest
    }
  }
  ${userDetails}
`;

module.exports.USER = gql`
  query User($idOrUsername: UserInput!) {
    user(input: $idOrUsername) {
      ...UserDetailsTest
    }
  }
  ${userDetails}
`;

module.exports.USER_COUNT = gql`
  query {
    userCount
  }
`;

// RECIPE QUERIES:

module.exports.RECIPES = gql`
  query AllRecipes {
    recipes {
      ...RecipeDetailsTest
    }
  }
  ${fullRecipeDetails}
`;

module.exports.PUBLISHED_RECIPES = gql`
  query AllPublishedRecipes {
    publishedRecipes {
      ...RecipeDetailsTest
    }
  }
  ${fullRecipeDetails}
`;

module.exports.RECIPE = gql`
  query Recipe($id: ID!) {
    recipe(input: { id: $id }) {
      ...RecipeDetailsTest
    }
  }
  ${fullRecipeDetails}
`;

module.exports.RECIPE_COUNT = gql`
  query RecipeCount {
    recipeCount
  }
`;

module.exports.PUBLISHED_RECIPE_COUNT = gql`
  query PublishedRecipeCount {
    publishedRecipeCount
  }
`;
