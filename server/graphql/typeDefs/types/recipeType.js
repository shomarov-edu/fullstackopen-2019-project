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
    content: String!
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
    myRecipes: [Recipe]!
    myRecipeCount: Int!
  }

  extend type Mutation {
    createRecipe(recipe: CreateRecipeInput): RecipePayload
    updateRecipe(input: UpdateRecipeInput): Recipe
    commentRecipe(input: CommentRecipeInput): Recipe
    likeRecipe(input: LikeRecipeInput): Recipe
    unlikeRecipe(input: UnlikeRecipeInput): Recipe
    rateRecipe(input: RateRecipeInput): Recipe
    deleteRecipe(input: DeleteRecipeInput!): Boolean
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
    notes: [String]!
    tags: [String]!
    source: String!
    created: Date!
    likes: [User]!
    comments: [Comment]!
    ratings: [Grade]!
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

  input CommentRecipeInput {
    id: ID!
    message: String!
  }

  input LikeRecipeInput {
    id: ID!
  }

  input UnlikeRecipeInput {
    id: ID!
  }

  input RateRecipeInput {
    user: ID!
    grade: Int!
  }

  input DeleteRecipeInput {
    id: ID!
  }
`;

module.exports = recipeType;
