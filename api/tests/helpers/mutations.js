const { gql } = require('apollo-server');

const mutations = {
  login: gql`
    mutation login($usernameOrEmail: String!, $password: String!) {
      login(input: { usernameOrEmail: $usernameOrEmail, password: $password }) {
        token
      }
    }
  `,

  signup: gql`
    mutation signup(
      $username: String!
      $firstname: String!
      $lastname: String!
      $email: String!
      $password: String!
    ) {
      signup(
        input: {
          username: $username
          firstname: $firstname
          lastname: $lastname
          email: $email
          password: $password
        }
      )
    }
  `,

  createRecipe: gql`
    mutation createRecipe(
      $category: Category!
      $title: String!
      $description: String!
      $cookingTime: Int!
      $difficulty: Difficulty!
      $ingredients: [String!]!
      $method: [String!]!
      $notes: [String!]
    ) {
      createRecipe(
        input: {
          category: $category
          title: $title
          description: $description
          cookingTime: $cookingTime
          difficulty: $difficulty
          ingredients: $ingredients
          method: $method
          notes: $notes
        }
      ) {
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
        published
      }
    }
  `
};

module.exports = mutations;
