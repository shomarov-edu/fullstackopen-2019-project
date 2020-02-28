const { gql } = require('apollo-server');

const mutations = {
  login: gql`
    mutation {
      login(input: { username: "user", password: "password" }) {
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
          password: "password"
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
