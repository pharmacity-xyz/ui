import { getAxiosConfig } from 'utils/config'
import axios from '../../apis/axios'
import { IAddCategoryApi, IUpdateCategory } from './types'

const END_POINTS = {
  ADD: '/category',
  GET_ALL: '/category',
  DELETE: '/category',
  UPDATE: '/category',
}

export const addCategoryApi = (data: IAddCategoryApi) => {
  const config = getAxiosConfig()
  return axios.post(END_POINTS.ADD, data, config)
}

export const getAllCategoriesApi = () => {
  return axios.get(END_POINTS.GET_ALL)
}

export const updateCategoryApi = (data: IUpdateCategory) => {
  const config = getAxiosConfig()
  return axios.put(END_POINTS.UPDATE, data, config)
}

export const deleteCategoryApi = (categoryId) => {
  const config = getAxiosConfig()
  return axios.delete(`${END_POINTS.DELETE}/${categoryId}`, config)
}
