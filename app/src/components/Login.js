import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import useField from '../hooks/useField'
import userService from '../services/users'

const Login = ({ setLoggedInUser, history }) => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async event => {
    event.preventDefault()

    const credentials = {
      username: username.input.value,
      password: password.input.value
    }

    try {
      const user = await userService.login(credentials)
      setLoggedInUser(user)

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      console.log(user)

      username.reset()
      password.reset()

      history.push(`/${user.username}/recipes`)
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
