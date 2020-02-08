import React, { useState } from 'react'
import useField from '../hooks/useField'
import recipeService from '../services/recipes'

const Comment = ({
  loggedInUser,
  comment,
  recipe,
  allRecipes,
  setAllRecipes
}) => {
  const commentField = useField('text')
  const [editing, setEditing] = useState(false)

  const showWhenEditing = { display: editing ? '' : 'none' }
  const hideWhenEditing = { display: editing ? 'none' : '' }

  const toggleVisibility = () => {
    setEditing(!editing)
    commentField.setValue(comment.comment)
  }

  const handleEdit = async () => {
    const newComment = {
      _id: comment._id,
      author: loggedInUser.id,
      comment: commentField.input.value
    }

    const updatedComments = recipe.comments.map(c =>
      c._id !== comment._id
        ? {
            _id: c._id,
            author: c.author.id !== undefined ? c.author.id : c.author,
            comment: c.comment
          }
        : newComment
    )

    const updatedRecipe = {
      ...recipe,
      comments: updatedComments
    }

    recipeService.setToken(loggedInUser.token)

    try {
      const savedRecipe = await recipeService.updateRecipe(
        recipe.id,
        updatedRecipe
      )
      console.log(savedRecipe)
      setAllRecipes(allRecipes.map(r => (r.id !== recipe.id ? r : savedRecipe)))
      commentField.reset()
      toggleVisibility()
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleDelete = async () => {
    const updatedComments = recipe.comments
      .filter(c => c._id !== comment._id)
      .map(c => ({
        _id: c._id,
        author: c.author.id !== undefined ? c.author.id : c.author,
        comment: c.comment
      }))

    const updatedRecipe = {
      ...recipe,
      comments: updatedComments
    }

    recipeService.setToken(loggedInUser.token)

    try {
      const savedRecipe = await recipeService.updateRecipe(
        recipe.id,
        updatedRecipe
      )
      setAllRecipes(allRecipes.map(r => (r.id !== recipe.id ? r : savedRecipe)))
      commentField.reset()
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <React.Fragment>
      <p>
        author: {comment.author.firstname} {comment.author.lastname}
      </p>
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
          <p>{comment.comment}</p>
        </React.Fragment>
      )}
      {loggedInUser.id === comment.author.id || comment.author ? (
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
  )
}

export default Comment
