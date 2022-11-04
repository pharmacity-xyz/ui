export interface IAddCartApi {
  userId: string
  productId: string
  quantity: number
}

export interface IReturnCart {
  productId: string
  productName: string
  imageUrl: string
  price: number
  quantity: number
}
