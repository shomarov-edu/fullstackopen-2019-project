import React from 'react'

const Recipe = ({ recipe }) => {
  if (!recipe) return null

  return (
    <div style={{ margin: 20 }}>
      <h1>{recipe.title}</h1>
      <h2>{recipe.description}</h2>
      <h3>Cooking time: {recipe.time}</h3>
      <h3>Difficulty: {recipe.difficulty}</h3>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map(i => (
          <li key={i}>{i}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <ol>
        {recipe.instructions.map(i => (
          <li key={i}>{i}</li>
        ))}
      </ol>
      <h3>Additional notes:</h3>
      <ul>
        {recipe.notes.map(n => (
          <li key={n}>{n}</li>
        ))}
      </ul>
      <h4>Source: {recipe.source}</h4>
      <h5>Date added: {recipe.date}</h5>
    </div>
  )
}

export default Recipe
