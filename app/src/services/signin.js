import axios from 'axios'

const signin = async credentials => {
  const response = await axios.post('http://localhost:5000/signin', credentials)
  return response.data
}

export default { signin }
