import { gql } from '@apollo/client';

const mutations = {
  login: gql`
    mutation login($username: String!, $password: String!) {
      login(input: { username: $username, password: $password }) {
        token
      }
    }
  `,

  signup: gql`
    mutation signup($username: String!, $firstname: String!, $lastname: String!, $email: String!, $password: String! {
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

export default mutations;
