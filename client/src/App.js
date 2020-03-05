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
import queries from './graphql/queries';

const App = () => {
  const [localStorageUser, setLocalStorageUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userToFetch, setUserToFetch] = useState(null);
  const [user, setUser] = useState(null);
  const [publishedRecipes, setPublishedRecipes] = useState([]);

  const recipeById = recipeId => {
    return recipes.find(recipe => recipe.id === recipeId);
  };

  const publishedRecipesQuery = useQuery(queries.publishedRecipes);

  if (publishedRecipesQuery.loading) return <div>loading...</div>;

  const recipes = publishedRecipesQuery.data.publishedRecipes;

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
          render={() => <AllRecipes recipes={recipes} />}
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
