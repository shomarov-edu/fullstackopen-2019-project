import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { USER } from '../graphql/queries';
import { FOLLOW_USER, UNFOLLOW_USER } from '../graphql/mutations';
import Recipes from './recipe/Recipes';

const Profile = ({ currentUser, username }) => {
  const { loading, error, data } = useQuery(USER, {
    variables: { idOrUsername: { username } }
  });
  const [followUser] = useMutation(FOLLOW_USER);
  const [unfollowUser] = useMutation(UNFOLLOW_USER);
  const [recipesVisible, setRecipesVisible] = useState(false);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error: {error.message}</div>;

  const user = data.user;

  const toggleVisibility = () => setRecipesVisible(!recipesVisible);
  const recipeVisibility = { display: recipesVisible ? '' : 'none' };

  const handleFollowUser = () => {
    const userToFollow = { idToFollow: user.id };

    followUser({
      variables: { userToFollow }
    });
  };

  const handleUnfollowUser = () => {
    const userToUnfollow = { idToUnfollow: user.id };

    unfollowUser({
      variables: { userToUnfollow }
    });
  };

  // if (!user) return <div>loading...</div>;

  const sendFriendRequestButton = () => {
    if (currentUser && currentUser.username !== user.username) {
      return (
        <p>
          {currentUser.following.some(f => f.id === user.id) ? (
            <button onClick={handleUnfollowUser}>unfollow</button>
          ) : (
            <button onClick={handleFollowUser}>follow</button>
          )}
        </p>
      );
    }
  };

  if (!user) return <div>loading...</div>;

  return (
    <React.Fragment>
      <p>Name: {user.name}</p>
      <p>Username: {user.username}</p>
      {sendFriendRequestButton()}
      {recipesVisible ? (
        <button onClick={toggleVisibility}>hide recipes</button>
      ) : (
        <button onClick={toggleVisibility}>show recipes</button>
      )}
      <div style={recipeVisibility}>
        <Recipes user={user} />
      </div>
    </React.Fragment>
  );
};

export default Profile;
