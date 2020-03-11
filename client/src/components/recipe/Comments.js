import React from 'react';
import { useMutation } from '@apollo/client';
import useField from '../../hooks/useField';
import Comment from './Comment';
import { COMMENT_RECIPE } from '../../graphql/mutations';

const Comments = ({ currentUser, recipe }) => {
  const commentField = useField('text');
  const [commentRecipe] = useMutation(COMMENT_RECIPE);

  const handleSubmit = async event => {
    event.preventDefault();

    const newComment = {
      id: recipe.id,
      content: commentField.input.value
    };

    commentRecipe({ variables: { newComment } });

    commentField.reset();
  };

  return (
    <React.Fragment>
      {currentUser ? (
        <form onSubmit={handleSubmit}>
          <input {...commentField.input} />
          <button type="submit">send</button>
        </form>
      ) : null}
      <br />
      {recipe.comments.map(comment => {
        return (
          <Comment
            key={comment.id}
            currentUser={currentUser}
            comment={comment}
            recipeId={recipe.id}
          />
        );
      })}
    </React.Fragment>
  );
};

export default Comments;
