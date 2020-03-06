import React, { useState, useEffect } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NewRecipeForm from './components/NewRecipeForm';
import Recipe from './components/Recipe';
import AllRecipes from './components/AllRecipes';
import Recipes from './components/Recipes';
import Profile from './components/Profile';
import queries from './graphql/queries';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [user, setUser] = useState(null);
  const [getCurrentUser, { loading, data }] = useLazyQuery(queries.ME);

  useEffect(() => {
    if (data) {
      setCurrentUser(data.me);
      console.log(data.me);
    }
  }, [data]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getCurrentUser();
    }

    if (data && data.me) {
      setCurrentUser(data.me);
    }
  }, [getCurrentUser]);

  return (
    <React.Fragment>
      <Router>
        <Navigation currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Route exact path="/recipes" render={() => <AllRecipes />} />
        <Route
          exact
          path="/users/:username"
          render={({ match }) => {
            return (
              <Profile
                currentUser={currentUser}
                username={match.params.username}
              />
            );
          }}
        />
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
          <Route
            exact
            path={`/users/${currentUser.username}/recipes`}
            render={() => <Recipes user={user} />}
          />
        ) : null}
        {currentUser ? (
          <Route
            exact
            path={`/users/${currentUser.username}/recipes/new`}
            render={() => <NewRecipeForm user={user} />}
          />
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
