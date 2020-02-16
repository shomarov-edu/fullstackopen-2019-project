import React, { useState } from 'react';
import Recipes from './Recipes';

const Profile = ({ loggedInUser, user }) => {
  console.log('profile', user);
  const [recipesVisible, setRecipesVisible] = useState(false);

  if (!user) return null;

  const toggleVisibility = () => setRecipesVisible(!recipesVisible);
  const recipeVisibility = { display: recipesVisible ? '' : 'none' };

  const sendFriendRequestButton = () => {
    if (loggedInUser && loggedInUser.username !== user.username) {
      return (
        <p>
          <button>send friend request</button>
        </p>
      );
    }
  };

  return (
    <React.Fragment>
      <p>
        {user.firstname} {user.lastname}
      </p>
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
