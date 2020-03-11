import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import useField from '../../hooks/useField';
import { UPDATE_NAME } from '../../graphql/mutations';

const Name = ({ name }) => {
  const nameField = useField('text');
  const [editName, setEditName] = useState(false);
  const [updateName, updateNameResult] = useMutation(UPDATE_NAME);

  const toggleEditName = () => {
    nameField.setValue(name);
    setEditName(!editName);
  };

  const handleUpdateName = () => {
    const updateNameInput = { newName: nameField.input.value };
    updateName({ variables: { updateNameInput } });
    toggleEditName();
  };

  return (
    <React.Fragment>
      {!editName ? (
        <p>
          Name: {name}
          <button onClick={() => toggleEditName()}>change name</button>
        </p>
      ) : (
        <React.Fragment>
          <p>
            Name: <input {...nameField.input} />
          </p>
          <p>
            <button onClick={() => handleUpdateName()}>save</button>
            <button onClick={() => toggleEditName()}>cancel</button>
          </p>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Name;
