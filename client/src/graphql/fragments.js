import { gql } from '@apollo/client';

const fragments = {
  recipe: gql`
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
      source
      created
      updated
      published
      likedBy {
        id
      }
      comments {
        id
        author {
          username
        }
        content
      }
      ratings {
        id
        rater {
          id
        }
      }
      rating
    }
  `
};

export default fragments;
