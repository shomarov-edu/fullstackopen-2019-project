import { gql } from '@apollo/client';

// AUTHENTICATION:

const mutations = {
  LOGIN: gql`
    mutation LogIn($usernameOrEmail: String!, $password: String!) {
      login(input: { usernameOrEmail: $usernameOrEmail, password: $password }) {
        id
        username
        token
      }
    }
  `,

  SIGNUP: gql`
    mutation SignUp(
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

// TODO: RECIPE MUTATIONS

export default mutations;
