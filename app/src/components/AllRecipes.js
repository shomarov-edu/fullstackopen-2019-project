import React from 'react'
import { Link } from 'react-router-dom'

const AllRecipes = ({ recipes }) => {
  const titles = recipes.map(recipe => (
    <li key={recipe.id}>
      <Link
        style={{ margin: 20 }}
        to={`/${recipe.author.username}/recipes/${recipe.id}`}
      >
        {recipe.title}
      </Link>
    </li>
  ))

  return <ul>{titles}</ul>
}

export default AllRecipes
