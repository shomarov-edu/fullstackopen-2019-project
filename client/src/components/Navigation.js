import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

const Navigation = ({ currentUser, history }) => {
  const client = useApolloClient();
  const padding = { padding: 5 };

  const handleLogout = async () => {
    localStorage.clear();
    await client.resetStore();
    await client.clearStore();
    history.push('/login');
  };

  if (!currentUser) {
    return (
      <React.Fragment>
        <Link style={padding} to="/recipes">
          Recipes
        </Link>
        <Link style={padding} to="/login">
          Log in
        </Link>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Link style={padding} to="/recipes">
          Recipes
        </Link>
        <Link style={padding} to={`/users/${currentUser.username}`}>
          My Profile
        </Link>
        <Link style={padding} to={`/users/${currentUser.username}/following`}>
          Following
        </Link>
        <Link style={padding} to={`/users/${currentUser.username}/followers`}>
          Followers
        </Link>
        <Link style={padding} to={`/users/${currentUser.username}/recipes`}>
          My recipes
        </Link>
        <Link style={padding} to={`/users/${currentUser.username}/drafts`}>
          Drafts
        </Link>
        <Link style={padding} to={`/users/${currentUser.username}/likes`}>
          Liked recipes
        </Link>
        <Link style={padding} to={`/users/${currentUser.username}/recipes/new`}>
          Create new recipe
        </Link>
        <Link style={padding} to={`/settings`}>
          Settings
        </Link>
        <button onClick={handleLogout}>Log out</button>
      </React.Fragment>
    );
  }
};

export default withRouter(Navigation);
