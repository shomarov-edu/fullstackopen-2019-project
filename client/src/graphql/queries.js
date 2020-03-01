import { gql } from '@apollo/client';

const queries = {
  me: gql`
    query {
      me {
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
        likes {
          title
        }
        following {
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
        likes {
          title
        }
        following {
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
        likes {
          title
        }
        following {
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
          author {
            username
          }
          content
        }
        rating
      }
    }
  `,

  recipe: gql`
    query recipe($id: ID!) {
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
          author {
            username
          }
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

export default queries;
