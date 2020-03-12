import React from 'react';
import { Link } from 'react-router-dom';

const Drafts = ({ currentUser }) => {
  if (!currentUser) return null;

  const titles = currentUser.recipes
    .filter(recipe => recipe.published === false)
    .map(recipe => (
      <li key={recipe.id}>
        <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
      </li>
    ));

  return <ul>{titles}</ul>;
};

export default Drafts;
