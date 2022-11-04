import { AxiosRequestConfig } from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import AdminLayout from '../../../../components/AdminLayout'
import { getAllCategoriesApi } from '../../../../services/category/categoryServices'
import { IReturnGetCategories } from '../../../../services/category/types'
import {
  addProductApi,
  getProductByIdApi,
  updateProductApi,
} from '../../../../services/product/productServices'
import {
  IAddProductAPI,
  IReturnProducts,
} from '../../../../services/product/types'

const EditProduct = () => {
  const [product, setProduct] = useState({} as IReturnProducts)
  const [categories, setCategories] = useState<Array<IReturnGetCategories>>([])
  const router = useRouter()

  const fetchAllCategories = async () => {
    try {
      const res = await getAllCategoriesApi()
      setCategories(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdateProduct = async () => {
    try {
      let token = localStorage.getItem('token')
      const config: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${token}` },
      }
      await updateProductApi(product, config)
      router.push('/admin/product')
    } catch (error) {
      console.error(error)
    }
  }

  const fetchProductById = async (productId: string) => {
    try {
      const res = await getProductByIdApi(productId)
      setProduct(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const { id } = router.query
    fetchProductById(id as string)
    fetchAllCategories()
  }, [])

  return (
    <AdminLayout title="Add Product">
      <div className="border p-2">
        <h1 className="text-2xl text-center m-2">Edit Product</h1>
        <form>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              defaultValue={product.productName}
              onChange={(e) =>
                setProduct({ ...product, productName: e.target.value })
              }
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <textarea
              name="floating_email"
              rows={10}
              id="floating_email"
              className="block py-2.5 px-0 w-full bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              defaultValue={product.productDescription}
              required
              onChange={(e) =>
                setProduct({
                  ...product,
                  productDescription: e.target.value,
                })
              }
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              ProductDescription
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              defaultValue={product.imageUrl}
              required
              onChange={(e) =>
                setProduct({
                  ...product,
                  imageUrl: e.target.value,
                })
              }
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              ImageUrl
            </label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="number"
                name="floating_first_name"
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                defaultValue={product.stock}
                required
                onChange={(e) =>
                  setProduct({
                    ...product,
                    stock: parseInt(e.target.value),
                  })
                }
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Stock
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="number"
                name="floating_last_name"
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                defaultValue={product.price}
                required
                onChange={(e) =>
                  setProduct({
                    ...product,
                    price: parseInt(e.target.value),
                  })
                }
              />
              <label
                htmlFor="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Price
              </label>
            </div>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <label
              htmlFor="categories"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Featured
            </label>
            <div className="flex gap-1">
              <div className="flex w-1/2 items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
                <input
                  checked={product.featured}
                  id="bordered-radio-1"
                  type="radio"
                  name="bordered-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={() => setProduct({ ...product, featured: true })}
                />
                <label
                  htmlFor="bordered-radio-1"
                  className="py-4 ml-2 w-full text-sm font-medium text-gray-900"
                >
                  TRUE
                </label>
              </div>
              <div className="flex w-1/2 items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
                <input
                  checked={!product.featured}
                  id="bordered-radio-2"
                  type="radio"
                  value=""
                  name="bordered-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={() => setProduct({ ...product, featured: false })}
                />
                <label
                  htmlFor="bordered-radio-2"
                  className="py-4 ml-2 w-full text-sm font-medium text-gray-900"
                >
                  FALSE
                </label>
              </div>
            </div>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <label
              htmlFor="categories"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Category
            </label>
            <select
              id="categories"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={product.categoryId}
              onChange={(e) =>
                setProduct({
                  ...product,
                  categoryId: e.target.value,
                })
              }
            >
              {categories.map((category) => (
                <option value={category.categoryId} key={category.categoryId}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-evenly">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => handleUpdateProduct()}
            >
              Update
            </button>
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              onClick={() => router.push('/admin/product')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

export default EditProduct
