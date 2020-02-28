const { gql } = require('apollo-server');

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
        username
      }
    }
  `
};

module.exports = queries;
