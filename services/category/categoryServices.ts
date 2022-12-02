import { AxiosRequestConfig } from 'axios'
import axios from '../../apis/axios'
import { IAddCategoryApi, IUpdateCategory } from './types'

const END_POINTS = {
  ADD: '/category',
  GET_ALL: '/category',
  DELETE: '/category',
  UPDATE: '/category',
}

export const addCategoryApi = (
  data: IAddCategoryApi,
  config: AxiosRequestConfig
) => {
  return axios.post(END_POINTS.ADD, data)
}

export const getAllCategoriesApi = () => {
  return axios.get(END_POINTS.GET_ALL)
}

export const updateCategoryApi = (
  data: IUpdateCategory,
  config: AxiosRequestConfig
) => {
  return axios.put(END_POINTS.UPDATE, data, config)
}

export const deleteCategoryApi = (categoryId, config: AxiosRequestConfig) => {
  return axios.delete(`${END_POINTS.DELETE}/${categoryId}`, config)
}
