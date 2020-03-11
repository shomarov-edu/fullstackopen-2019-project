const { gql } = require('apollo-server');

// Fragments for fetching data with Prisma

const userDetails = gql`
  fragment UserDetails on User {
    id
    name
    email
    username
    registered
    recipes {
      id
    }
    likedRecipes {
      id
    }
    following {
      id
    }
    followers {
      id
    }
  }
`;

const recipeDetails = gql`
  fragment RecipeDetails on Recipe {
    id
    author {
      id
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
    ratings {
      id
      rater {
        id
      }
      grade
    }
    comments {
      id
      author {
        id
      }
      content
      created
      updated
    }
  }
`;

module.exports = { userDetails, recipeDetails };
