const { gql } = require('apollo-server');
const currentUserDetails = require('./currentUserDetails');
const fullRecipeDetails = require('./fullRecipeDetails');

// AUTHENTICATION:

module.exports.LOGIN = gql`
  mutation LogIn($credentials: LogInInput!) {
    login(input: $credentials) {
      token
    }
  }
`;

module.exports.SIGNUP = gql`
  mutation SignUp($signUpData: SignUpInput!) {
    signup(input: $signUpData)
  }
`;

// USER MUTATIONS:

module.exports.FOLLOW_USER = gql`
  mutation FollowUser($userToFollow: FollowUserInput!) {
    followUser(input: $userToFollow) {
      ...CurrentUserDetails
    }
  }
  ${currentUserDetails}
`;

module.exports.UNFOLLOW_USER = gql`
  mutation UnfollowUser($userToUnfollow: UnfollowUserInput!) {
    unfollowUser(input: $userToUnfollow) {
      ...CurrentUserDetails
    }
  }
  ${currentUserDetails}
`;

module.exports.UPDATE_NAME = gql`
  mutation UpdateName($updateNameInput: UpdateNameInput!) {
    updateName(input: $updateNameInput) {
      ...CurrentUserDetails
    }
  }
  ${currentUserDetails}
`;

module.exports.UPDATE_EMAIL = gql`
  mutation UpdateEmail($updateEmailInput: UpdateEmailInput!) {
    updateEmail(input: $updateEmailInput) {
      ...CurrentUserDetails
    }
  }
  ${currentUserDetails}
`;

module.exports.UPDATE_USERNAME = gql`
  mutation UpdateUsername($updateUsernameInput: UpdateUsernameInput!) {
    updateUsername(input: $updateUsernameInput) {
      ...CurrentUserDetails
    }
  }
  ${currentUserDetails}
`;

module.exports.UPDATE_PASSWORD = gql`
  mutation UpdatePassword($updatePasswordInput: UpdatePasswordInput!) {
    updatePassword(input: $updatePasswordInput)
  }
`;

module.exports.DELETE_ACCOUNT = gql`
  mutation DeleteAccount($deleteAccountInput: DeleteAccountInput!) {
    deleteAccount(input: $deleteAccountInput)
  }
`;

// RECIPE MUTATIONS:

module.exports.CREATE_RECIPE = gql`
  mutation CreateRecipe($newRecipeData: CreateRecipeInput!) {
    createRecipe(input: $newRecipeData) {
      ...RecipeDetails
    }
  }
  ${fullRecipeDetails}
`;

module.exports.UPDATE_RECIPE = gql`
  mutation UpdateRecipe($updateRecipeInput: UpdateRecipeInput!) {
    updateRecipe(input: $updateRecipeInput) {
      ...RecipeDetails
    }
  }
  ${fullRecipeDetails}
`;

module.exports.PUBLISH_RECIPE = gql`
  mutation PublishRecipe($publishRecipeInput: PublishRecipeInput!) {
    publishRecipe(input: $publishRecipeInput) {
      ...RecipeDetails
    }
  }
  ${fullRecipeDetails}
`;

module.exports.UNPUBLISH_RECIPE = gql`
  mutation UnpublishRecipe($unpublishRecipeInput: UnpublishRecipeInput!) {
    unpublishRecipe(input: $unpublishRecipeInput) {
      ...RecipeDetails
    }
  }
  ${fullRecipeDetails}
`;

module.exports.LIKE_RECIPE = gql`
  mutation LikeRecipe($likeRecipeInput: LikeRecipeInput!) {
    likeRecipe(input: $likeRecipeInput) {
      ...CurrentUserDetails
    }
  }
  ${currentUserDetails}
`;

module.exports.UNLIKE_RECIPE = gql`
  mutation UnlikeRecipe($unlikeRecipeInput: UnlikeRecipeInput!) {
    unlikeRecipe(input: $unlikeRecipeInput) {
      ...CurrentUserDetails
    }
  }
  ${currentUserDetails}
`;

module.exports.COMMENT_RECIPE = gql`
  mutation CommentRecipe($newComment: CommentRecipeInput!) {
    commentRecipe(input: $newComment) {
      ...RecipeDetails
    }
  }
  ${fullRecipeDetails}
`;

module.exports.EDIT_COMMENT = gql`
  mutation EditComment($editedCommentData: EditCommentInput!) {
    editComment(input: $editedCommentData) {
      ...RecipeDetails
    }
  }
  ${fullRecipeDetails}
`;

module.exports.DELETE_COMMENT = gql`
  mutation DeleteComment($commentToDelete: DeleteCommentInput!) {
    deleteComment(input: $commentToDelete) {
      ...RecipeDetailsTest
    }
  }
  ${fullRecipeDetails}
`;

module.exports.RATE_RECIPE = gql`
  mutation RateRecipe($rateRecipeInput: RateRecipeInput!) {
    rateRecipe(input: $rateRecipeInput) {
      ...RecipeDetailsTest
    }
  }
  ${fullRecipeDetails}
`;

module.exports.DELETE_RECIPE = gql`
  mutation DeleteRecipe($deleteRecipeInput: DeleteRecipeInput!) {
    deleteRecipe(input: $deleteRecipeInput)
  }
`;
