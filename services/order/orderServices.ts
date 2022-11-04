import { AxiosRequestConfig } from 'axios'
import axios from '../../apis/axios'

const END_POINTS = {
  GET_ALL: '/order',
}

export const getOrdersApi = (config: AxiosRequestConfig) => {
  return axios.get(END_POINTS.GET_ALL, config)
}
