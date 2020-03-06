import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import useField from '../hooks/useField';
import queries from '../graphql/queries';
import mutations from '../graphql/mutations';

const Login = ({ getCurrentUser, setCurrentUser, history }) => {
  const usernameOrEmail = useField('text');
  const password = useField('password');
  const [login] = useMutation(mutations.LOGIN);

  const handleLogin = async event => {
    event.preventDefault();

    const variables = {
      usernameOrEmail: usernameOrEmail.input.value,
      password: password.input.value
    };

    const result = await login({ variables });
    const token = result.data.login.token;

    localStorage.setItem('token', token);
    getCurrentUser();
    history.push('/');
  };

  return (
    <div>
      <h2>Sign in</h2>
      <form onSubmit={handleLogin}>
        Username:
        <input {...usernameOrEmail.input} autoFocus />
        <br />
        Password:
        <input {...password.input} />
        <br />
        <button type="submit">Sign In</button>
        <br />
        <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
      </form>
    </div>
  );
};

export default withRouter(Login);
