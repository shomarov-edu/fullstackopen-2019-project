import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import useField from '../hooks/useField';
import { SIGNUP } from '../graphql/mutations';

const SignUp = ({ history }) => {
  const name = useField('text');
  const username = useField('text');
  const email = useField('email');
  const password = useField('password');
  const [signup, { error, data }] = useMutation(SIGNUP);

  useEffect(() => {
    if (data && data.signup) {
      history.push('/recipes');
    }
  }, [data]); // eslint-disable-line

  const handleSubmit = async event => {
    event.preventDefault();

    const signUpData = {
      name: name.input.value,
      username: username.input.value,
      email: email.input.value,
      password: password.input.value
    };

    signup({ variables: { signUpData } });

    username.reset();
    name.reset();
    email.reset();
    password.reset();
  };

  if (error) return <div>error: {error.message}</div>;

  return (
    <div>
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <p>
          Name:
          <input {...name.input} name="firstname" autoFocus />
        </p>
        <p>
          Username:
          <input {...username.input} name="firstname" />
        </p>
        <p>
          Email Address:
          <input {...email.input} />
        </p>
        <p>
          Password:
          <input {...password.input} />
        </p>
        <p>
          <button type="submit">Sign Up</button>
        </p>
        <Link to="/login">Already have an account? Sign in</Link>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
