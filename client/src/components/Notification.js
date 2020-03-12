import React from 'react';

const Notification = ({ message }) => {
  if (!message) return null;

  return <p style={{ color: 'red' }}>{message}</p>;
};

export default Notification;
