import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Navigation = ({
  client,
  currentUser,
  setCurrentUser,
  setToken,
  history
}) => {
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
          <Link style={padding} to={`/users/${currentUser.username}/friends`}>
            My Friends
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
