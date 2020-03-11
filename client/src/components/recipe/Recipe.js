import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import useField from '../../hooks/useField';
import { RECIPE } from '../../graphql/queries';
import { LIKE_RECIPE, UNLIKE_RECIPE } from '../../graphql/mutations';
import Comments from './Comments';
import EditRecipe from './EditRecipe';
import { capitalize } from 'lodash';

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

  const { loading, error, data } = useQuery(RECIPE, {
    variables: { id: recipeId }
  });

  const [likeRecipe, likeRecipeResult] = useMutation(LIKE_RECIPE);
  const [unlikeRecipe, unlikeRecipeResult] = useMutation(UNLIKE_RECIPE);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error recipe: {error.message}</div>;

  console.log(data);

  const recipe = data.recipe;
  console.log(recipe.likedBy);

  if (!recipe) return null;

  const toggleEdit = () => {
    setEdit(!edit);
    title.setValue(recipe.title);
    description.setValue(recipe.description);
    time.setValue(recipe.time);
    setDifficulty(recipe.difficulty);
    setIngredients(recipe.ingredients);
    setMethod(recipe.method);
    setNotes(recipe.notes);
    source.setValue(recipe.source || '');
  };

  const handleLike = async () => {
    const likeRecipeInput = { recipeId: recipe.id };
    likeRecipe({ variables: { likeRecipeInput } });
  };

  const handleUnlike = async () => {
    const unlikeRecipeInput = { recipeId: recipe.id };
    unlikeRecipe({ variables: { unlikeRecipeInput } });
  };

  const handleDelete = async () => {};

  const handleRate = event => {
    event.preventDefault();
    console.log(event.target.value);
  };

  console.log(likeRecipeResult);

  if (edit) {
    return (
      <EditRecipe
        setEdit={setEdit}
        edit={edit}
        title={title}
        description={description}
        time={time}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        setIngredients={setIngredients}
        ingredients={ingredients}
        method={method}
        setMethod={setMethod}
        notes={notes}
        setNotes={setNotes}
        source={source}
      />
    );
  }

  return (
    <React.Fragment>
      {currentUser && currentUser.username === recipe.author.username ? (
        <React.Fragment>
          <p>
            <button onClick={() => toggleEdit()}>edit recipe</button>
            <button onClick={() => handleDelete()}>delete recipe</button>
          </p>
        </React.Fragment>
      ) : null}
      <p>
        {`Author: `}
        <Link to={`/users/${recipe.author.username}`}>
          {recipe.author.name}
        </Link>
      </p>
      <p>Category: {capitalize(recipe.category)}</p>
      <p>Title: {recipe.title}</p>
      <p>Description: {recipe.description}</p>
      <p>Cooking time: {recipe.cookingTime} minutes</p>
      <p>Difficulty: {capitalize(recipe.difficulty)}</p>
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
      {recipe.tags.length > 0 ? (
        <React.Fragment>
          Tags:
          <ul>
            {recipe.tags.map(t => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </React.Fragment>
      ) : null}
      <p>Source: {recipe.source}</p>
      <p>Date added: {recipe.created}</p>
      <p>Last updated: {recipe.updated}</p>
      <p>
        Likes: {recipe.likes}
        {currentUser ? (
          currentUser.id !== recipe.author.id ? (
            recipe.likedBy.some(user => user.id === currentUser.id) ? (
              <button onClick={() => handleUnlike()}>unlike</button>
            ) : (
              <button onClick={() => handleLike()}>like</button>
            )
          ) : null
        ) : null}
      </p>
      <p>Rating: {recipe.rating > 0 ? recipe.rating : 'not rated yet'}</p>
      {currentUser ? (
        currentUser.id !== recipe.author.id ? (
          <p>
            Rate recipe:
            <button value="1" onClick={event => handleRate(event)}>
              1
            </button>
            <button value="2" onClick={event => handleRate(event)}>
              2
            </button>
            <button value="3" onClick={event => handleRate(event)}>
              3
            </button>
            <button value="4" onClick={event => handleRate(event)}>
              4
            </button>
            <button value="5" onClick={event => handleRate(event)}>
              5
            </button>
          </p>
        ) : null
      ) : null}
      <p>Comments: {recipe.commentCount}</p>
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
