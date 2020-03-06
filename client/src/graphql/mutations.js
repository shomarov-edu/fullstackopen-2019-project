import { gql } from '@apollo/client';

// AUTHENTICATION:

const mutations = {
  LOGIN: gql`
    mutation LogIn($usernameOrEmail: String!, $password: String!) {
      login(input: { usernameOrEmail: $usernameOrEmail, password: $password }) {
        token
      }
    }
  `,

  SIGNUP: gql`
    mutation SignUp(
      $name: String!
      $email: String!
      $username: String!
      $password: String!
    ) {
      signup(
        input: {
          name: $name
          email: $email
          username: $username
          password: $password
        }
      )
    }
  `
};

// TODO: RECIPE MUTATIONS

export default mutations;
