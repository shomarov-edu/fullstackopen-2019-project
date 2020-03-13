import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import useField from '../../hooks/useField';
import { ME, RECIPE } from '../../graphql/queries';
import {
  LIKE_RECIPE,
  UNLIKE_RECIPE,
  PUBLISH_RECIPE,
  UNPUBLISH_RECIPE,
  RATE_RECIPE,
  DELETE_RECIPE
} from '../../graphql/mutations';
import Comments from './Comments';
import EditRecipe from './EditRecipe';
import { capitalize } from 'lodash';

const Recipe = ({ currentUser, recipeId, history }) => {
  const [edit, setEdit] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [category, setCategory] = useState('');
  const title = useField('text');
  const description = useField('text');
  const cookingTime = useField('number');
  const [difficulty, setDifficulty] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [method, setMethod] = useState([]);
  const [notes, setNotes] = useState([]);

  const { loading, error, data } = useQuery(RECIPE, {
    variables: { id: recipeId }
  });

  const [publishRecipe] = useMutation(PUBLISH_RECIPE, {
    update: async (cache, { data: { publishRecipe } }) => {
      const data = cache.readQuery({ query: ME });
      const newMe = {
        ...data.me,
        publishedRecipes: data.me.publishedRecipes.concat(publishRecipe)
      };
      await cache.writeQuery({
        query: ME,
        data: { me: newMe }
      });
    }
  });

  const [unpublishRecipe] = useMutation(UNPUBLISH_RECIPE, {
    update: async (cache, { data: { unpublishRecipe } }) => {
      const data = cache.readQuery({ query: ME });
      const newMe = {
        ...data.me,
        publishedRecipes: data.me.publishedRecipes.filter(
          recipe => recipe.id !== unpublishRecipe.id
        )
      };
      await cache.writeQuery({
        query: ME,
        data: { me: newMe }
      });
    }
  });

  const [likeRecipe] = useMutation(LIKE_RECIPE);

  const [unlikeRecipe] = useMutation(UNLIKE_RECIPE, {
    update: async (cache, { data: { unlikeRecipe } }) => {
      const data = cache.readQuery({
        query: RECIPE,
        variables: {
          id: recipe.id
        }
      });
      const newRecipe = {
        ...data.recipe,
        likedBy: recipe.likedBy.filter(user => user.id !== currentUser.id),
        likes: recipe.likes - 1
      };
      await cache.writeQuery({
        query: RECIPE,
        data: { recipe: newRecipe }
      });
    }
  });

  const [rateRecipe, rateRecipeResult] = useMutation(RATE_RECIPE, {
    refetchQuery: [{ query: RECIPE, variables: { recipeId } }]
  });

  const [deleteRecipe] = useMutation(DELETE_RECIPE, {
    onCompleted: () => {
      history.push(`/users/${currentUser.username}/recipes`);
    }
  });

  if (loading) return <div>loading...</div>;
  if (error) return <div>error recipe: {error.message}</div>;

  const recipe = data.recipe;

  if (!recipe) return null;

  const toggleEdit = () => {
    setEdit(!edit);
    setCategory(recipe.category);
    title.setValue(recipe.title);
    description.setValue(recipe.description);
    cookingTime.setValue(recipe.cookingTime);
    setDifficulty(recipe.difficulty);
    setIngredients(recipe.ingredients);
    setMethod(recipe.method);
    setNotes(recipe.notes);
  };

  const handlePublishRecipe = () => {
    const publishRecipeInput = { recipeId: recipe.id };
    publishRecipe({ variables: { publishRecipeInput } });
  };

  const handleUnpublishRecipe = () => {
    const unpublishRecipeInput = { recipeId: recipe.id };
    unpublishRecipe({ variables: { unpublishRecipeInput } });
  };

  const handleLike = async () => {
    const likeRecipeInput = { recipeId: recipe.id };
    likeRecipe({ variables: { likeRecipeInput } });
  };

  const handleUnlike = async () => {
    const unlikeRecipeInput = { recipeId: recipe.id };
    unlikeRecipe({ variables: { unlikeRecipeInput } });
  };

  const handleDelete = async () => {
    const deleteRecipeInput = { recipeId: recipe.id };
    deleteRecipe({ variables: { deleteRecipeInput } });
  };

  const handleRateRecipe = event => {
    const rateRecipeInput = {
      recipeId: recipe.id,
      grade: parseInt(event.target.value)
    };
    rateRecipe({ variables: { rateRecipeInput } });
  };

  if (edit) {
    return (
      <EditRecipe
        recipe={recipe}
        setEdit={setEdit}
        edit={edit}
        category={category}
        setCategory={setCategory}
        title={title}
        description={description}
        cookingTime={cookingTime}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        setIngredients={setIngredients}
        ingredients={ingredients}
        method={method}
        setMethod={setMethod}
        notes={notes}
        setNotes={setNotes}
      />
    );
  }

  return (
    <React.Fragment>
      {currentUser && currentUser.username === recipe.author.username ? (
        <React.Fragment>
          <p>
            {!recipe.published ? (
              <button onClick={() => handlePublishRecipe()}>
                publish recipe
              </button>
            ) : (
              <button onClick={() => handleUnpublishRecipe()}>
                unpublish recipe
              </button>
            )}
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
        {recipe.ingredients.map((i, index) => (
          <li key={index}>{i}</li>
        ))}
      </ul>
      method:
      <ol>
        {recipe.method.map((i, index) => (
          <li key={index}>{i}</li>
        ))}
      </ol>
      Additional notes:
      <ul>
        {recipe.notes.map((n, index) => (
          <li key={index}>{n}</li>
        ))}
      </ul>
      {recipe.tags.length > 0 ? (
        <React.Fragment>
          Tags:
          <ul>
            {recipe.tags.map((t, index) => (
              <li key={index}>{t}</li>
            ))}
          </ul>
        </React.Fragment>
      ) : null}
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
            <button value="1" onClick={event => handleRateRecipe(event)}>
              1
            </button>
            <button value="2" onClick={event => handleRateRecipe(event)}>
              2
            </button>
            <button value="3" onClick={event => handleRateRecipe(event)}>
              3
            </button>
            <button value="4" onClick={event => handleRateRecipe(event)}>
              4
            </button>
            <button value="5" onClick={event => handleRateRecipe(event)}>
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

export default withRouter(Recipe);
