import { gql } from '@apollo/client';
import currentUserDetails from '../fragments/currentUserDetails';
import userDetails from '../fragments/userDetails';
import fullRecipeDetails from '../fragments/fullRecipeDetails';

export const ME = gql`
  query Me {
    me {
      ...CurrentUserDetails
    }
  }
  ${currentUserDetails}
`;

export const USER = gql`
  query User($idOrUsername: UserInput!) {
    user(input: $idOrUsername) {
      ...UserDetails
    }
  }
  ${userDetails}
`;

export const USER_COUNT = gql`
  query {
    userCount
  }
`;

// RECIPE QUERIES:

export const RECIPES = gql`
  query AllRecipes {
    recipes {
      ...RecipeDetails
    }
  }
  ${fullRecipeDetails}
`;

export const PUBLISHED_RECIPES = gql`
  query AllPublishedRecipes {
    publishedRecipes {
      ...RecipeDetails
    }
  }
  ${fullRecipeDetails}
`;

export const RECIPE = gql`
  query Recipe($id: ID!) {
    recipe(input: { id: $id }) {
      ...RecipeDetails
    }
  }
  ${fullRecipeDetails}
`;

export const RECIPE_COUNT = gql`
  query RecipeCount {
    recipeCount
  }
`;

export const PUBLISHED_RECIPE_COUNT = gql`
  query PublishedRecipeCount {
    publishedRecipeCount
  }
`;
