import React, { useState } from 'react'

const NewRecipeForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [ingredients, setIngredients] = useState([''])
  const [instructions, setInstructions] = useState([''])
  const [notes, setNotes] = useState([''])
  const [source, setSource] = useState('')

  const style = { width: 242, height: 100 }

  const renderIngredients = () => {
    return ingredients.map((value, index) => {
      return (
        <tr key={index}>
          {index === 0 ? <td>ingredients:</td> : <td />}
          <td>
            <input
              value={value}
              onChange={e => {
                ingredients[index] = e.target.value
                setIngredients([...ingredients])
              }}
            ></input>
            {index === ingredients.length - 1 ? (
              <button
                onClick={() => setIngredients(ingredients.concat(''))}
                style={{ margin: 5 }}
              >
                +
              </button>
            ) : null}
          </td>
        </tr>
      )
    })
  }

  const renderInstructions = () => {
    return instructions.map((value, index) => {
      return (
        <tr key={index}>
          {index === 0 ? <td>instructions:</td> : <td />}
          <td>
            <input
              value={value}
              onChange={e => {
                instructions[index] = e.target.value
                setInstructions([...instructions])
              }}
            ></input>
            {index === instructions.length - 1 ? (
              <button
                onClick={() => setInstructions(instructions.concat(''))}
                style={{ margin: 5 }}
              >
                +
              </button>
            ) : null}
          </td>
        </tr>
      )
    })
  }

  const renderNotes = () => {
    return notes.map((value, index) => {
      return (
        <tr key={index}>
          {index === 0 ? <td>notes:</td> : <td />}
          <td>
            <input
              value={value}
              onChange={e => {
                notes[index] = e.target.value
                setNotes([...notes])
              }}
            ></input>
            {index === notes.length - 1 ? (
              <button
                onClick={() => setNotes(notes.concat(''))}
                style={{ margin: 5 }}
              >
                +
              </button>
            ) : null}
          </td>
        </tr>
      )
    })
  }

  return (
    <div>
      <h2>Create new recipe</h2>
      <table>
        <tbody>
          <tr>
            <td>title:</td>
            <td>
              <input value={title} onChange={e => setTitle(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td>description:</td>
            <td>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                style={style}
              />
            </td>
          </tr>
          <tr>
            <td>cooking time:</td>
            <td>
              <input
                type="number"
                value={cookingTime}
                onChange={e => setCookingTime(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>difficulty:</td>
            <td>
              <input type="radio" name="difficulty" value="easy" />
              Easy
              <input type="radio" name="difficulty" value="intermediate" />
              Intermediate
              <input type="radio" name="difficulty" value="hard" />
              Hard
            </td>
          </tr>
          {renderIngredients()}
          {renderInstructions()}
          {renderNotes()}
          <tr>
            <td>source:</td>
            <td>
              <input
                type="url"
                value={source}
                onChange={e => setSource(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button>Save</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default NewRecipeForm
