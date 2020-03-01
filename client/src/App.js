import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NewRecipeForm from './components/NewRecipeForm';
import Recipe from './components/Recipe';
import AllRecipes from './components/AllRecipes';
import Recipes from './components/Recipes';
import Profile from './components/Profile';

const App = () => {
  const [localStorageUser, setLocalStorageUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [allRecipes, setAllRecipes] = useState([]);
  const [userToFetch, setUserToFetch] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log('user', user);
    if (user) {
      setLocalStorageUser(user);
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (localStorageUser) {
        console.log('localStorageUser', localStorageUser);
        console.log('user2', user);
        setLoggedInUser(user);
      }
    };

    fetchUser();
  }, [localStorageUser]);

  useEffect(() => {
    const fetchUser = async () => {
      if (userToFetch) {
        setUser(null);
      }
    };

    fetchUser();
  }, [userToFetch]);

  const recipeById = recipeId => {
    return allRecipes.find(recipe => recipe.id === recipeId);
  };

  return (
    <React.Fragment>
      <Router>
        <Navigation
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
        />
        <Route
          exact
          path="/recipes"
          render={() => <AllRecipes recipes={allRecipes} />}
        />
        <Route
          exact
          path="/:username"
          render={({ match }) => {
            if (
              match.params.username !== 'recipes' &&
              match.params.username !== 'login'
            ) {
              setUserToFetch(match.params.username);
              return <Profile loggedInUser={loggedInUser} user={user} />;
            }
          }}
        />
        <Route
          exact
          path="/:username/recipes/:recipeId"
          render={({ match }) => {
            setUserToFetch(match.params.username);
            return (
              <Recipe
                loggedInUser={loggedInUser}
                user={user}
                recipe={recipeById(match.params.recipeId)}
                allRecipes={allRecipes}
                setAllRecipes={setAllRecipes}
              />
            );
          }}
        />
        {loggedInUser ? (
          <Route
            exact
            path={`/${loggedInUser.username}/recipes`}
            render={() => <Recipes user={loggedInUser} />}
          />
        ) : null}
        {loggedInUser ? (
          <Route
            exact
            path={`/${loggedInUser.username}/recipes/new`}
            render={() => <NewRecipeForm user={loggedInUser} />}
          />
        ) : null}
        <Route
          exact
          path="/login"
          render={() => (
            <Login
              loggedInUser={loggedInUser}
              setLocalStorageUser={setLocalStorageUser}
            />
          )}
        />
        <Route path="/signup" render={() => <SignUp />} />
      </Router>
    </React.Fragment>
  );
};

export default App;
