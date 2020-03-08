import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import useField from '../hooks/useField';
import mutations from '../graphql/mutations';

const Login = ({ getCurrentUser, history }) => {
  const usernameOrEmail = useField('text');
  const password = useField('password');
  const [login, { error, data }] = useMutation(mutations.LOGIN);

  useEffect(() => {
    if (data) {
      const token = data.login.token;

      localStorage.setItem('token', token);
      getCurrentUser();
      history.push('/');
    }
  }, [data]);

  const handleLogin = async event => {
    event.preventDefault();

    const credentials = {
      usernameOrEmail: usernameOrEmail.input.value,
      password: password.input.value
    };

    login({ variables: { credentials } });
  };

  if (error) return <div>error: {error.message}</div>;

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
