import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import useField from '../hooks/useField';
import { CREATE_RECIPE } from '../graphql/mutations';
import { ME } from '../graphql/queries';

const NewRecipeForm = ({ getCurrentUser, notify }) => {
  const [category, setCategory] = useState('');
  const title = useField('text');
  const description = useField('text');
  const cookingTime = useField('number');
  const [difficulty, setDifficulty] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [method, setMethod] = useState(['']);
  const [notes, setNotes] = useState(['']);
  const [tags, setTags] = useState(['']);

  const [createRecipe] = useMutation(CREATE_RECIPE, {
    onCompleted: async () => {
      setCategory('');
      title.reset();
      description.reset();
      cookingTime.reset();
      setDifficulty('');
      setIngredients(['']);
      setMethod(['']);
      setNotes(['']);
      setTags(['']);
    },
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors && graphQLErrors[0].message)
        notify(graphQLErrors[0].message);
      if (networkError) console.log(`[Network error]: ${networkError}`);
    },
    update: async (cache, { data: { createRecipe } }) => {
      const data = cache.readQuery({ query: ME });
      const newMe = {
        ...data.me,
        recipes: data.me.recipes.concat(createRecipe)
      };
      await cache.writeQuery({
        query: ME,
        data: { me: newMe }
      });
      const updatedData = cache.readQuery({ query: ME });
    }
  });

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
      tags
    };

    createRecipe({ variables: { newRecipeData } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Category:
        <select
          name="categories"
          onChange={event => setCategory(event.target.value)}
          required
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
        <input {...cookingTime.input} required />
        <br />
        <p>Difficulty:</p>
        <div>
          <input
            type="radio"
            id="easy"
            name="difficulty"
            value="EASY"
            required
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
        <p>
          <button type="submit">Save</button>
        </p>
      </form>
    </div>
  );
};

export default NewRecipeForm;
