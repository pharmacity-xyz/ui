export interface IAddProductAPI {
  product_name: string
  product_description: string
  image_url: string
  stock: number
  price: number
  category_id: string
}

export interface IReturnProducts {
  product_id: string
  product_name: string
  product_description: string
  image_url: string
  images: Array<string>
  stock: number
  price: number
  featured: boolean
  category: Object
  category_id: string
}

export type IOrderDetailProducts = {
  product_id: string
  product_name: string
  image_url: string
  quantity: number
  total_price: number
}
