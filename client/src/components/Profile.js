import React, { useState, useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import queries from '../graphql/queries';
import Recipes from './Recipes';

const Profile = ({ currentUser, username }) => {
  const [user, setUser] = useState(null);
  const [recipesVisible, setRecipesVisible] = useState(false);
  const [getUser, { loading, data }] = useLazyQuery(queries.USER, {
    variables: { username }
  });

  useEffect(() => {
    if (data) {
      setUser(data.user);
      console.log(data);
    }
  }, [data]);

  if (!currentUser || currentUser.username !== username) getUser();

  if (currentUser && currentUser.username === username) {
    setUser(currentUser);
  }

  if (loading) return <div>loading...</div>;

  console.log(user);

  const toggleVisibility = () => setRecipesVisible(!recipesVisible);
  const recipeVisibility = { display: recipesVisible ? '' : 'none' };

  const sendFriendRequestButton = () => {
    if (currentUser && currentUser.username !== user.username) {
      return (
        <p>
          <button>send friend request</button>
        </p>
      );
    }
  };

  return (
    <React.Fragment>
      <p>{user.name}</p>
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
