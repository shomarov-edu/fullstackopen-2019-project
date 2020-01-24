import React, { useState } from 'react'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <table>
      <tbody>
        <tr>
          <td>username:</td>
          <td>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td>password:</td>
          <td>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default Login
