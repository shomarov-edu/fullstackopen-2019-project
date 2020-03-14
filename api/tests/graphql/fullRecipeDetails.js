const { gql } = require('apollo-server');

const fullRecipeDetails = gql`
  fragment RecipeDetailsTest on Recipe {
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
      user
      grade
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

module.exports = fullRecipeDetails;
