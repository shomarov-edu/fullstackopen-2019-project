import React from 'react'
import useField from '../hooks/useField'
import recipeService from '../services/recipes'

const Comments = ({ loggedInUser, recipe, allRecipes, setAllRecipes }) => {
  const comment = useField('text')

  const handleSubmit = async event => {
    event.preventDefault()

    const updatedRecipe = {
      ...recipe,
      comments: recipe.comments.concat({
        author: loggedInUser.id,
        comment: comment.input.value
      })
    }

    recipeService.setToken(loggedInUser.token)

    try {
      const savedRecipe = await recipeService.updateRecipe(
        recipe.id,
        updatedRecipe
      )
      setAllRecipes(allRecipes.map(r => (r.id !== recipe.id ? r : savedRecipe)))
      comment.reset()
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <input {...comment.input} />
        <button type="submit">send</button>
      </form>
      <br />
      {recipe.comments.map((c, index) => (
        <div key={index}>{c.comment}</div>
      ))}
    </React.Fragment>
  )
}

export default Comments
