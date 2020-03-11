import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import useField from '../../hooks/useField';
import { UPDATE_USERNAME } from '../../graphql/mutations';

const Username = ({ username }) => {
  const usernameField = useField('username');
  const [editUsername, setEditUsername] = useState(false);
  const [updateUsername, updateUsernameResult] = useMutation(UPDATE_USERNAME);

  const toggleEditUsername = () => {
    usernameField.setValue(username);
    setEditUsername(!editUsername);
  };

  const handleUpdateUsername = () => {
    const updateUsernameInput = { newUsername: usernameField.input.value };
    updateUsername({ variables: { updateUsernameInput } });
    toggleEditUsername();
  };

  return (
    <React.Fragment>
      {!editUsername ? (
        <p>
          Username: {username}
          <button onClick={() => toggleEditUsername()}>change username</button>
        </p>
      ) : (
        <React.Fragment>
          <p>
            Username: <input {...usernameField.input} />
          </p>
          <p>
            <button onClick={() => handleUpdateUsername()}>save</button>
            <button onClick={() => toggleEditUsername()}>cancel</button>
          </p>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Username;
