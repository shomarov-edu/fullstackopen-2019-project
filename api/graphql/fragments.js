const { gql } = require('apollo-server');

// Fragments for fetching data with Prisma

const fragments = {
  currentUserDetails: gql`
    fragment CurrentUserDetails on User {
      id
      name
      username
      email
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
  `,

  userDetails: gql`
    fragment UserDetails on User {
      id
      name
      username
      registered
      recipes {
        id
      }
      following {
        id
      }
      followers {
        id
      }
    }
  `,

  fullRecipeDetails: gql`
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
      comments {
        id
        author {
          id
        }
        content
        created
        updated
      }
      ratings {
        id
      }
    }
  `
};

module.exports = fragments;
