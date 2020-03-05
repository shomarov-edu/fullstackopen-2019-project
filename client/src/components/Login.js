import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import useField from '../hooks/useField';
import mutations from '../graphql/mutations';

const Login = ({ setLocalStorageUser, history }) => {
  const usernameOrEmail = useField('text');
  const password = useField('password');
  const [login, { data }] = useMutation(mutations.LOGIN);

  const handleLogin = async event => {
    event.preventDefault();

    const variables = {
      usernameOrEmail: usernameOrEmail.input.value,
      password: password.input.value
    };

    console.log(variables);

    const result = await login({ variables });
    const currentUser = result.data.login;

    setLocalStorageUser(currentUser);

    localStorage.setItem('currentUser', JSON.stringify(currentUser));

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
