import axios from 'axios'

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
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
