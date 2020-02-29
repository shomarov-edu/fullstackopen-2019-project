const { gql } = require('apollo-server');

const mutations = {
  login: gql`
    mutation {
      login(input: { username: $username, password: $password }) {
        token
      }
    }
  `,

  signup: gql`
    mutation {
      signup(
        input: {
          username: "user"
          firstname: "User"
          lastname: "Usersson"
          email: "user@user.com"
          password: "passwor"
        }
      )
    }
  `,

  signupWithoutEmail: gql`
    mutation {
      signup(
        input: {
          username: "user"
          firstname: "User"
          lastname: "Usersson"
          password: "password"
        }
      )
    }
  `
};

module.exports = mutations;
