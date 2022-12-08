import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import Layout from 'components/Layout'
import { useModal } from 'hooks/useModal'
import { getOrderDetailApi, getOrdersApi } from 'services/order/orderServices'
import { IReturnOrders } from 'services/order/types'

const Order = () => {
  const [orders, setOrders] = useState<Array<IReturnOrders>>([])
  const [searchWord, setSearchWord] = useState<string>('')
  const router = useRouter()

  const { setIsOpen, setOrderDetail } = useModal()

  const fetchOrders = async () => {
    try {
      const res = await getOrdersApi()
      setOrders(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSearchOrders = async () => {
    let retList: Array<IReturnOrders> = []
    const res = await getOrdersApi()
    res.data.map((order) => {
      if (order.product.includes(searchWord)) {
        retList.push(order)
      }
    })
    setOrders(retList)
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
      <div className="mt-5 mx-20 px-20 h-screen">
        <div className="flex justify-between p-4">
          <h1 className="text-2xl">Your Orders</h1>
          <div
            className="flex items-center justify-between gap-2"
            id="store-nav-content"
          >
            <input
              type="text"
              name="price"
              id="price"
              className="block w-full border rounded-md pl-2 py-2 border-black focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Search"
              onChange={(e) => setSearchWord(e.target.value)}
            />
            <svg
              className="fill-current cursor-pointer text-black"
              onClick={() => handleSearchOrders()}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
            </svg>
          </div>
        </div>
        <div className="overflow-scroll h-5/6">
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
