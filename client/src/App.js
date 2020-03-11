import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NewRecipeForm from './components/NewRecipeForm';
import Recipe from './components/recipe/Recipe';
import AllRecipes from './components/AllRecipes';
import Recipes from './components/recipe/Recipes';
import Profile from './components/Profile';
import Following from './components/Following';
import Followers from './components/Followers';
import Settings from './components/userSettings/Settings';
import { ME } from './graphql/queries';
import LikedRecipes from './components/LikedRecipe';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [getCurrentUser, getCurrentUserResult] = useLazyQuery(ME, {
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getCurrentUser();
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    if (getCurrentUserResult.data) {
      setCurrentUser(getCurrentUserResult.data.me);
    }
  }, [getCurrentUserResult.data]);

  if (getCurrentUserResult.error)
    return <div>error this: {getCurrentUserResult.error.message}</div>;

  return (
    <React.Fragment>
      <Router>
        <Navigation currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Route exact path="/recipes" render={() => <AllRecipes />} />
        <Route
          exact
          path="/users/:username"
          render={({ match }) => (
            <Profile
              currentUser={currentUser}
              username={match.params.username}
            />
          )}
        />
        {currentUser ? (
          <React.Fragment>
            <Route
              exact
              path={`/users/${currentUser.username}/following`}
              render={() => <Following user={currentUser} />}
            />
            <Route
              exact
              path={`/users/${currentUser.username}/followers`}
              render={() => <Followers user={currentUser} />}
            />
          </React.Fragment>
        ) : null}
        <Route
          exact
          path="/recipes/:recipeId"
          render={({ match }) => {
            return (
              <Recipe
                currentUser={currentUser}
                recipeId={match.params.recipeId}
              />
            );
          }}
        />
        {currentUser ? (
          <React.Fragment>
            <Route
              exact
              path={`/users/${currentUser.username}/recipes`}
              render={() => <Recipes user={currentUser} />}
            />
            <Route
              exact
              path={`/users/${currentUser.username}/likes`}
              render={() => <LikedRecipes currentUser={currentUser} />}
            />
          </React.Fragment>
        ) : null}
        {currentUser ? (
          <React.Fragment>
            <Route
              exact
              path={`/users/${currentUser.username}/recipes/new`}
              render={() => <NewRecipeForm user={currentUser} />}
            />
            <Route
              exact
              path={`/settings`}
              render={() => <Settings currentUser={currentUser} />}
            />
          </React.Fragment>
        ) : null}
        <Route
          exact
          path="/login"
          render={() => (
            <Login
              getCurrentUser={getCurrentUser}
              setCurrentUser={setCurrentUser}
            />
          )}
        />
        <Route path="/signup" render={() => <SignUp />} />
      </Router>
    </React.Fragment>
  );
};

export default App;
