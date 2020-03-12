import { gql } from '@apollo/client';

const fullRecipeDetails = gql`
  fragment RecipeDetails on Recipe {
    id
    author {
      id
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
    created
    updated
    published
    likedBy {
      id
    }
    likes
    ratings {
      id
      rater {
        id
      }
    }
    rating
    comments {
      id
      author {
        id
        name
        username
      }
      content
      created
      updated
    }
    commentCount
  }
`;

export default fullRecipeDetails;
