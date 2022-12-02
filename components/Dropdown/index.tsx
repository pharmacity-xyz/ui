import Link from 'next/link'
import React, { useState } from 'react'
import { BiUser } from 'react-icons/bi'

import { useAuth } from '../../context/authContextProvider'

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false)

  const { logout } = useAuth()

  return (
    <div className="inline-flex bg-white rounded-md">
      <div className="relative">
        <button
          type="button"
          className="flex text-sm px-4 py-2 leading-none bg-[#52BA2D] border rounded text-black border-black mt-4 lg:mt-0"
          onClick={() => setIsOpen(!isOpen)}
        >
          <BiUser />
        </button>
        {isOpen && (
          <div className="absolute right-0 z-10 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg">
            <div className="p-2">
              <Link href="/order">
                <a className="block px-4 py-2 text-sm text-center text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700">
                  Orders
                </a>
              </Link>
              <Link href="/account">
                <a className="block px-4 py-2 text-sm text-center text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700">
                  Account
                </a>
              </Link>
              <button
                className="w-full block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                onClick={logout}
              >
                Signout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
