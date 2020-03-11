import React, { useState, useEffect } from 'react';

const Notification = ({ message }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 500);
  }, [errorMessage]);

  if (!errorMessage) return null;

  return <div style={{ color: 'red' }}>{errorMessage}</div>;
};

export default Notification;
