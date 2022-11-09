import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsCart4 } from 'react-icons/bs'
import { BiUser } from 'react-icons/bi'

import Dropdown from '../Dropdown'

export const Header = () => {
  const [userId, setUserId] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    setUserId(localStorage.getItem('userId'))
    setToken(localStorage.getItem('token'))
  }, [userId, token])

  return (
    <nav className="flex items-center justify-between flex-wrap dark:bg-gray-900 p-6 sticky top-0 z-50">
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <svg
          className="fill-current h-8 w-8 mr-2 text-white"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
        </svg>
        <Link href="/">
          <span className="font-semibold text-xl tracking-tight cursor-pointer text-white">
            MedicalEquipmentShop
          </span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/">
          <a className="px-4 bg-orange-400 h-8">Home</a>
        </Link>
        <Link href="/shop">
          <a className="px-4 bg-orange-400 h-8">Shop</a>
        </Link>
        <Link href="/about">
          <a className="px-4 bg-orange-400 h-8">About</a>
        </Link>
      </div>
      <div className="flex items-center w-auto">
        <div className="flex gap-4">
          {userId === null && token === null ? (
            <div>
              <Link href="/login">
                <a className="flex text-sm px-4 py-2 leading-none bg-[#52BA2D] border rounded text-black border-black mt-4 lg:mt-0">
                  SIGN IN / SIGN UP
                  <BiUser />
                </a>
              </Link>
            </div>
          ) : (
            <>
              <Dropdown />
              <div className="bg-white rounded-md">
                <Link href="/cart">
                  <a className="flex text-sm px-4 py-2 leading-none rounded text-black border-black mt-4 lg:mt-0">
                    <BsCart4 />
                    Cart
                  </a>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
