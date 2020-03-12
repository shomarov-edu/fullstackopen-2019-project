import React from 'react';
import Name from './Name';
import Email from './Email';
import Username from './Username';
import PasswordChange from './PasswordChange';
import DeleteAccount from './DeleteAccount';

const Settings = ({ currentUser, setCurrentUser, notify }) => {
  if (!currentUser) return null;

  return (
    <React.Fragment>
      <Name name={currentUser.name} />
      <Email email={currentUser.email} />
      <Username username={currentUser.username} />
      <PasswordChange notify={notify} />
      <DeleteAccount
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        notify={notify}
      />
    </React.Fragment>
  );
};

export default Settings;
