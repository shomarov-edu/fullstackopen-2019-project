const { gql } = require('apollo-server');

const fragments = {
  currentUserDetails: gql`
    fragment DetailsForCurrentUser on User {
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
          id
        }
        content
      }
      ratings {
        id
        rater {
          id
        }
      }
    }
  `
};

module.exports = fragments;
