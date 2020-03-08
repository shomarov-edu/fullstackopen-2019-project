import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import useField from '../hooks/useField';
import mutations from '../graphql/mutations';

const SignUp = ({ history }) => {
  const name = useField('text');
  const username = useField('text');
  const email = useField('email');
  const password = useField('password');
  const [signup, { error, data }] = useMutation(mutations.SIGNUP);

  useEffect(() => {
    if (data && data.signup) {
      history.push('/recipes');
    }
  }, [data]);

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
