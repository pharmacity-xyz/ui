export interface ISignUpApiData {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  city: string
  country: string
  companyName: string
}

export interface ILogInApiData {
  email: string
  password: string
}
