export interface IProduct {
  id: string
  name: string
  category: number
  price: number
  detail: string
  image: string
  isFeatured: boolean
}

export interface ICart {
  id: string
  name: string
  category: number
  price: number
  detail: string
  image: string
  isFeatured: boolean
  quantity: number
}
