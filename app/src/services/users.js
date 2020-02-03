import axios from 'axios'
const baseUrl = 'http://localhost:5000/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOneById = async id => {
  const response = await axios.get(baseUrl, id)
  return response.data
}

const getOneByUsername = async username => {
  const response = await axios.get(baseUrl, username)
  return response.data
}

export default {
  getAll,
  getOneById,
  getOneByUsername
}
