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
  `
};

module.exports = mutations;
