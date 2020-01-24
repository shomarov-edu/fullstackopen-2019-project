import React from 'react'
import { Link } from 'react-router-dom'

const Recipes = ({ recipes }) => {
  return (
    <ul>
      {recipes.map(recipe => (
        <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
          <li>
            <h2>{recipe.title}</h2>
          </li>
        </Link>
      ))}
    </ul>
  )
}

export default Recipes
