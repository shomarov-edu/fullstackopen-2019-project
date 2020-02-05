import React, { useState } from 'react'
import useField from '../hooks/useField'
import recipeService from '../services/recipes'

const NewRecipeForm = ({ loggedInUser }) => {
  const title = useField('text')
  const description = useField('text')
  const time = useField('number')
  const [difficulty, setDifficulty] = useState('')
  const [ingredients, setIngredients] = useState([''])
  const [instructions, setInstructions] = useState([''])
  const [notes, setNotes] = useState([''])
  const source = useField('text')

  const handleSubmit = async event => {
    event.preventDefault()

    const recipe = {
      title: title.input.value,
      description: description.input.value,
      time: time.input.value,
      difficulty,
      ingredients,
      instructions,
      source: source.input.value
    }

    recipeService.setToken(loggedInUser.token)

    try {
      await recipeService.createNewRecipe(recipe)
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Title:
        <input {...title.input} />
        <br />
        Description:
        <input {...description.input} />
        <br />
        Cooking time (minutes):
        <input {...time.input} />
        <br />
        <p>Difficulty:</p>
        <div>
          <input
            type="radio"
            id="easy"
            name="difficulty"
            value="easy"
            onChange={event => setDifficulty(event.target.value)}
          />
          <label htmlFor="easy">Easy</label>
        </div>
        <div>
          <input
            type="radio"
            id="intermediate"
            name="difficulty"
            value="intermediate"
            onChange={event => setDifficulty(event.target.value)}
          />
          <label htmlFor="intermediate">Intermediate</label>
        </div>
        <div>
          <input
            type="radio"
            id="hard"
            name="difficulty"
            value="hard"
            onChange={event => setDifficulty(event.target.value)}
          />
          <label htmlFor="hard">Hard</label>
        </div>
        <p>Ingredients:</p>
        {ingredients.map((value, index) => {
          return (
            <div key={index}>
              Ingredient {index + 1}:
              <input
                value={value}
                onChange={e => {
                  ingredients[index] = e.target.value
                  setIngredients([...ingredients])
                }}
              />
              <br />
            </div>
          )
        })}
        <button
          type="button"
          onClick={() => setIngredients(ingredients.concat(''))}
        >
          Add
        </button>
        <p>Instructions:</p>
        {instructions.map((value, index) => {
          return (
            <div key={index}>
              Step {index + 1}:
              <input
                value={value}
                onChange={e => {
                  instructions[index] = e.target.value
                  setInstructions([...instructions])
                }}
              />
              <br />
            </div>
          )
        })}
        <button
          type="button"
          onClick={() => setInstructions(instructions.concat(''))}
        >
          Add
        </button>
        <p>Additional notes:</p>
        {notes.map((value, index) => {
          return (
            <div key={index}>
              Note {index + 1}:
              <input
                value={value}
                onChange={e => {
                  notes[index] = e.target.value
                  setNotes([...notes])
                }}
              />
              <br />
            </div>
          )
        })}
        <button type="button" onClick={() => setNotes(notes.concat(''))}>
          Add
        </button>
        <br />
        Source (if any):
        <input {...source.input} />
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default NewRecipeForm
