import { AxiosRequestConfig } from 'axios'
import axios from '../../apis/axios'

import { IAddCartApi } from './types'

const END_POINTS = {
  ADD: '/cart/add',
  GET_ALL: '/cart',
  COUNT: '/cart/count',
  UPDATE_QUANTITY: '/cart/update_quantity',
  DELETE: '/cart',
}

export const addCartApi = (data: IAddCartApi, config: AxiosRequestConfig) => {
  return axios.post(END_POINTS.ADD, data, config)
}

export const getCartsApi = (config: AxiosRequestConfig) => {
  return axios.get(END_POINTS.GET_ALL, config)
}

export const countCartApi = () => {
  return axios.get(END_POINTS.COUNT)
}

export const updateQuantityApi = () => {
  return axios.put(END_POINTS.UPDATE_QUANTITY)
}

export const deleteCartApi = (productId, config: AxiosRequestConfig) => {
  return axios.delete(`${END_POINTS.DELETE}/${productId}`, config)
}
