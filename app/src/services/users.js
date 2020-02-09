import axios from 'axios'
const baseUrl = 'http://localhost:5000/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getUserByUsername = async username => {
  const response = await axios.get(`${baseUrl}/${username}`)
  return response.data
}

const login = async credentials => {
  const response = await axios.post(
    'http://localhost:5000/auth/login',
    credentials
  )
  return response.data
}

const signup = async user => {
  return await axios.post('http://localhost:5000/api/users', user)
}

export default {
  getAll,
  getUserByUsername,
  login,
  signup
}
