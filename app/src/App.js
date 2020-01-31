import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import ButtonAppBar from './components/ButtonAppBar'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import NewRecipeForm from './components/NewRecipeForm'

const App = () => {
  const [user, setUser] = useState(null)

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
          <ButtonAppBar user={user} setUser={setUser} />
          <Route path="/api/recipes/new" render={() => <NewRecipeForm />} />
          <Route
            path="/signin"
            render={() => <SignIn user={user} setUser={setUser} />}
          />
          <Route path="/signup" render={() => <SignUp />} />
        </Router>
      </React.Fragment>
    </div>
  )
}

export default App
