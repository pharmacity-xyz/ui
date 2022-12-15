import { AxiosRequestConfig } from 'axios'

export const getAxiosConfig = (): AxiosRequestConfig => {
  let token = localStorage.getItem('token')
  return {
    headers: { Cookie: `token=${token};` },
  }
}
