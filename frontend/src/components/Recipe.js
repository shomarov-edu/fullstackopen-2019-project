import React from 'react'
import RecipeTitle from './Title'

const Recipe = ({ recipe }) => {
  console.log(recipe)

  return (
    <div>
      <RecipeTitle title={recipe.title} />
      <div>recipe id no.{recipe.id}</div>
    </div>
  )
}

export default Recipe
