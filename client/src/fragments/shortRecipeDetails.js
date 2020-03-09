import { gql } from '@apollo/client';

const shortRecipeDetails = gql`
  fragment RecipePreview on Recipe {
    id
    author {
      id
      name
      username
    }
    category
    title
    tags
    likes
    rating
  }
`;

export default shortRecipeDetails;
