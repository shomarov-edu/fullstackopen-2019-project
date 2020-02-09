import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const Navigation = ({ loggedInUser, setLoggedInUser, history }) => {
  const padding = { padding: 5 }

  const handleLogout = () => {
    setLoggedInUser(null)
    localStorage.clear()
    history.push('/login')
  }

  return (
    <div>
      <Link style={padding} to="/recipes">
        Recipes
      </Link>
      {loggedInUser ? (
        <React.Fragment>
          <Link style={padding} to={`/${loggedInUser.username}`}>
            My Profile
          </Link>
          <Link style={padding} to={`/${loggedInUser.username}/friends`}>
            My Friends
          </Link>
          <Link style={padding} to={`/${loggedInUser.username}/recipes`}>
            My recipes
          </Link>
          <Link style={padding} to={`/${loggedInUser.username}/recipes/new`}>
            Create new recipe
          </Link>
          <button onClick={handleLogout}>Sign out</button>
        </React.Fragment>
      ) : (
        <Link style={padding} to="/login">
          Sign in
        </Link>
      )}
    </div>
  )
}

export default withRouter(Navigation)
