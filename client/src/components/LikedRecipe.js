import React from 'react';
import { Link } from 'react-router-dom';

const LikedRecipes = ({ currentUser }) => {
  if (!currentUser) return null;

  const titles = currentUser.likedRecipes.map(recipe => (
    <li key={recipe.id}>
      <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
    </li>
  ));

  return <ul>{titles}</ul>;
};

export default LikedRecipes;
