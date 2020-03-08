import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import useField from '../hooks/useField';
import mutations from '../graphql/mutations';

const Comment = ({ currentUser, comment, recipeId }) => {
  const commentField = useField('text');
  const [editing, setEditing] = useState(false);
  const [editComment] = useMutation(mutations.EDIT_COMMENT);
  const [deleteComment] = useMutation(mutations.DELETE_COMMENT);

  const showWhenEditing = { display: editing ? '' : 'none' };
  const hideWhenEditing = { display: editing ? 'none' : '' };

  const toggleVisibility = () => {
    setEditing(!editing);
    commentField.setValue(comment.content);
  };

  const handleEdit = async () => {
    const editedCommentData = {
      recipeId,
      commentId: comment.id,
      content: commentField.input.value
    };

    editComment({
      variables: { editedCommentData }
    });
  };

  const handleDelete = async () => {
    const commentToDelete = {
      recipeId,
      commentId: comment.id
    };

    deleteComment({
      variables: { commentToDelete }
    });
  };

  return (
    <React.Fragment>
      <p>author: {comment.author.name}</p>
      {editing ? (
        <>
          <p>
            <input {...commentField.input}></input>
          </p>
          <button style={showWhenEditing} onClick={toggleVisibility}>
            cancel
          </button>
          <button style={showWhenEditing} onClick={handleEdit}>
            save
          </button>
        </>
      ) : (
        <React.Fragment>
          <p>{comment.content}</p>
        </React.Fragment>
      )}
      {currentUser.id === comment.author.id || comment.author ? (
        <>
          <button style={hideWhenEditing} onClick={toggleVisibility}>
            edit
          </button>
          <button style={hideWhenEditing} onClick={handleDelete}>
            delete
          </button>
        </>
      ) : (
        <button>like</button>
      )}
    </React.Fragment>
  );
};

export default Comment;
