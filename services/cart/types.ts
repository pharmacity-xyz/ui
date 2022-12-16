export interface IAddCartApi {
  product_id: string
  quantity: number
}

export interface IReturnCart {
  product_id: string
  product_name: string
  image_url: string
  price: number
  quantity: number
}
