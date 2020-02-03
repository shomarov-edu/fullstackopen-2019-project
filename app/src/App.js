import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import ButtonAppBar from './components/ButtonAppBar'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import NewRecipeForm from './components/NewRecipeForm'
import recipeService from './services/recipes'
import Recipe from './components/Recipe'
import AllPublicRecipes from './components/AllPublicRecipes'
import MyRecipes from './components/MyRecipes'

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, [])

  useEffect(() => {
    recipeService.getAll().then(loadedRecipes => setRecipes(loadedRecipes))
  }, [])

  const recipeById = (userId, recipeId) => {
    return recipes
      .filter(recipe => recipe.user === userId)
      .find(recipe => recipe.id === recipeId)
  }

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Full Stack Open 2019-2020 Project</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Helmet>
      <React.Fragment>
        <CssBaseline />
        <Router>
          <ButtonAppBar
            loggedInUser={loggedInUser}
            setLoggedInUser={setLoggedInUser}
          />
          <Route
            exact
            path="/browse"
            render={() => <AllPublicRecipes recipes={recipes} />}
          />
          {loggedInUser ? (
            <Route
              exact
              path={`/${loggedInUser.email}/recipes`}
              render={() => (
                <MyRecipes loggedInUser={loggedInUser} recipes={recipes} />
              )}
            />
          ) : null}
          <Route
            exact
            path="/api/recipes/new"
            render={() => <NewRecipeForm loggedInUser={loggedInUser} />}
          />
          <Route
            exact
            path="/api/recipes/:userId/:recipeId"
            render={({ match }) => (
              <Recipe
                recipe={recipeById(match.params.userId, match.params.recipeId)}
              />
            )}
          />
          <Route
            exact
            path="/signin"
            render={() => (
              <SignIn
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
              />
            )}
          />
          <Route path="/signup" render={() => <SignUp />} />
        </Router>
      </React.Fragment>
    </div>
  )
}

export default App
