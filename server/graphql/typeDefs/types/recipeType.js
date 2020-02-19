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
    getRecipes: [Recipe]!
    getRecipe(id: ID!): Recipe
    recipeCount: Int!
  }

  extend type Mutation {
    createRecipe(recipe: CreateRecipeInput): RecipePayload

    updateRecipe(input: UpdateRecipeInput): Recipe

    commentRecipe(id: String!, author: String!, comment: String!): Recipe
    likeRecipe(id: String!, user: String!): Recipe
    unlikeRecipe(id: String!, user: String!): Recipe
    rateRecipe(id: String!, user: String!, grade: Int!): Recipe
    deleteRecipe(id: String!): Boolean
  }

  type RecipePayload {
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

  input CreateRecipeInput {
    title: String!
    description: String!
    cookTime: Int!
    difficulty: Difficulty!
    ingredients: [String!]!
    method: [String!]!
    notes: [String]
    tags: [String]
    source: String
  }

  input RecipeInput {
    title: String
    description: String
    cookTime: Int
    difficulty: Difficulty
    ingredients: [String]
    method: [String]
    notes: [String]
    tags: [String]
    source: String
  }

  input UpdateRecipeInput {
    id: ID!
    patch: RecipeInput
  }
`;

module.exports = recipeType;
