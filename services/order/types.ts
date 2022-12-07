import { IOrderDetailProducts } from '../product/types'

export interface IReturnOrders {
  id: string
  orderDate: string
  totalPrice: number
  product: string
  productImageUrl: string
  statusOrder: string
}

export type IOrderDetail = {
  orderDate: string
  totalPrice: number
  products: Array<IOrderDetailProducts>
}
