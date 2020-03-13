import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import useField from '../../hooks/useField';
import { UPDATE_PASSWORD } from '../../graphql/mutations';

const PasswordChange = ({ notify }) => {
  const passwordField = useField('password');
  const newPasswordField = useField('password');
  const [editPassword, setEditPassword] = useState(false);
  const [updatePassword] = useMutation(UPDATE_PASSWORD, {
    onCompleted: () => {
      toggleEditPassword();
    },
    onError: ({ graphQLErrors }) => {
      passwordField.reset();
      newPasswordField.reset();
      notify(graphQLErrors[0].message);
    }
  });

  const toggleEditPassword = () => {
    setEditPassword(!editPassword);
    passwordField.reset();
    newPasswordField.reset();
  };

  const handleUpdatePassword = () => {
    const updatePasswordInput = {
      password: passwordField.input.value,
      newPassword: newPasswordField.input.value
    };

    updatePassword({ variables: { updatePasswordInput } });
  };

  return (
    <React.Fragment>
      <button onClick={() => toggleEditPassword()}>change password</button>
      {!editPassword ? (
        <p></p>
      ) : (
        <React.Fragment>
          <p>
            Password: <input {...passwordField.input} />
            <br />
            New password: <input {...newPasswordField.input} />
          </p>
          <p>
            <button onClick={() => handleUpdatePassword()}>save</button>
            <button onClick={() => toggleEditPassword()}>cancel</button>
          </p>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default PasswordChange;
