import axios from 'axios'

const getAll = async () => {
  const response = await axios.get('http://localhost:5000/api/recipes')
  return response.data
}

export default { getAll }
