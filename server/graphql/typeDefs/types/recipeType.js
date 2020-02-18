const { gql } = require('apollo-server');

const recipeType = gql`
  scalar Date

  enum Difficulty {
    EASY
    INTERMEDIATE
    HARD
  }

  type Recipe {
    id: ID!
    author: User!
    title: String!
    description: String!
    cookTime: Int!
    difficulty: Difficulty!
    ingredients: [String!]!
    method: [String!]!
    notes: [String]
    tags: [String]
    source: String
    created: Date
    likes: [User]
    comments: [Comment]
    ratings: [Grade]
  }

  type Comment {
    id: ID!
    author: User!
    comment: String!
  }

  type Grade {
    id: ID!
    rater: User!
    grade: Int!
  }

  extend type Query {
    allRecipes: [Recipe]!
    findRecipe(id: ID!): Recipe
  }

  extend type Mutation {
    createRecipe(
      author: String!
      title: String!
      description: String!
      cookTime: Int!
      difficulty: Difficulty!
      ingredients: [String!]!
      method: [String!]!
      notes: [String]!
      tags: [String]
      source: String
    ): Recipe

    updateRecipe(
      id: ID!
      author: String!
      title: String!
      description: String!
      cookTime: Int!
      difficulty: Difficulty!
      ingredients: [String!]!
      method: [String!]!
      notes: [String]!
      tags: [String]
      source: String
      created: Date!
      likes: [ID]
      comments: [ID]
      ratings: [ID]
    ): Recipe
  }
`;

module.exports = recipeType;
