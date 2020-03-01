import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import useField from '../hooks/useField';

const SignUp = ({ history }) => {
  const username = useField('text');
  const firstname = useField('text');
  const lastname = useField('text');
  const email = useField('email');
  const password = useField('password');

  const handleSignUp = async event => {
    event.preventDefault();

    const user = {
      username: username.input.value,
      firstname: firstname.input.value,
      lastname: lastname.input.value,
      email: email.input.value,
      password: password.input.value
    };

    try {
      username.reset();
      firstname.reset();
      lastname.reset();
      email.reset();
      password.reset();

      history.push('/');
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <div>
      <h2>Sign up</h2>
      <form onSubmit={handleSignUp}>
        Username:
        <input {...username.input} name="firstname" autoFocus />
        <br />
        First Name:
        <input {...firstname.input} name="firstname" />
        <br />
        Last Name:
        <input {...lastname.input} />
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
