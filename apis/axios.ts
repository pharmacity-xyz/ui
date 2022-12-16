import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://pharmacity-server.onrender.com',
})

instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default instance
