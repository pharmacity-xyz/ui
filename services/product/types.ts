export interface IAddProductAPI {
  productName: string
  productDescription: string
  imageUrl: string
  stock: number
  price: number
  categoryId: string
}

export interface IReturnProducts {
  productId: string
  productName: string
  productDescription: string
  imageUrl: string
  images: Array<string>
  stock: number
  price: number
  featured: boolean
  category: Object
  categoryId: string
}
