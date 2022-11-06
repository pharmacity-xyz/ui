import axios from '../../apis/axios'

import { ISignUpApiData, ILogInApiData } from './types'

const END_POINTS = {
  SIGN_UP: 'auth/register',
  LOG_IN: 'auth/login',
  LOGGED_MEMBER: 'auth/loggedMember',
  CHANGE_PASSWORD: 'auth/changePassword',
  CHECK_EMAIL_EXIST: 'auth/get_email',
  FORGOT_PASSWORD: 'auth/forgot_password',
}

export const signUpApi = (data: ISignUpApiData) => {
  return axios.post(END_POINTS.SIGN_UP, data)
}

export const logInApi = (data: ILogInApiData) => {
  return axios.post(END_POINTS.LOG_IN, data)
}

export const loggedMemberApi = () => {
  return axios.get(END_POINTS.LOGGED_MEMBER)
}

export const changePasswordApi = (data) => {
  return axios.post(END_POINTS.CHANGE_PASSWORD, null, { params: data })
}

export const checkEmailExist = (email: string) => {
  return axios.get(`${END_POINTS.CHECK_EMAIL_EXIST}?email=${email}`)
}

export const forgotPassword = (email: string, newPassword: string) => {
  return axios.post(
    `${END_POINTS.FORGOT_PASSWORD}?email=${email}&newPassword=${newPassword}`
  )
}
