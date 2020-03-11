import React from 'react';
import { Link } from 'react-router-dom';

const Followers = ({ user }) => {
  if (!user) return <div>loading...</div>;

  const followers = user.followers.map(follower => (
    <li key={follower.id}>
      <Link to={`/users/${follower.username}`}>{follower.name}</Link>
    </li>
  ));

  return <ul>{followers}</ul>;
};

export default Followers;
