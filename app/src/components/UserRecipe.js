import React from 'react'
import { Link } from 'react-router-dom'

const UserRecipe = ({ recipe }) => {
  if (!recipe) return null

  return (
    <React.Fragment>
      <p>
        {`Author: `}
        <Link to={`/${recipe.author.username}`}>
          {recipe.author.firstname} {recipe.author.lastname}
        </Link>
      </p>
      <p>{recipe.title}</p>
      <p>{recipe.description}</p>
      <p>Cooking time: {recipe.time}</p>
      <p>Difficulty: {recipe.difficulty}</p>
      Ingredients:
      <ul>
        {recipe.ingredients.map(i => (
          <li key={i}>{i}</li>
        ))}
      </ul>
      Instructions:
      <ol>
        {recipe.instructions.map(i => (
          <li key={i}>{i}</li>
        ))}
      </ol>
      Additional notes:
      <ul>
        {recipe.notes.map(n => (
          <li key={n}>{n}</li>
        ))}
      </ul>
      <p>Source: {recipe.source}</p>
      <p>Date added: {recipe.date}</p>
    </React.Fragment>
  )
}

export default UserRecipe
