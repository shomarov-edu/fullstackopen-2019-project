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
import LikedRecipes from './components/LikedRecipe';
import Drafts from './components/recipe/Drafts';
import Notification from './components/Notification';
import { ME } from './graphql/queries';

const App = () => {
  const [message, setMessage] = useState(null);
  const [getCurrentUser, { loading, error, data }] = useLazyQuery(ME, {
    onError: error => {
      notify(error.message);
    }
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getCurrentUser();
    }
  }, []); // eslint-disable-line

  const notify = errorMessage => {
    setMessage(errorMessage);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  if (loading) return <div>loading...</div>;
  if (error) notify(error.message);

  if (!data)
    return (
      <React.Fragment>
        <Router>
          <Navigation />
          <Route exact path="/recipes" render={() => <AllRecipes />} />
          <Route
            exact
            path="/recipes/:recipeId"
            render={({ match }) => {
              return <Recipe recipeId={match.params.recipeId} />;
            }}
          />
          <Route
            exact
            path="/users/:username"
            render={({ match }) => <p>Please sign up to for full access</p>}
          />
          <Route
            exact
            path="/login"
            render={() => <Login getCurrentUser={getCurrentUser} />}
          />
          <Route path="/signup" render={() => <SignUp />} />
        </Router>
      </React.Fragment>
    );

  const { me: currentUser } = data;

  return (
    <React.Fragment>
      <Router>
        <Navigation currentUser={currentUser} />
        <Notification message={message} />
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
              path={`/users/${currentUser.username}/drafts`}
              render={() => <Drafts currentUser={currentUser} />}
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
              render={() => (
                <NewRecipeForm
                  getCurrentUser={getCurrentUser}
                  notify={notify}
                />
              )}
            />
            <Route
              exact
              path={`/settings`}
              render={() => (
                <Settings currentUser={currentUser} notify={notify} />
              )}
            />
          </React.Fragment>
        ) : null}
        <Route
          exact
          path="/login"
          render={() => <Login getCurrentUser={getCurrentUser} />}
        />
        <Route path="/signup" render={() => <SignUp />} />
      </Router>
    </React.Fragment>
  );
};

export default App;
