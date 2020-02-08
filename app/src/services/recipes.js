import axios from 'axios'
const baseUrl = 'http://localhost:5000/api/recipes'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNewRecipe = async recipe => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, recipe, config)
  return response.data
}

const updateRecipe = async (id, changedRecipe) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${id}`, changedRecipe, config)
  return response.data
}

export default {
  getAll,
  createNewRecipe,
  updateRecipe,
  setToken
}
