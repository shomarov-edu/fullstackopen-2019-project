import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import useField from '../hooks/useField';
import { LOGIN } from '../graphql/mutations';
import Notification from '../components/Notification';

const Login = ({ getCurrentUser, history }) => {
  const usernameOrEmail = useField('text');
  const password = useField('password');
  const [message, setMessage] = useState(null);
  const [login, { data }] = useMutation(LOGIN, {
    onCompleted: data => {
      const token = data.login.token;
      localStorage.setItem('token', token);
      getCurrentUser();
      history.push('/');
    },
    onError: ({ graphQLErrors }) => {
      usernameOrEmail.reset();
      password.reset();
      setMessage(graphQLErrors[0].message);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  });

  const handleLogin = async event => {
    event.preventDefault();

    const credentials = {
      usernameOrEmail: usernameOrEmail.input.value,
      password: password.input.value
    };

    login({ variables: { credentials } });
  };

  return (
    <React.Fragment>
      <h2>Log in</h2>
      <Notification message={message} />
      <form onSubmit={handleLogin}>
        <p>
          Username:
          <input {...usernameOrEmail.input} autoFocus />
        </p>
        <p>
          Password:
          <input {...password.input} />
        </p>
        <p>
          <button type="submit">Log In</button>
        </p>
        <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
      </form>
    </React.Fragment>
  );
};

export default withRouter(Login);
