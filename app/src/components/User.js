import React from 'react'

const User = ({ user }) => {
  return (
    <h1>
      {user.firstname} {user.lastname}
    </h1>
  )
}

export default User
