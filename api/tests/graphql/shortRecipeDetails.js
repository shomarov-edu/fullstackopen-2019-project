const { gql } = require('apollo-server');

const shortRecipeDetails = gql`
  fragment RecipePreviewTest on Recipe {
    id
    author {
      id
      name
      username
    }
    category
    title
    tags
    likes
    rating
  }
`;

module.exports = shortRecipeDetails;
