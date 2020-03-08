import React from 'react';
import { Link } from 'react-router-dom';

const Following = ({ user }) => {
  if (!user) return null;

  const followees = user.following.map(followee => (
    <li key={followee.id}>
      <Link to={`/user/${followee.username}`}>
        <strong>{followee.name}</strong>
        {followee.username}
      </Link>
    </li>
  ));

  return <ul>{followees}</ul>;
};

export default Following;
