import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

const Navigation = ({ currentUser, setCurrentUser, setToken, history }) => {
  const client = useApolloClient();
  const padding = { padding: 5 };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.clear();
    client.resetStore();
    history.push('/login');
  };

  return (
    <div>
      <Link style={padding} to="/recipes">
        Recipes
      </Link>
      {currentUser ? (
        <React.Fragment>
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
          <Link
            style={padding}
            to={`/users/${currentUser.username}/recipes/new`}
          >
            Create new recipe
          </Link>
          <Link style={padding} to={`/settings`}>
            Settings
          </Link>
          <button onClick={handleLogout}>Sign out</button>
        </React.Fragment>
      ) : (
        <Link style={padding} to="/login">
          Sign in
        </Link>
      )}
    </div>
  );
};

export default withRouter(Navigation);
