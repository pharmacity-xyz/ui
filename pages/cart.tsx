import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Counter from '../components/Counter'
import { BsTrashFill } from 'react-icons/bs'
import { toast } from 'react-toastify'

import { FeaturedProductsSlider } from 'components/Slider'
import Layout from 'components/Layout'
import {
  deleteCartApi,
  getCartsApi,
  updateQuantityApi,
} from 'services/cart/cartServices'
import { IReturnCart } from 'services/cart/types'
import { checkoutApi } from 'services/checkout/checkoutServices'
import Spinner from 'components/Spinner'

const Cart = () => {
  const [carts, setCarts] = useState<Array<IReturnCart>>([{} as IReturnCart])
  const [totalPrice, setTotalPrice] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetchCarts = async () => {
    try {
      setLoading(true)
      const res = await getCartsApi()
      setCarts(res.data)

      let total = 0
      if (res.data.length > 0) {
        res.data.forEach((cartElement) => {
          total += cartElement.price * cartElement.quantity
        })
      }

      setTotalPrice(total)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteCartProduct = async (productId) => {
    try {
      await deleteCartApi(productId)

      await fetchCarts()
      toast.success('Successfully deleted')
    } catch (error) {
      toast.error('Something went wrong')
      console.error(error)
    }
  }

  const handleIncrementItem = async (cart: IReturnCart) => {
    try {
      await updateQuantityApi({ ...cart, quantity: cart.quantity + 1 })

      await fetchCarts()
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const handleDecrementItem = async (cart: IReturnCart) => {
    try {
      await updateQuantityApi({ ...cart, quantity: cart.quantity - 1 })
      await fetchCarts()
      // toast.success('Successfully added')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const handleCheckout = async () => {
    try {
      const res = await checkoutApi()

      // @ts-ignore
      window.open(res as string)
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCarts()
  }, [])

  return (
    <Layout title="Cart">
      <div className="flex mt-10">
        <div className="w-2/3 px-8 py-4 border-2 mx-4">
          <h1 className="text-2xl">Shopping Cart</h1>
          <p className="text-right">Price</p>
          <hr />
          {loading === true ? (
            <Spinner />
          ) : (
            <>
              {carts.length === 0 && (
                <h1 className="py-4 text-2xl text-center">
                  Your cart is empty.
                </h1>
              )}
              {carts.map((cart) => (
                <div className="flex border-b-2 py-4" key={cart.productId}>
                  <div className="w-2/6">
                    {cart.imageUrl && (
                      <Image
                        src={cart.imageUrl}
                        alt={cart.productName}
                        width={100}
                        height={100}
                      />
                    )}
                  </div>
                  <div className="w-3/6 items-center justify-end">
                    <h1 className="mb-4">{cart.productName}</h1>
                    <div className="flex justify-evenly">
                      <Counter
                        cart={cart}
                        handleDecrementItem={handleDecrementItem}
                        handleIncrementItem={handleIncrementItem}
                      />
                      <button onClick={() => deleteCartProduct(cart.productId)}>
                        <BsTrashFill className="text-2xl text-red-600" />
                      </button>
                    </div>
                  </div>
                  <div className="w-1/6 flex items-center justify-end">
                    <h1>$ {cart.quantity * cart.price}</h1>
                  </div>
                </div>
              ))}
            </>
          )}
          <h1 className="text-right">
            Subtotal ({carts.length} items): ${totalPrice}
          </h1>
        </div>
        <div className="w-1/3 mx-4">
          <div className="border-2 p-2">
            <h1 className="text-xl font-medium pb-4">
              Subtotal ({carts.length} items): ${totalPrice}
            </h1>
            <button
              className="bg-yellow-400 p-2 rounded-md w-full mb-4"
              onClick={() => handleCheckout()}
              disabled={carts.length < 1}
            >
              Proceed to checkout
            </button>
            <button className="bg-red-400 p-2 rounded-md w-full" disabled>
              Clear cart
            </button>
          </div>
        </div>
      </div>
      <div className="my-20">
        <div className="my-10">
          <div className="flex justify-between items-center px-8">
            <h2 className="text-3xl">
              <strong className="text-[#75b239]">Featured Products</strong>
            </h2>
          </div>
          <div className="px-8 py-6">
            <hr />
          </div>
        </div>
        <FeaturedProductsSlider />
      </div>
    </Layout>
  )
}

export default Cart
