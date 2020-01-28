import React from 'react'

const Recipe = ({ recipe }) => {
  console.log('recipe', recipe)
  if (!recipe) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>description: {recipe.description}</p>
      <p>cooking time: {recipe.time} minutes</p>
      <p>difficulty: {recipe.difficulty}</p>
      <div>ingredients:</div>
      <ol>
        {recipe.ingredients.map(i => (
          <li key={i}>{i}</li>
        ))}
      </ol>
      <div>instructions:</div>
      <ol>
        {recipe.instructions.map(i => (
          <li key={i}>{i}</li>
        ))}
      </ol>
      <div>notes:</div>
      <ul>
        {recipe.notes.map(n => (
          <li key={n}>{n}</li>
        ))}
      </ul>
      <p>
        source: <a href={recipe.source}>{recipe.source}</a>
      </p>
    </div>
  )
}

export default Recipe
