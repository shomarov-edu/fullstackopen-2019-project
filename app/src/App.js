import React from 'react'
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import ButtonAppBar from './components/ButtonAppBar'
import SignIn from './components/SignIn'

function App() {
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
          <ButtonAppBar />
          <Route path="/signin" render={() => <SignIn />} />
        </Router>
      </React.Fragment>
    </div>
  )
}

export default App
