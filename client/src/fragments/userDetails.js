import { gql } from '@apollo/client';
import shortRecipeDetails from './shortRecipeDetails';

const userDetails = gql`
  fragment UserDetails on User {
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

export default userDetails;
