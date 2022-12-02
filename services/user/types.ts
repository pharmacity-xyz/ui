export interface IReturnUser {
  UserId: string
  Email: string
  PasswordHash: string
  PasswordSalt: string
  FirstName: string
  LastName: string
  City: string
  Country: string
  CompanyName: string
  Role: string
  Orders: Object
}
