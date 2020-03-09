import { gql } from '@apollo/client';
import fullRecipeDetails from './fullRecipeDetails';

const currentUserDetails = gql`
  fragment CurrentUserDetails on User {
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

export default currentUserDetails;
