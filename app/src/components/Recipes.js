import React from 'react'
import { Link } from 'react-router-dom'

const Recipes = ({ user }) => {
  console.log('recipes', user)
  if (!user) return null

  const titles = user.myRecipes.map(recipe => (
    <li key={recipe.id}>
      <Link to={`/${user.username}/recipes/${recipe.id}`}>{recipe.title}</Link>
    </li>
  ))

  return <ul>{titles}</ul>
}

export default Recipes
