import { getAxiosConfig } from 'utils/config'
import axios from '../../apis/axios'
import { IAddProductAPI } from './types'

const END_POINTS = {
  ADD: '/product',
  GET_ALL: '/product',
  GET_BY_ID: '/product/product',
  GET_BY_CATEGORYID: '/product/category',
  SEARCH: '/product/search',
  FEATURED: '/product/featured',
  UPDATE: '/product',
  DELETE: '/product',
}

export const addProductApi = (data: IAddProductAPI) => {
  const config = getAxiosConfig()
  return axios.post(END_POINTS.ADD, data, config)
}

export const getAllProductsApi = () => {
  return axios.get(END_POINTS.GET_ALL)
}

export const getProductByIdApi = (productId: string) => {
  return axios.get(`${END_POINTS.GET_BY_ID}?id=${productId}`)
}

export const getProductsByCategoryApi = (categoryId: string) => {
  return axios.get(`${END_POINTS.GET_BY_CATEGORYID}?id=${categoryId}`)
}

export const searchProductsApi = (searchWord: string) => {
  return axios.get(`${END_POINTS.SEARCH}?word=${searchWord}`)
}

export const getFeaturedProducts = () => {
  return axios.get(`${END_POINTS.FEATURED}`)
}

export const updateProductApi = (data) => {
  const config = getAxiosConfig()
  return axios.put(END_POINTS.UPDATE, data, config)
}

export const deleteProductApi = (id) => {
  const config = getAxiosConfig()
  return axios.delete(`${END_POINTS.DELETE}/${id}`, config)
}
