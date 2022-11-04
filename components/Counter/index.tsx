import React from 'react'
import { useShoppingCart } from 'use-shopping-cart'

const Counter = ({ id, quantity }) => {
  const { incrementItem, decrementItem } = useShoppingCart()
  return (
    <div>
      <button
        onClick={() => decrementItem(id)}
        className="text-[#75b239] border border-[#75b239] p-1 rounded-l-md"
      >
        -
      </button>
      <input
        type="number"
        readOnly
        value={quantity}
        className="border border-gray py-1 w-3/5 text-center"
      />
      <button
        onClick={() => incrementItem(id)}
        className="text-[#75b239] border border-[#75b239] p-1 rounded-r-md"
      >
        +
      </button>
    </div>
  )
}

export default Counter
