import { gql } from '@apollo/client';
import currentUserDetails from '../fragments/currentUserDetails';
import fullRecipeDetails from '../fragments/fullRecipeDetails';

// AUTHENTICATION:

const mutations = {
  LOGIN: gql`
    mutation LogIn($credentials: LogInInput!) {
      login(input: $credentials) {
        token
      }
    }
  `,

  SIGNUP: gql`
    mutation SignUp($signUpData: SignUpInput!) {
      signup(input: $signUpData)
    }
  `,

  // USER MUTATIONS:

  FOLLOW_USER: gql`
    mutation FollowUser($userToFollow: FollowUserInput!) {
      followUser(input: $userToFollow) {
        ...CurrentUserDetails
      }
    }
    ${currentUserDetails}
  `,

  UNFOLLOW_USER: gql`
    mutation UnfollowUser($userToUnfollow: UnfollowUserInput!) {
      unfollowUser(input: $userToUnfollow) {
        ...CurrentUserDetails
      }
    }
    ${currentUserDetails}
  `,

  // RECIPE MUTATIONS:

  CREATE_RECIPE: gql`
    mutation CreateRecipt($newRecipeData: CreateRecipeInput!) {
      createRecipe(input: $newRecipeData) {
        ...RecipeDetails
      }
    }
    ${fullRecipeDetails}
  `,

  LIKE_RECIPE: gql`
    mutation LikeRecipe($recipeToLike: LikeRecipeInput!) {
      likeRecipe(input: $recipeToLike) {
        ...CurrentUserDetails
      }
    }
    ${currentUserDetails}
  `,

  COMMENT_RECIPE: gql`
    mutation CommentRecipe($newComment: CommentRecipeInput!) {
      commentRecipe(input: $newComment) {
        ...RecipeDetails
      }
    }
    ${fullRecipeDetails}
  `,

  EDIT_COMMENT: gql`
    mutation EditComment($editedCommentData: EditCommentInput!) {
      editComment(input: $editedCommentData) {
        ...RecipeDetails
      }
    }
    ${fullRecipeDetails}
  `,

  DELETE_COMMENT: gql`
    mutation DeleteComment($commentToDelete: DeleteCommentInput!) {
      deleteComment(input: $commentToDelete) {
        ...RecipeDetails
      }
    }
    ${fullRecipeDetails}
  `
};

export default mutations;
