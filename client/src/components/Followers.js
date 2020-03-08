import React from 'react';
import { Link } from 'react-router-dom';

const Followers = ({ user }) => {
  console.log(user);
  if (!user) return null;

  const followers = user.followers.map(followee => (
    <li key={followers.id}>
      <Link to={`/user/${followers.username}`}>
        <strong>{followers.name}</strong>
        {followers.username}
      </Link>
    </li>
  ));

  return <ul>{followers}</ul>;
};

export default Followers;
