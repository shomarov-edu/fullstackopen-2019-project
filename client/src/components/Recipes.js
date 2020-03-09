import React from 'react';
import { Link } from 'react-router-dom';

const Recipes = ({ user }) => {
  if (!user) return null;

  const titles = user.publishedRecipes.map(recipe => (
    <li key={recipe.id}>
      <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
    </li>
  ));

  return <ul>{titles}</ul>;
};

export default Recipes;
