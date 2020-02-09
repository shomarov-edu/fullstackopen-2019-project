import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import useField from '../hooks/useField'
import userService from '../services/users'

const Login = ({ setLocalStorageUser, history }) => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async event => {
    event.preventDefault()

    const credentials = {
      username: username.input.value,
      password: password.input.value
    }

    try {
      const fetchedUser = await userService.login(credentials)
      setLocalStorageUser(fetchedUser)

      window.localStorage.setItem('loggedInUser', JSON.stringify(fetchedUser))

      username.reset()
      password.reset()

      history.push(`/${fetchedUser.username}`)
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <h2>Sign in</h2>
      <form onSubmit={handleLogin}>
        Username:
        <input {...username.input} autoFocus />
        <br />
        Password:
        <input {...password.input} />
        <br />
        <button type="submit">Sign In</button>
        <br />
        <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
      </form>
    </div>
  )
}

export default withRouter(Login)
