import React from 'react';
import { Link } from 'react-router-dom';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import useField from '../hooks/useField';
import queries from '../graphql/queries';

const AllRecipes = () => {
  const search = useField('text');
  const result = useQuery(queries.PUBLISHED_RECIPES);

  console.log(result);

  if (result.loading) return <div>loading...</div>;
  if (result.error) return <div>error: {result.error.message}</div>;

  const recipes = result.data.publishedRecipes;

  console.log(recipes);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(search.input.value.toLowerCase())
  );

  const titles = filteredRecipes.map(recipe => (
    <li key={recipe.id}>
      <Link style={{ margin: 20 }} to={`/recipes/${recipe.id}`}>
        {recipe.title}
      </Link>
    </li>
  ));

  return (
    <React.Fragment>
      <p>Search recipes:</p>
      <input {...search.input}></input>
      <br />
      <br />
      <button onClick={() => search.reset()}>clear</button>
      <ul>{titles}</ul>
    </React.Fragment>
  );
};

export default AllRecipes;
