import React from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_RECIPE } from '../../graphql/mutations';
import Recipe from './Recipe';

const EditRecipe = ({
  recipe,
  setEdit,
  edit,
  category,
  setCategory,
  title,
  description,
  cookingTime,
  difficulty,
  setDifficulty,
  ingredients,
  setIngredients,
  method,
  setMethod,
  notes,
  setNotes
}) => {
  const [updateRecipe, updateRecipeResult] = useMutation(UPDATE_RECIPE, {
    onCompleted: () => setEdit(false),
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      }
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }
  });

  console.log(updateRecipeResult);

  const handleSubmit = async event => {
    event.preventDefault();

    const updateRecipeInput = {
      id: recipe.id,
      category,
      title: title.input.value,
      description: description.input.value,
      cookingTime: cookingTime.input.value,
      difficulty,
      ingredients,
      method,
      notes
    };

    updateRecipe({ variables: { updateRecipeInput } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>
          <button onClick={() => setEdit(!edit)}>cancel</button>
          <button type="submit">save</button>
        </p>
        <p>
          Category:
          <select
            name="categories"
            onChange={event => setCategory(event.target.value)}
            value={category}
          >
            <option value="">Please choose category</option>
            <option value="BREAKFAST">Breakfast</option>
            <option value="SALAD">Salad</option>
            <option value="SOUP">Soup</option>
            <option value="MAIN">Main</option>
            <option value="DESSERT">Dessert</option>
          </select>
        </p>
        <p>
          Title:
          <input {...title.input} />
        </p>
        <p>
          Description:
          <input {...description.input} />
        </p>
        <p>
          Cooking time (minutes):
          <input {...cookingTime.input} />
        </p>
        <p>Difficulty:</p>
        <div>
          <input
            type="radio"
            id="easy"
            name="difficulty"
            value="EASY"
            defaultChecked={difficulty === 'EASY'}
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
            defaultChecked={difficulty === 'INTERMEDIATE'}
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
            defaultChecked={difficulty === 'HARD'}
            onChange={event => setDifficulty(event.target.value)}
          />
          <label htmlFor="hard">Hard</label>
        </div>
        <p>Ingredients:</p>
        {ingredients.map((value, index) => {
          return (
            <p key={index}>
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
                onClick={e => {
                  setIngredients(
                    ingredients.filter((ingredient, i) => i !== index)
                  );
                }}
              >
                delete
              </button>
              <br />
            </p>
          );
        })}
        <button
          type="button"
          onClick={() => setIngredients(ingredients.concat(''))}
        >
          Add
        </button>
        <p>Method:</p>
        {method.map((value, index) => {
          return (
            <p key={index}>
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
                onClick={e => {
                  setMethod(method.filter((m, i) => i !== index));
                }}
              >
                delete
              </button>
              <br />
            </p>
          );
        })}
        <button type="button" onClick={() => setMethod(method.concat(''))}>
          Add
        </button>
        <p>Additional notes:</p>
        {notes.map((value, index) => {
          return (
            <p key={index}>
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
                onClick={e => {
                  setNotes(notes.filter((n, i) => i !== index));
                }}
              >
                delete
              </button>
              <br />
            </p>
          );
        })}
        <button type="button" onClick={() => setNotes(notes.concat(''))}>
          Add
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
