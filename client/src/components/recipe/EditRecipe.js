import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import useField from '../../hooks/useField';
import { RECIPE } from '../../graphql/queries';
import Comments from './Comments';
import { capitalize } from 'lodash';

const EditRecipe = ({
  setEdit,
  edit,
  title,
  description,
  time,
  difficulty,
  setDifficulty,
  ingredients,
  setIngredients,
  method,
  setMethod,
  notes,
  setNotes,
  source
}) => {
  const handleSubmit = async event => {
    event.preventDefault();

    const updatedRecipeData = {
      title: title.input.value,
      description: description.input.value,
      time: time.input.value,
      difficulty,
      ingredients,
      method,
      notes,
      source: source.input.value
    };

    setEdit(!edit);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>
          <button onClick={() => setEdit(!edit)}>cancel</button>
          <button type="submit">save</button>
        </p>
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
                onClick={e => {
                  ingredients.splice(index, 1);
                  setIngredients([...ingredients]);
                }}
              >
                delete
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
                onClick={e => {
                  method.splice(index, 1);
                  setMethod([...method]);
                }}
              >
                delete
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
                onClick={e => {
                  notes.splice(index, 1);
                  setNotes([...notes]);
                }}
              >
                delete
              </button>
              <br />
            </div>
          );
        })}
        <button type="button" onClick={() => setNotes(notes.concat(''))}>
          Add
        </button>
        <br />
        Source (if any):
        <input {...source.input} />
      </form>
    </div>
  );
};

export default EditRecipe;
