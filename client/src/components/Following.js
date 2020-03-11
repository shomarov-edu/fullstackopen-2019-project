import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { UNFOLLOW_USER } from '../graphql/mutations';

const Following = ({ user }) => {
  const [unfollowUser] = useMutation(UNFOLLOW_USER);

  if (!user) return null;

  const handleUnfollowUser = id => {
    const userToUnfollow = { idToUnfollow: id };

    unfollowUser({
      variables: { userToUnfollow }
    });
  };

  const followees = user.following.map(followee => (
    <li key={followee.id}>
      <Link to={`/users/${followee.username}`}>{followee.name}</Link>
      {` `}
      <button onClick={() => handleUnfollowUser(followee.id)}>unfollow</button>
    </li>
  ));

  return <ul>{followees}</ul>;
};

export default Following;
