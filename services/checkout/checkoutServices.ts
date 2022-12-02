import { getAxiosConfig } from 'utils/config'
import axios from '../../apis/axios'

const END_POINTS = {
  CHECKOUT: '/payment/checkout',
}

export const checkoutApi = () => {
  const config = getAxiosConfig()
  return axios.post(END_POINTS.CHECKOUT, {}, config)
}
