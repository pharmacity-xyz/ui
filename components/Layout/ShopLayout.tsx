import React, { ReactNode } from 'react'
import Link from 'next/link'
import { IReturnGetCategories } from '../../services/category/types'

type Props = {
  children: ReactNode
  categories: Array<IReturnGetCategories>
  setSearchWord: (searchWord: string) => void
  searchProducts: () => void
}

const ShopLayout = ({
  children,
  categories,
  setSearchWord,
  searchProducts,
}: Props) => {
  return (
    <div className="flex w-full h-screen">
      <div className="w-1/4 bg-[#52BA2D] shadow flex-col justify-between hidden sm:flex">
        <div className="px-8">
          {/* <div className="flex items-center" id="store-nav-content">
            <input
              type="text"
              autoFocus={false}
              placeholder="Search"
              className="text-black bg-[#52BA2D] border-b-2 border-black placeholder-slate-700"
              onChange={(e) => setSearchWord(e.target.value)}
            />
            <svg
              className="fill-current hover:text-black cursor-pointer text-black"
              onClick={() => searchProducts()}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
            </svg>
          </div> */}
          <div className="relative mt-10 rounded-md shadow-sm">
            <div
              className="flex items-center justify-between gap-2"
              id="store-nav-content"
            >
              <input
                type="text"
                name="price"
                id="price"
                className="block w-full rounded-md border-gray-300 pl-2 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Search"
                onChange={(e) => setSearchWord(e.target.value)}
              />
              <svg
                className="fill-current hover:text-black cursor-pointer text-black"
                onClick={() => searchProducts()}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
              </svg>
            </div>
          </div>
          <div className="h-16 w-full flex items-center">
            <Link href="/">
              <span className="font-semibold text-xl tracking-tight cursor-pointer text-white">
                Categories
              </span>
            </Link>
          </div>
          <div className="gap-4">
            {categories.map((category) => (
              <button
                key={category.categoryId}
                className="mx-3 px-3 h-8 rounded-md border-black"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="h-64 w-3/4 px-6">{children}</div>
    </div>
  )
}

export default ShopLayout
