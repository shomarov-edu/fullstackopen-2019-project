import React from 'react'
import { Link } from 'react-router-dom'

const UserRecipes = ({ user }) => {
  const titles = user.recipes.map(recipe => (
    <li key={recipe.id}>
      <Link style={{ margin: 20 }} to={`/${user.email}/recipes/${recipe.id}`}>
        {recipe.title}
      </Link>
    </li>
  ))

  return <ul>{titles}</ul>
}

export default UserRecipes
