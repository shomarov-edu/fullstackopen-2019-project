import { gql } from '@apollo/client';
import fragments from './fragments';

const queries = {
  ME: gql`
    query Me {
      me {
        id
        username
        email
        name
        role
        registered
        recipes {
          id
          title
        }
        likedRecipes {
          id
          title
        }
        following {
          id
        }
        followers {
          id
        }
      }
    }
  `,

  USERS: gql`
    query AllUsers {
      users {
        id
        username
        email
        firstname
        lastname
        role
        registered
        recipes {
          id
          title
        }
        likedRecipes {
          id
          title
        }
        following {
          id
          username
        }
        followers {
          id
          username
        }
      }
    }
  `,

  USER: gql`
    query User($idOrUsername: UserInput!) {
      user(input: $idOrUsername) {
        id
        name
        username
        registered
        recipes {
          id
          title
        }
      }
    }
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
    ${fragments.recipe}
  `,

  PUBLISHED_RECIPES: gql`
    query AllPublishedRecipes {
      publishedRecipes {
        ...RecipeDetails
      }
    }
    ${fragments.recipe}
  `,

  RECIPE: gql`
    query Recipe($id: ID!) {
      recipe(input: { id: $id }) {
        id
        author {
          name
          username
        }
        category
        title
        description
        cookingTime
        difficulty
        ingredients
        method
        notes
        tags
        source
        created
        updated
        published
        likedBy {
          username
        }
        comments {
          id
          author {
            id
            name
            username
          }
          content
        }
        rating
      }
    }
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
