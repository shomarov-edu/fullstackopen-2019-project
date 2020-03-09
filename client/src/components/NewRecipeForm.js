import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import useField from '../hooks/useField';
import mutations from '../graphql/mutations';

const NewRecipeForm = ({ user }) => {
  const [category, setCategory] = useState('');
  const title = useField('text');
  const description = useField('text');
  const cookingTime = useField('number');
  const [difficulty, setDifficulty] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [method, setMethod] = useState(['']);
  const [notes, setNotes] = useState(['']);
  const [tags, setTags] = useState(['']);
  const source = useField('text');

  const [createRecipe, createRecipeResult] = useMutation(
    mutations.CREATE_RECIPE
  );

  const handleSubmit = async event => {
    event.preventDefault();

    const newRecipeData = {
      category,
      title: title.input.value,
      description: description.input.value,
      cookingTime: parseInt(cookingTime.input.value),
      difficulty,
      ingredients,
      method,
      notes,
      tags,
      source: source.input.value
    };

    console.log(newRecipeData);

    createRecipe({ variables: { newRecipeData } });
  };

  console.log(createRecipeResult);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Category:
        <select
          name="categories"
          onChange={event => setCategory(event.target.value)}
        >
          <option value="">Please choose category</option>
          <option value="BREAKFAST">Breakfast</option>
          <option value="SALAD">Salad</option>
          <option value="SOUP">Soup</option>
          <option value="MAIN">Main</option>
          <option value="DESSERT">Dessert</option>
        </select>
        <br />
        Title:
        <input {...title.input} />
        <br />
        Description:
        <input {...description.input} />
        <br />
        Cooking time (minutes):
        <input {...cookingTime.input} />
        <br />
        <p>Difficulty:</p>
        <div>
          <input
            type="radio"
            id="easy"
            name="difficulty"
            value="EASY"
            onChange={event => setDifficulty(event.target.value)}
          />
          <label htmlFor="easy">Easy</label>
        </div>
        <div>
          <input
            type="radio"
            id="intermediate"
            name="difficulty"
            value="INTERMEDIATE"
            onChange={event => setDifficulty(event.target.value)}
          />
          <label htmlFor="intermediate">Intermediate</label>
        </div>
        <div>
          <input
            type="radio"
            id="hard"
            name="difficulty"
            value="HARD"
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
                  ingredients[index] = e.target.value;
                  setIngredients([...ingredients]);
                }}
              />
              <button
                type="button"
                onClick={() =>
                  setIngredients(
                    ingredients.filter((ingredient, i) => i !== index)
                  )
                }
              >
                remove
              </button>
              <br />
            </div>
          );
        })}
        <button
          type="button"
          onClick={() => setIngredients(ingredients.concat(''))}
        >
          Add
        </button>
        <p>method:</p>
        {method.map((value, index) => {
          return (
            <div key={index}>
              Step {index + 1}:
              <input
                value={value}
                onChange={e => {
                  method[index] = e.target.value;
                  setMethod([...method]);
                }}
              />
              <button
                type="button"
                onClick={() =>
                  setMethod(method.filter((step, i) => i !== index))
                }
              >
                remove
              </button>
              <br />
            </div>
          );
        })}
        <button type="button" onClick={() => setMethod(method.concat(''))}>
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
                  notes[index] = e.target.value;
                  setNotes([...notes]);
                }}
              />
              <button
                type="button"
                onClick={() => setNotes(notes.filter((note, i) => i !== index))}
              >
                remove
              </button>
              <br />
            </div>
          );
        })}
        <button type="button" onClick={() => setNotes(notes.concat(''))}>
          Add
        </button>
        <p>Additional notes:</p>
        {tags.map((value, index) => {
          return (
            <div key={index}>
              Tag {index + 1}:
              <input
                value={value}
                onChange={e => {
                  tags[index] = e.target.value;
                  setTags([...tags]);
                }}
              />
              <button
                type="button"
                onClick={() => setTags(tags.filter((tag, i) => i !== index))}
              >
                remove
              </button>
              <br />
            </div>
          );
        })}
        <button type="button" onClick={() => setTags(tags.concat(''))}>
          Add
        </button>
        <br />
        Source (if any):
        <input {...source.input} />
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default NewRecipeForm;
