import { AxiosRequestConfig } from 'axios'
import { getAxiosConfig } from 'utils/config'
import axios from '../../apis/axios'

import { IAddCartApi, IReturnCart } from './types'

const END_POINTS = {
  ADD: '/cart/add',
  GET_ALL: '/cart',
  COUNT: '/cart/count',
  UPDATE_QUANTITY: '/cart/update_quantity',
  DELETE: '/cart',
}

export const addCartApi = (data: IAddCartApi) => {
  const config = getAxiosConfig()
  return axios.post(END_POINTS.ADD, data, config)
}

export const getCartsApi = () => {
  const config = getAxiosConfig()
  return axios.get(END_POINTS.GET_ALL, config)
}

export const countCartApi = () => {
  return axios.get(END_POINTS.COUNT)
}

export const updateQuantityApi = (data: IReturnCart) => {
  const config = getAxiosConfig()
  return axios.put(END_POINTS.UPDATE_QUANTITY, data, config)
}

export const deleteCartApi = (productId) => {
  const config = getAxiosConfig()
  return axios.delete(`${END_POINTS.DELETE}/${productId}`, config)
}
