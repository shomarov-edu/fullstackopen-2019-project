import React from 'react'
import { Link } from 'react-router-dom'
import useField from '../hooks/useField'

const AllRecipes = ({ recipes }) => {
  const search = useField('text')

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(search.input.value.toLowerCase())
  )

  const titles = filteredRecipes.map(recipe => (
    <li key={recipe.id}>
      <Link
        style={{ margin: 20 }}
        to={`/${recipe.author.username}/recipes/${recipe.id}`}
      >
        {recipe.title}
      </Link>
    </li>
  ))

  return (
    <React.Fragment>
      <p>Search recipes:</p>
      <input {...search.input}></input>
      <br />
      <br />
      <button onClick={() => search.reset()}>clear</button>
      <ul>{titles}</ul>
    </React.Fragment>
  )
}

export default AllRecipes
