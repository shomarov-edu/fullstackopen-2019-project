import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useApolloClient, useMutation } from '@apollo/client';
import useField from '../../hooks/useField';
import { DELETE_ACCOUNT } from '../../graphql/mutations';

const DeleteAccount = ({ setCurrentUser, notify, history }) => {
  const client = useApolloClient();
  const passwordField = useField('password');
  const [confirmDelete, setconfirmDelete] = useState(false);
  const [deleteAccount] = useMutation(DELETE_ACCOUNT, {
    onCompleted: () => {
      passwordField.reset();
      setCurrentUser(null);
      localStorage.clear();
      client.resetStore();
      history.push('/login');
    },
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors.length > 0) {
        notify(graphQLErrors[0].message);
      }
      if (networkError) console.log(`[Network error]: ${networkError}`);
      passwordField.reset();
    }
  });

  const toggleAccountDelete = () => {
    setconfirmDelete(!confirmDelete);
  };

  const handleDeleteAccount = async () => {
    const deleteAccountInput = { password: passwordField.input.value };
    await deleteAccount({ variables: { deleteAccountInput } });
  };

  return (
    <React.Fragment>
      <p>
        <button onClick={() => toggleAccountDelete()}>delete account</button>
      </p>
      {confirmDelete ? (
        <React.Fragment>
          <p>To confirm account deletion please enter your password:</p>
          <input {...passwordField.input} />
          <p>
            <button onClick={() => handleDeleteAccount()}>confirm</button>
            <button onClick={() => toggleAccountDelete()}>cancel</button>
          </p>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

export default withRouter(DeleteAccount);
