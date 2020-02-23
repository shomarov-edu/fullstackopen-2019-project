const { gql } = require('apollo-server');

const categoryType = gql`
  type Category {
    id: ID!
    user: User!
    name: String!
    recipes: [Recipe]!
  }

  extend type Query {
    getCategories: [Category]!
    getCategory(categoryId: ID!): Category
    getCategoryRecipes(categoryId: ID!): [Recipe]
  }

  extend type Mutation {
    createCategory(input: CreateCategoryInput): Category!
    renameCategory(input: RenameCategoryInput): Category!
    addRecipe(input: AddRecipeInput): Category!
    removeRecipe(input: RemoveRecipeInput): Category!
    deleteCategory(input: DeleteCategoryInput): Boolean!
  }

  input CreateCategoryInput {
    name: String!
  }

  input RenameCategoryInput {
    categoryId: ID!
    name: String!
  }

  input AddRecipeInput {
    categoryId: ID!
    recipeId: ID!
  }

  input RemoveRecipeInput {
    categoryId: ID!
    recipeId: ID!
  }

  input DeleteCategoryInput {
    categoryId: ID!
  }
`;

module.exports = categoryType;
