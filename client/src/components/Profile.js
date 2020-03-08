import React, { useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import queries from '../graphql/queries';
import mutations from '../graphql/mutations';
import Recipes from './Recipes';
import Following from './Following';
import Followers from './Followers';

const Profile = ({ currentUser, username }) => {
  const [user, setUser] = useState(null);
  const [recipesVisible, setRecipesVisible] = useState(false);
  const [getUser, getUserResult] = useLazyQuery(queries.USER);
  const [followUser, followUserResult] = useMutation(mutations.FOLLOW_USER);
  const [unfollowUser, unfollowUserResult] = useMutation(
    mutations.UNFOLLOW_USER
  );

  useEffect(() => {
    if (!currentUser || currentUser.username !== username) {
      getUser({ variables: { idOrUsername: { username } } });
    } else {
      setUser(currentUser);
    }
  }, []);

  useEffect(() => {
    if (getUserResult.data) {
      setUser(getUserResult.data.user);
    }
  }, [getUserResult.data]);

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

  if (!user) return <div>loading...</div>;

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
      <p>{user.name}</p>
      {sendFriendRequestButton()}
      Following:
      <Following />
      Followers:
      <Followers />
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
