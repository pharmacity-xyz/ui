import React from 'react'

const Counter = ({ cart, handleIncrementItem, handleDecrementItem }) => {
  return (
    <div>
      <button
        onClick={() => handleDecrementItem(cart)}
        className="text-[#75b239] border border-[#75b239] p-1 rounded-l-md"
      >
        -
      </button>
      <input
        type="number"
        readOnly
        value={cart.quantity}
        className="border border-gray py-1 w-3/5 text-center"
      />
      <button
        onClick={() => handleIncrementItem(cart)}
        className="text-[#75b239] border border-[#75b239] p-1 rounded-r-md"
      >
        +
      </button>
    </div>
  )
}

export default Counter
