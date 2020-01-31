import axios from 'axios'

const signup = async user => {
  return await axios.post('http://localhost:5000/api/users', user)
}

export default { signup }
