import { gql } from '@apollo/client';

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
        id
      }
    }
  `,

  UNFOLLOW_USER: gql`
    mutation UnfollowUser($userToUnfollow: UnfollowUserInput!) {
      unfollowUser(input: $userToUnfollow) {
        id
      }
    }
  `,

  // RECIPE MUTATIONS:

  LIKE_RECIPE: gql`
    mutation LikeRecipe($recipeToLike: LikeRecipeInput!) {
      likeRecipe(input: $recipeToLike)
    }
  `,

  COMMENT_RECIPE: gql`
    mutation CommentRecipe($newComment: CommentRecipeInput!) {
      commentRecipe(input: $newComment) {
        id
      }
    }
  `,

  EDIT_COMMENT: gql`
    mutation EditComment($editedCommentData: EditCommentInput!) {
      editComment(input: $editedCommentData) {
        id
        author {
          name
          username
        }
        category
        title
        description
        cookingTime
        difficulty
        ingredients
        method
        notes
        tags
        source
        created
        updated
        published
        likedBy {
          username
        }
        comments {
          id
          author {
            username
          }
          content
        }
        rating
      }
    }
  `,

  DELETE_COMMENT: gql`
    mutation DeleteComment($commentToDelete: DeleteCommentInput!) {
      deleteComment(input: $commentToDelete) {
        id
        author {
          name
          username
        }
        category
        title
        description
        cookingTime
        difficulty
        ingredients
        method
        notes
        tags
        source
        created
        updated
        published
        likedBy {
          username
        }
        comments {
          id
          author {
            username
          }
          content
        }
        rating
      }
    }
  `
};

export default mutations;
