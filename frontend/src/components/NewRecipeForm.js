import React, { useState } from 'react'

const NewRecipeForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState([''])
  const [instructions, setInstructions] = useState('')
  const [notes, setNotes] = useState('')

  const style = { width: 242, height: 100 }

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
          {ingredients.map((value, index) => {
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
                      add
                    </button>
                  ) : null}
                </td>
              </tr>
            )
          })}
          <tr>
            <td>notes:</td>
            <td>
              <input value={notes} onChange={e => setNotes(e.target.value)} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default NewRecipeForm
