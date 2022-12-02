import { IOrderDetailProducts } from '../product/types'

export interface IReturnOrders {
  OrderId: string
  OrderDate: string
  TotalPrice: number
  Product: string
  ProductImageUrl: string
}

export type IOrderDetail = {
  orderDate: string
  totalPrice: number
  products: Array<IOrderDetailProducts>
}
