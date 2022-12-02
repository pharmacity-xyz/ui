export interface IAddProductAPI {
  productName: string
  productDescription: string
  imageUrl: string
  stock: number
  price: number
  categoryId: string
}

export interface IReturnProducts {
  ProductId: string
  ProductName: string
  ProductDescription: string
  ImageUrl: string
  Images: Array<string>
  Stock: number
  Price: number
  Featured: boolean
  Category: Object
  CategoryId: string
}

export type IOrderDetailProducts = {
  productId: string
  productName: string
  imageUrl: string
  quantity: number
  totalPrice: number
}
