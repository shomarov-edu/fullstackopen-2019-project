import React from 'react'
import { Link } from 'react-router-dom'

const Recipes = ({ recipes }) => {
  const titles = recipes.map(recipe => (
    <Link
      style={{ margin: 20 }}
      to={`/api/recipes/${recipe.id}`}
      key={recipe.id}
    >
      {recipe.title}
    </Link>
  ))

  return <h1>{titles}</h1>
}

export default Recipes
