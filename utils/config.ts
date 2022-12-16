import { AxiosRequestConfig } from 'axios'

export const getAxiosConfig = (): AxiosRequestConfig => {
  let token = localStorage.getItem('token')
  return {
    headers: { "Authorization": `Bearer ${token}` },
  }
}
