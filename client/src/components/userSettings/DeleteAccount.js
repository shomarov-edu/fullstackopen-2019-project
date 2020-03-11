import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import useField from '../../hooks/useField';
import { DELETE_ACCOUNT } from '../../graphql/mutations';

const DeleteAccount = () => {
  const passwordField = useField('password');
  const [confirmDelete, setconfirmDelete] = useState(false);
  const [deleteAccount, deleteAccountResult] = useMutation(DELETE_ACCOUNT);

  const toggleAccountDelete = () => {
    setconfirmDelete(!confirmDelete);
  };

  const handleDeleteAccount = () => {
    const deleteAccountInput = { password: passwordField.input.value };
    deleteAccount({ variables: deleteAccountInput });
  };

  return (
    <React.Fragment>
      <p>
        <button onClick={() => toggleAccountDelete()}>delete account</button>
      </p>
      {confirmDelete ? (
        <React.Fragment>
          <p>To confirm account deletion please enter your password:</p>
          <input />
          <p>
            <button onClick={() => handleDeleteAccount()}>confirm</button>
            <button onClick={() => toggleAccountDelete()}>cancel</button>
          </p>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

export default DeleteAccount;
