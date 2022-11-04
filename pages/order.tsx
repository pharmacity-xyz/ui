import { AxiosRequestConfig } from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { getOrdersApi } from '../services/order/orderServices'
import { IReturnOrders } from '../services/order/types'

const Order = () => {
  const [orders, setOrders] = useState<Array<IReturnOrders>>([])

  const fetchOrders = async () => {
    try {
      let token = localStorage.getItem('token')
      const config: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${token}` },
      }
      const res = await getOrdersApi(config)
      setOrders(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <Layout title="Your Orders">
      <div className="mx-20">
        <h1>Your Orders</h1>
        {orders.map((order) => (
          <div className="flex border-b-2 py-4" key={order.id}>
            <div className="w-2/6">
              {order.productImageUrl && (
                <img
                  src={order.productImageUrl}
                  alt={order.product}
                  className="w-24"
                />
              )}
            </div>
            <div className="w-3/6 items-center justify-end">
              <h1 className="mb-4">{order.product}</h1>
              <div className="flex justify-evenly">
                {/* <button onClick={() => deleteCartProduct(cart.productId)}>
                <BsTrashFill className="text-2xl text-red-600" />
              </button> */}
              </div>
            </div>
            <div className="w-1/6 flex items-center justify-end">
              <h1>$ {order.totalPrice}</h1>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default Order
