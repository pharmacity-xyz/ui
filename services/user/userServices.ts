import { AxiosRequestConfig } from 'axios'
import axios from '../../apis/axios'

const END_POINTS = {
  GET_ALL: '/user',
  UPDATE: '/user',
  DELETE: '/user',
}

export const getAllUsersApi = (config: AxiosRequestConfig) => {
  return axios.get(END_POINTS.GET_ALL, config)
}
