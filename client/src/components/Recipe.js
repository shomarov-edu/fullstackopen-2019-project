import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import useField from '../hooks/useField';
import queries from '../graphql/queries';
import Comments from './Comments';

const Recipe = ({ currentUser, recipeId }) => {
  const [edit, setEdit] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const title = useField('text');
  const description = useField('text');
  const time = useField('number');
  const [difficulty, setDifficulty] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [method, setMethod] = useState([]);
  const [notes, setNotes] = useState([]);
  const source = useField('text');

  const { loading, error, data } = useQuery(queries.RECIPE, {
    variables: { id: recipeId }
  });

  if (loading) return <div>loading...</div>;
  if (error) return <div>error recipe: {error.message}</div>;

  const recipe = data.recipe;

  if (!recipe) return null;

  const handleEdit = () => {
    setEdit(!edit);
    title.setValue(recipe.title);
    description.setValue(recipe.description);
    time.setValue(recipe.time);
    setDifficulty(recipe.difficulty);
    setIngredients(recipe.ingredients);
    setMethod(recipe.method);
    setNotes(recipe.notes);
    source.setValue(recipe.source);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const updatedRecipe = {
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

  const handleDelete = async () => {};

  if (edit) {
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
              defaultChecked={recipe.difficulty === 'easy'}
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
              defaultChecked={recipe.difficulty === 'intermediate'}
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
              defaultChecked={recipe.difficulty === 'hard'}
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
          <br />
          <button onClick={() => setEdit(!edit)}>cancel</button>
          <button type="submit">save</button>
        </form>
      </div>
    );
  }

  return (
    <React.Fragment>
      <p>
        {`Author: `}
        <Link to={`/users/${recipe.author.username}`}>
          {recipe.author.name}
        </Link>
      </p>
      <p>{recipe.title}</p>
      <p>{recipe.description}</p>
      <p>Cooking time: {recipe.cookingTime} minutes</p>
      <p>Difficulty: {recipe.difficulty}</p>
      Ingredients:
      <ul>
        {recipe.ingredients.map(i => (
          <li key={i}>{i}</li>
        ))}
      </ul>
      method:
      <ol>
        {recipe.method.map(i => (
          <li key={i}>{i}</li>
        ))}
      </ol>
      Additional notes:
      <ul>
        {recipe.notes.map(n => (
          <li key={n}>{n}</li>
        ))}
      </ul>
      <p>Source: {recipe.source}</p>
      <p>Date added: {recipe.created}</p>
      {currentUser && currentUser.username === recipe.author.username ? (
        <React.Fragment>
          <button onClick={() => handleEdit()}>edit recipe</button>
          <button onClick={() => handleDelete()}>delete recipe</button>
        </React.Fragment>
      ) : null}
      <br />
      <br />
      <button onClick={() => setShowComments(!showComments)}>
        {showComments ? 'hide comments' : 'show comments'}
      </button>
      <br />
      <br />
      {showComments ? (
        <Comments currentUser={currentUser} recipe={recipe} />
      ) : null}
    </React.Fragment>
  );
};

export default Recipe;
