import { AxiosRequestConfig } from 'axios'
import axios from '../../apis/axios'

const END_POINTS = {
  GET_ALL: '/order',
  GET_ORDER_DETAIL: '/order/orderid',
  GET_ALL_FOR_ADMIN: '/order/admin',
  GET_CHART_DATA: '/order/charts',
}

export const getOrdersApi = (config: AxiosRequestConfig) => {
  return axios.get(END_POINTS.GET_ALL, config)
}

export const getOrderDetailApi = (
  orderId: string,
  config: AxiosRequestConfig
) => {
  return axios.get(`${END_POINTS.GET_ORDER_DETAIL}/${orderId}`, config)
}

export const getOrdersForAdminApi = (config: AxiosRequestConfig) => {
  return axios.get(END_POINTS.GET_ALL_FOR_ADMIN, config)
}

export const getChartsDataApi = (
  config: AxiosRequestConfig,
  year: number,
  month: number
) => {
  return axios.get(
    `${END_POINTS.GET_CHART_DATA}?year=${year}&month=${month}`,
    config
  )
}
