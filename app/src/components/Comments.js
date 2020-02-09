import React from 'react'
import useField from '../hooks/useField'
import recipeService from '../services/recipes'
import Comment from './Comment'

const Comments = ({ loggedInUser, recipe, allRecipes, setAllRecipes }) => {
  const commentField = useField('text')

  const handleSubmit = async event => {
    event.preventDefault()

    const newComment = {
      author: loggedInUser.id,
      comment: commentField.input.value
    }

    recipeService.setToken(loggedInUser.token)

    const comments = recipe.comments.map(c => ({
      _id: c._id,
      author: c.author.id !== undefined ? c.author.id : c.author,
      comment: c.comment
    }))

    const updatedRecipe = {
      ...recipe,
      comments: comments.concat(newComment)
    }

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
      <form onSubmit={handleSubmit}>
        <input {...commentField.input} />
        <button type="submit">send</button>
      </form>
      <br />
      {recipe.comments.map((comment, index) => {
        return (
          <Comment
            key={index}
            loggedInUser={loggedInUser}
            comment={comment}
            recipe={recipe}
            allRecipes={allRecipes}
            setAllRecipes={setAllRecipes}
          />
        )
      })}
    </React.Fragment>
  )
}

export default Comments
