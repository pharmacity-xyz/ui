import { AxiosRequestConfig } from 'axios'
import axios from '../../apis/axios'

const END_POINTS = {
  CHECKOUT: '/payment/checkout',
}

export const checkoutApi = (config: AxiosRequestConfig) => {
  return axios.post(END_POINTS.CHECKOUT, {}, config)
}
