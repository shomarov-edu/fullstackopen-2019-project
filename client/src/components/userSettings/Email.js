import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import useField from '../../hooks/useField';
import { UPDATE_EMAIL } from '../../graphql/mutations';

const Email = ({ email }) => {
  const emailField = useField('email');
  const [editEmail, setEditEmail] = useState(false);
  const [updateEmail] = useMutation(UPDATE_EMAIL);

  const toggleEditEmail = () => {
    emailField.setValue(email);
    setEditEmail(!editEmail);
  };

  const handleUpdateEmail = () => {
    const updateEmailInput = { newEmail: emailField.input.value };
    updateEmail({ variables: { updateEmailInput } });
    toggleEditEmail();
  };

  return (
    <React.Fragment>
      {!editEmail ? (
        <p>
          E-Mail: {email}
          <button onClick={() => toggleEditEmail()}>change email</button>
        </p>
      ) : (
        <React.Fragment>
          <p>
            E-mail: <input {...emailField.input} />
          </p>
          <p>
            <button onClick={() => handleUpdateEmail()}>save</button>
            <button onClick={() => toggleEditEmail()}>cancel</button>
          </p>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Email;
