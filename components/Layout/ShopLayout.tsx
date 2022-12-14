import React, { ReactNode, useState } from 'react'

import { IReturnGetCategories } from 'services/category/types'
import ListboxComponent from '../Listbox'

type Props = {
  children: ReactNode
  categories: Array<IReturnGetCategories>
  setSearchWord: (searchWord: string) => void
  searchProducts: () => void
  searchProductsByCategory: (categoryId: string) => void
  handleSelectSort: (option) => void
}

const options = [
  {
    id: 0,
    name: 'Default',
  },
  {
    id: 1,
    name: 'Featured',
  },
  {
    id: 2,
    name: 'Price: Low to High',
  },
  {
    id: 3,
    name: 'Price: High to Low',
  },
]

const ShopLayout = ({
  children,
  categories,
  setSearchWord,
  searchProducts,
  searchProductsByCategory,
  handleSelectSort,
}: Props) => {
  const [selected, setSelected] = useState(options[0])

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/4 dark:bg-gray-900 shadow flex-col justify-between hidden sm:flex">
        <div className="px-8">
          <div className="relative mt-10 mb-5 rounded-md shadow-sm">
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
                className="fill-current cursor-pointer text-white"
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
          <ListboxComponent
            selected={selected}
            setSelected={setSelected}
            options={options}
            handleSelectSort={handleSelectSort}
          />
          <div className="h-16 w-full flex items-center">
            <span className="font-semibold text-xl tracking-tight cursor-pointer text-white">
              Categories
            </span>
          </div>
          <div className="gap-4">
            {categories.map((category) => (
              <button
                key={category.category_id}
                className="mx-3 px-3 h-8 rounded-md border-black text-white"
                onClick={() => searchProductsByCategory(category.category_id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="h-screen overflow-y-scroll w-3/4 px-6 ">
        <h1 className="py-8 font-bold text-lg">RESULTS</h1>
        <div className="flex flex-wrap">{children}</div>
      </div>
    </div>
  )
}

export default ShopLayout
