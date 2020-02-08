import React from 'react'
import { Link } from 'react-router-dom'

const MyRecipes = ({ user }) => {
  console.log(user)
  if (!user) return null

  const titles = user.recipes.map(recipe => (
    <li key={recipe.id}>
      <Link to={`/${user.username}/recipes/${recipe.id}`}>{recipe.title}</Link>
    </li>
  ))

  return <ul>{titles}</ul>
}

export default MyRecipes
