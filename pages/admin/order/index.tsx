import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import AdminLayout from 'components/AdminLayout'
import {
  getOrdersForAdminApi,
  updateStatusOrderApi,
} from 'services/order/orderServices'
import { IReturnOrders } from 'services/order/types'

const OrderManagement = () => {
  const [orders, setOrders] = useState<Array<IReturnOrders>>([])

  const fetchAllOrders = async () => {
    try {
      const res = await getOrdersForAdminApi()
      setOrders(res.data)
    } catch (error) {
      toast.error('Something went wrong')
      console.error(error)
    }
  }

  const handleUpdateStatusOrder = async (orderId: string) => {
    try {
      const res = await updateStatusOrderApi(orderId, 'SHIPPED')
      fetchAllOrders()
    } catch (error) {
      toast.error('Something went wrong')
      console.error(error)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <AdminLayout title="Order">
      <div>
        <h1 className="text-2xl">Order List</h1>
        <div className="container py-10 mx-auto md:px-6">
          <section className="mb-20 text-gray-800">
            <div className="block rounded-lg shadow-lg bg-white">
              <div className="flex flex-col overflow-x-scroll">
                <div className="sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full pl-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full mb-0">
                        <thead className="border-b rounded-t-lg text-left bg-gray-900">
                          <tr>
                            <th
                              scope="col"
                              className="text-white rounded-tl-lg text-sm font-medium px-6 py-4"
                            >
                              Product Image
                            </th>
                            <th
                              scope="col"
                              className="text-white rounded-tl-lg text-sm font-medium px-6 py-4"
                            >
                              Product Name
                            </th>
                            <th
                              scope="col"
                              className="text-white rounded-tl-lg text-sm font-medium px-6 py-4"
                            >
                              Order Date
                            </th>
                            <th
                              scope="col"
                              className="text-white rounded-tl-lg text-sm font-medium px-6 py-4"
                            >
                              Order Status
                            </th>
                            <th
                              scope="col"
                              className="text-white rounded-tr-lg text-sm font-medium px-6 py-4"
                            ></th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.length > 0 &&
                            orders.map((order) => (
                              <tr className="border-b" key={order.id}>
                                <th
                                  className="text-sm font-medium px-6 py-4 whitespace-nowrap text-left"
                                  scope="row"
                                >
                                  <Image
                                    src={order.productImageUrl}
                                    width={100}
                                    height={100}
                                    alt={order.product}
                                  />
                                </th>
                                <th
                                  className="text-sm font-medium px-6 py-4 whitespace-nowrap text-left"
                                  scope="row"
                                >
                                  {order.product}
                                </th>
                                <th
                                  className="text-sm font-medium px-6 py-4 whitespace-nowrap text-left"
                                  scope="row"
                                >
                                  {new Date(
                                    order.orderDate
                                  ).toLocaleDateString()}
                                </th>
                                <th
                                  className="text-sm font-medium px-6 py-4 whitespace-nowrap text-left"
                                  scope="row"
                                >
                                  {order.statusOrder}
                                </th>
                                <td className="text-sm font-normal px-6 py-4 whitespace-nowrap text-right">
                                  {order.statusOrder === 'PAID' ? (
                                    <button
                                      className="font-medium text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 transition duration-300 ease-in-out"
                                      onClick={() =>
                                        handleUpdateStatusOrder(order.id)
                                      }
                                    >
                                      SHIPPED
                                    </button>
                                  ) : (
                                    <div></div>
                                  )}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AdminLayout>
  )
}

export default OrderManagement
