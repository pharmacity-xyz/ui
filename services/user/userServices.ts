import { AxiosRequestConfig } from 'axios'
import axios from '../../apis/axios'
import { IReturnUser } from './types'

const END_POINTS = {
  GET_ALL: '/user',
  GET_USER: '/user',
  UPDATE: '/user',
  DELETE: '/user',
}

export const getAllUsersApi = (config: AxiosRequestConfig) => {
  return axios.get(END_POINTS.GET_ALL, config)
}

export const getUsersApi = (config: AxiosRequestConfig, userId: string) => {
  return axios.get(`${END_POINTS.GET_USER}/${userId}`, config)
}

export const updateUserApi = (
  config: AxiosRequestConfig,
  data: IReturnUser
) => {
  return axios.put(`${END_POINTS.UPDATE}`, data, config)
}
