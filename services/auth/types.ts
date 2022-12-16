export interface ISignUpApiData {
  email: string
  password: string
  confirm_password: string
  first_name: string
  last_name: string
  city: string
  country: string
  company_name: string
}

export interface ILogInApiData {
  email: string
  password: string
}
