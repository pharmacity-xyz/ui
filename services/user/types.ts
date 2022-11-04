export interface IReturnUser {
  userId: string
  email: string
  passwordHash: string
  passwordSalt: string
  firstName: string
  lastName: string
  city: string
  country: string
  companyName: string
  role: string
  orders: Object
}
