const { gql } = require('apollo-server');

const queries = {
  me: gql`
    query {
      me {
        id
        username
        email
        name
        role
        registered
        recipes {
          title
        }
        likedRecipes {
          title
        }
        followees {
          username
        }
        followers {
          username
        }
      }
    }
  `,

  users: gql`
    query {
      users {
        id
        username
        email
        firstname
        lastname
        role
        registered
        recipes {
          title
        }
        likedRecipes {
          title
        }
        followees {
          username
        }
        followers {
          username
        }
      }
    }
  `,

  user: gql`
    query {
      user(input: { username: "user" }) {
        id
        username
        email
        firstname
        lastname
        role
        registered
        recipes {
          title
        }
        likedRecipes {
          title
        }
        followees {
          username
        }
        followers {
          username
        }
      }
    }
  `,

  userCount: gql`
    query {
      userCount
    }
  `,

  recipes: gql`
    query {
      recipes {
        id
        author {
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
          author
          content
        }
        rating
      }
    }
  `,

  recipe: gql`
    query {
      recipe(input: { id: $id }) {
        id
        author {
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
          author
          content
        }
        rating
      }
    }
  `,

  recipeCount: gql`
    query {
      recipeCount
    }
  `
};

module.exports = queries;
