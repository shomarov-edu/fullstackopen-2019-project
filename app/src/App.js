import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  // eslint-disable-next-line no-unused-vars
  Redirect,
  // eslint-disable-next-line no-unused-vars
  withRouter
} from 'react-router-dom'
import { Helmet } from 'react-helmet'
import CssBaseline from '@material-ui/core/CssBaseline'
import recipeService from './services/recipes'
import Login from './components/Login'
import Recipes from './components/Recipes'
import Recipe from './components/Recipe'
import NewRecipeForm from './components/NewRecipeForm'

function App() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    recipeService.getAll().then(data => setRecipes(data))
  }, [])

  const recipeById = id => {
    console.log(id)
    const r = recipes.find(recipe => recipe.id === id)
    console.log(r)
    return r
  }

  const padding = { padding: 5 }

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
          <div>
            <Link style={padding} to="/">
              home
            </Link>
            <Link style={padding} to="/recipes">
              recipes
            </Link>
            <Link style={padding} to="/new">
              new
            </Link>
            <Link style={padding} to="/login">
              login
            </Link>
          </div>
          <h1>Recipes app</h1>
          <Route exact path="/login" render={() => <Login />} />
          <Route
            exact
            path="/recipes"
            render={() => <Recipes recipes={recipes} />}
          />
          <Route exact path="/new" render={() => <NewRecipeForm />} />
          <Route
            exact
            path="/recipes/:id"
            render={({ match }) => (
              <Recipe recipe={recipeById(match.params.id)} />
            )}
          />
        </Router>
      </React.Fragment>
    </div>
  )
}

export default App
