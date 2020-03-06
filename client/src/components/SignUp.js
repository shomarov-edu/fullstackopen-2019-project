import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import useField from '../hooks/useField';
import mutations from '../graphql/mutations';

const SignUp = ({ history }) => {
  const name = useField('text');
  const username = useField('text');
  const email = useField('email');
  const password = useField('password');

  const [signup] = useMutation(mutations.SIGNUP);

  const handleSignUp = async event => {
    event.preventDefault();

    const variables = {
      name: name.input.value,
      username: username.input.value,
      email: email.input.value,
      password: password.input.value
    };

    signup({ variables });

    username.reset();
    name.reset();
    email.reset();
    password.reset();

    history.push('/recipes');
  };

  return (
    <div>
      <h2>Sign up</h2>
      <form onSubmit={handleSignUp}>
        Name:
        <input {...name.input} name="firstname" autoFocus />
        <br />
        Username:
        <input {...username.input} name="firstname" />
        <br />
        Email Address:
        <input {...email.input} />
        <br />
        Password:
        <input {...password.input} />
        <br />
        <button type="submit">Sign Up</button>
        <br />
        <Link to="/signin">Already have an account? Sign in</Link>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
