import Image from 'next/image'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import Modal from 'react-modal'
import { IOrderDetail } from '../../services/order/types'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

type OrderDetailModalProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  orderDetail: IOrderDetail
}

Modal.setAppElement('#__next')

const OrderDetailModal = ({
  isOpen,
  setIsOpen,
  orderDetail,
}: OrderDetailModalProps) => {
  let subtitle

  const closeModal = () => {
    setIsOpen(false)
  }

  const cancelButtonRef = useRef(null)

  return (
    <Modal
      isOpen={isOpen}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="overflow-hidden bg-white shadow sm:rounded-lg w-[42rem]">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Order Detail
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Personal details and application.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Order Date</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {orderDetail.orderDate}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Total Price</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                $ {orderDetail.totalPrice}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Products</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"></dd>
            </div>
            {orderDetail.products.map((product) => (
              <div className="flex border-b-2 py-4" key={product.productId}>
                <div className="w-1/6  text-center">
                  {product.imageUrl && (
                    <Image
                      src={product.imageUrl}
                      alt={product.productName}
                      width={50}
                      height={50}
                    />
                  )}
                </div>
                <div className="w-5/6">
                  <h1 className="">{product.productName}</h1>
                  <h1>Quantity: {product.quantity}</h1>
                  <h1>Total Price: $ {product.totalPrice}</h1>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Modal>
  )
}

export default OrderDetailModal
