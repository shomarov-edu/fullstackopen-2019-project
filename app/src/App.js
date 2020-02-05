import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import userService from './services/users'
import recipeService from './services/recipes'
import Navigation from './components/Navigation'
import Login from './components/Login'
import SignUp from './components/SignUp'
import NewRecipeForm from './components/NewRecipeForm'
import UserRecipe from './components/UserRecipe'
import AllRecipes from './components/AllRecipes'
import MyRecipes from './components/MyRecipes'
import UserProfile from './components/UserProfile'
import MyProfile from './components/MyProfile'

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [users, setUsers] = useState([])
  const [allRecipes, setAllRecipes] = useState([])

  useEffect(() => {
    recipeService.getAll().then(loadedRecipes => setAllRecipes(loadedRecipes))
  }, [])

  useEffect(() => {
    userService.getAll().then(loadedUsers => setUsers(loadedUsers))
    const user = JSON.parse(localStorage.getItem('loggedInUser'))
    if (user) {
      setLoggedInUser(user)
    }
  }, [])

  const userByUsername = username => {
    return users.find(user => user.username === username)
  }

  const recipeById = recipeId => {
    return allRecipes.find(recipe => recipe.id === recipeId)
  }

  console.log('user', loggedInUser)

  return (
    <React.Fragment>
      <Router>
        <Navigation
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
        />
        <Route
          exact
          path="/browse"
          render={() => <AllRecipes recipes={allRecipes} />}
        />
        <Route
          exact
          path="/:username"
          render={({ match }) => {
            if (
              loggedInUser &&
              loggedInUser.username === match.params.username
            ) {
              return <MyProfile user={userByUsername(match.params.username)} />
            } else {
              return (
                <UserProfile user={userByUsername(match.params.username)} />
              )
            }
          }}
        />
        <Route
          exact
          path="/:username/recipes/:recipeId"
          render={({ match }) => (
            <UserRecipe
              loggedInUser={loggedInUser}
              recipe={recipeById(match.params.recipeId)}
            />
          )}
        />
        {loggedInUser ? (
          <Route
            exact
            path={`/${loggedInUser.username}/recipes`}
            render={() => (
              <MyRecipes user={userByUsername(loggedInUser.username)} />
            )}
          />
        ) : null}
        {loggedInUser ? (
          <Route
            exact
            path={`/${loggedInUser.username}/recipes/new`}
            render={() => <NewRecipeForm loggedInUser={loggedInUser} />}
          />
        ) : null}
        <Route
          exact
          path="/login"
          render={() => (
            <Login
              loggedInUser={loggedInUser}
              setLoggedInUser={setLoggedInUser}
            />
          )}
        />
        <Route path="/signup" render={() => <SignUp />} />
      </Router>
    </React.Fragment>
  )
}

export default App
