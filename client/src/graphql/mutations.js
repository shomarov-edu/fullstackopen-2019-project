import { gql } from '@apollo/client';
import currentUserDetails from '../fragments/currentUserDetails';
import fullRecipeDetails from '../fragments/fullRecipeDetails';

// AUTHENTICATION:

export const LOGIN = gql`
  mutation LogIn($credentials: LogInInput!) {
    login(input: $credentials) {
      token
    }
  }
`;

export const SIGNUP = gql`
  mutation SignUp($signUpData: SignUpInput!) {
    signup(input: $signUpData)
  }
`;

// USER MUTATIONS:

export const FOLLOW_USER = gql`
  mutation FollowUser($userToFollow: FollowUserInput!) {
    followUser(input: $userToFollow) {
      ...CurrentUserDetails
    }
  }
  ${currentUserDetails}
`;

export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($userToUnfollow: UnfollowUserInput!) {
    unfollowUser(input: $userToUnfollow) {
      ...CurrentUserDetails
    }
  }
  ${currentUserDetails}
`;

export const UPDATE_NAME = gql`
  mutation UpdateName($updateNameInput: UpdateNameInput!) {
    updateName(input: $updateNameInput) {
      ...CurrentUserDetails
    }
  }
  ${currentUserDetails}
`;

export const UPDATE_EMAIL = gql`
  mutation UpdateEmail($updateEmailInput: UpdateEmailInput!) {
    updateEmail(input: $updateEmailInput) {
      ...CurrentUserDetails
    }
  }
  ${currentUserDetails}
`;

export const UPDATE_USERNAME = gql`
  mutation UpdateUsername($updateUsernameInput: UpdateUsernameInput!) {
    updateUsername(input: $updateUsernameInput) {
      ...CurrentUserDetails
    }
  }
  ${currentUserDetails}
`;

export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($updatePasswordInput: UpdatePasswordInput!) {
    updatePassword(input: $updatePasswordInput)
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation DeleteAccount($deleteAccountInput: DeleteAccountInput!) {
    deleteAccount(input: $deleteAccountInput)
  }
`;

// RECIPE MUTATIONS:

export const CREATE_RECIPE = gql`
  mutation CreateRecipe($newRecipeData: CreateRecipeInput!) {
    createRecipe(input: $newRecipeData) {
      ...RecipeDetails
    }
  }
  ${fullRecipeDetails}
`;

export const UPDATE_RECIPE = gql`
  mutation UpdateRecipe($updateRecipeInput: UpdateRecipeInput!) {
    updateRecipe(input: $updateRecipeInput) {
      ...RecipeDetails
    }
  }
  ${fullRecipeDetails}
`;

export const LIKE_RECIPE = gql`
  mutation LikeRecipe($likeRecipeInput: LikeRecipeInput!) {
    likeRecipe(input: $likeRecipeInput) {
      ...CurrentUserDetails
    }
  }
  ${currentUserDetails}
`;

export const UNLIKE_RECIPE = gql`
  mutation UnlikeRecipe($unlikeRecipeInput: UnlikeRecipeInput!) {
    unlikeRecipe(input: $unlikeRecipeInput) {
      ...CurrentUserDetails
    }
  }
  ${currentUserDetails}
`;

export const COMMENT_RECIPE = gql`
  mutation CommentRecipe($newComment: CommentRecipeInput!) {
    commentRecipe(input: $newComment) {
      ...RecipeDetails
    }
  }
  ${fullRecipeDetails}
`;

export const EDIT_COMMENT = gql`
  mutation EditComment($editedCommentData: EditCommentInput!) {
    editComment(input: $editedCommentData) {
      ...RecipeDetails
    }
  }
  ${fullRecipeDetails}
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($commentToDelete: DeleteCommentInput!) {
    deleteComment(input: $commentToDelete) {
      ...RecipeDetails
    }
  }
  ${fullRecipeDetails}
`;

export const DELETE_RECIPE = gql`
  mutation DeleteRecipe($deleteRecipeInput: DeleteRecipeInput!) {
    deleteRecipe(input: $deleteRecipeInput)
  }
`;
