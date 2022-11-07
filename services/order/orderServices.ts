import { AxiosRequestConfig } from 'axios'
import axios from '../../apis/axios'

const END_POINTS = {
  GET_ALL: '/order',
  GET_ALL_FOR_ADMIN: '/order/admin',
}

export const getOrdersApi = (config: AxiosRequestConfig) => {
  return axios.get(END_POINTS.GET_ALL, config)
}

export const getOrdersForAdminApi = (config: AxiosRequestConfig) => {
  return axios.get(END_POINTS.GET_ALL_FOR_ADMIN, config)
}
