export interface IReturnUser {
  user_id: string
  email: string
  passwordHash: string
  passwordSalt: string
  first_name: string
  last_name: string
  city: string
  country: string
  company_name: string
  role: string
  orders: Object
}
