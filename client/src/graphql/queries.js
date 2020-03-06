import { gql } from '@apollo/client';

const queries = {
  ME: gql`
    query Me {
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

  USER: gql`
    query user($username: String!) {
      user(input: { username: $username }) {
        id
        name
        username
        registered
        recipes {
          id
          title
        }
      }
    }
  `,

  USER_COUNT: gql`
    query {
      userCount
    }
  `,

  RECIPES: gql`
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

  PUBLISHED_RECIPES: gql`
    query {
      publishedRecipes {
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

  RECIPE: gql`
    query recipe($id: ID!) {
      recipe(input: { id: $id }) {
        id
        author {
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

  RECIPE_COUNT: gql`
    query {
      recipeCount
    }
  `
};

export default queries;
