import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import Layout from 'components/Layout'
import { useModal } from 'hooks/useModal'
import { getOrderDetailApi, getOrdersApi } from 'services/order/orderServices'
import { IReturnOrders } from 'services/order/types'

const Order = () => {
  const [orders, setOrders] = useState<Array<IReturnOrders>>([])

  const { setIsOpen, setOrderDetail } = useModal()

  const fetchOrders = async () => {
    try {
      const res = await getOrdersApi()
      setOrders(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleOrderDetailModal = async (orderId: string) => {
    try {
      const res = await getOrderDetailApi(orderId)
      setOrderDetail(res.data)
      setIsOpen(true)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <Layout title="Your Orders">
      <div className="m-20 px-20 h-screen">
        <h1 className="text-2xl">Your Orders</h1>
        <div className="">
          {orders.map((order) => (
            <div className="flex border-b-2 py-4" key={order.id}>
              <div className="w-2/6  text-center">
                {order.productImageUrl && (
                  <Image
                    src={order.productImageUrl}
                    alt={order.product}
                    width={100}
                    height={100}
                  />
                )}
              </div>
              <div className="w-2/6">
                <h1 className="mb-4">{order.product}</h1>
                <h1>$ {order.totalPrice}</h1>
              </div>
              <div className="w-1/6 flex justify-center items-center">
                <h1 className="mb-4">{order.statusOrder}</h1>
              </div>
              <div className="w-1/6 flex items-center justify-center">
                <button
                  type="button"
                  className="border rounded-lg p-2 bg-[#52BA2D] hover:bg-green-500"
                  onClick={() => handleOrderDetailModal(order.id)}
                >
                  DETAIL
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Order
