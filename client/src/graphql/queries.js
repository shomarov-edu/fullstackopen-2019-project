import { gql } from '@apollo/client';
import currentUserDetails from '../fragments/currentUserDetails';
import userDetails from '../fragments/userDetails';
import fullRecipeDetails from '../fragments/fullRecipeDetails';

const queries = {
  ME: gql`
    query Me {
      me {
        ...CurrentUserDetails
      }
    }
    ${currentUserDetails}
  `,

  USER: gql`
    query User($idOrUsername: UserInput!) {
      user(input: $idOrUsername) {
        ...UserDetails
      }
    }
    ${userDetails}
  `,

  USER_COUNT: gql`
    query {
      userCount
    }
  `,

  // RECIPE QUERIES:

  RECIPES: gql`
    query AllRecipes {
      recipes {
        ...RecipeDetails
      }
    }
    ${fullRecipeDetails}
  `,

  PUBLISHED_RECIPES: gql`
    query AllPublishedRecipes {
      publishedRecipes {
        ...RecipeDetails
      }
    }
    ${fullRecipeDetails}
  `,

  RECIPE: gql`
    query Recipe($id: ID!) {
      recipe(input: { id: $id }) {
        ...RecipeDetails
      }
    }
    ${fullRecipeDetails}
  `,

  RECIPE_COUNT: gql`
    query RecipeCount {
      recipeCount
    }
  `,

  PUBLISHED_RECIPE_COUNT: gql`
    query PublishedRecipeCount {
      publishedRecipeCount
    }
  `
};

export default queries;
