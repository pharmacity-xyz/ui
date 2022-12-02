import { getAxiosConfig } from 'utils/config'
import axios from '../../apis/axios'
import { IReturnUser } from './types'

const END_POINTS = {
  GET_ALL: '/user',
  GET_USER: '/user',
  UPDATE: '/user',
  DELETE: '/user',
}

export const getAllUsersApi = () => {
  const config = getAxiosConfig()
  return axios.get(END_POINTS.GET_ALL, config)
}

export const getUsersApi = (userId: string) => {
  const config = getAxiosConfig()
  return axios.get(`${END_POINTS.GET_USER}/${userId}`, config)
}

export const updateUserApi = (data: IReturnUser) => {
  const config = getAxiosConfig()
  return axios.put(`${END_POINTS.UPDATE}`, data, config)
}
