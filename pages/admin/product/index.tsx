import { AxiosRequestConfig } from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import AdminLayout from '../../../components/AdminLayout'
import {
  deleteCategoryApi,
  getAllCategoriesApi,
  updateCategoryApi,
} from '../../../services/category/categoryServices'
import {
  deleteProductApi,
  getAllProductsApi,
} from '../../../services/product/productServices'
import { IReturnProducts } from '../../../services/product/types'

const ProductManagement = () => {
  const [products, setProducts] = useState<Array<IReturnProducts>>([])

  const fetchAllProducts = async () => {
    try {
      const res = await getAllProductsApi()
      setProducts(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleEditProduct = async (categoryId: string, updatedName: string) => {
    try {
      let token = localStorage.getItem('token')
      const config: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${token}` },
      }
      const res = await updateCategoryApi(
        { categoryId, name: updatedName },
        config
      )
      setProducts(res.data)
      toast('Updated!')
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    try {
      let token = localStorage.getItem('token')
      const config: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${token}` },
      }
      await deleteProductApi(productId, config)
      fetchAllProducts()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchAllProducts()
  }, [])

  return (
    <AdminLayout title="Product">
      <div>
        <h1 className="text-2xl">Product List</h1>
        <div className="container py-10 mx-auto md:px-6">
          <div className="text-right">
            <Link href="/admin/product/add">
              <button type="button" className="border px-5 my-5 bg-green-500">
                Add
              </button>
            </Link>
          </div>
          <section className="mb-20 text-gray-800">
            <div className="block rounded-lg shadow-lg bg-white">
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full mb-0">
                        <thead className="border-b rounded-t-lg text-left bg-gray-900">
                          <tr>
                            <th
                              scope="col"
                              className="text-white rounded-tl-lg text-sm font-medium px-6 py-4"
                            >
                              NAME
                            </th>
                            <th
                              scope="col"
                              className="text-white rounded-tl-lg text-sm font-medium px-6 py-4"
                            >
                              STOCK
                            </th>
                            <th
                              scope="col"
                              className="text-white rounded-tl-lg text-sm font-medium px-6 py-4"
                            >
                              PRICE
                            </th>
                            <th
                              scope="col"
                              className="text-white rounded-tl-lg text-sm font-medium px-6 py-4"
                            >
                              FEATURED
                            </th>
                            <th
                              scope="col"
                              className="text-white rounded-tr-lg text-sm font-medium py-4"
                            ></th>
                            <th
                              scope="col"
                              className="text-white rounded-tr-lg text-sm font-medium px-6 py-4"
                            ></th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((product) => (
                            <>
                              <tr className="border-b" key={product.productId}>
                                <th
                                  className="text-sm font-medium px-6 py-4 whitespace-nowrap text-left"
                                  scope="row"
                                >
                                  <input
                                    defaultValue={product.productName}
                                    onChange={(e) => {
                                      product.productName = e.target.value
                                    }}
                                  />
                                </th>
                                <th
                                  className="text-sm font-medium px-6 py-4 whitespace-nowrap text-left"
                                  scope="row"
                                >
                                  {product.stock}
                                </th>
                                <th
                                  className="text-sm font-medium px-6 py-4 whitespace-nowrap text-left"
                                  scope="row"
                                >
                                  {product.price}
                                </th>
                                <th
                                  className="text-sm font-medium px-6 py-4 whitespace-nowrap text-left"
                                  scope="row"
                                >
                                  {product.featured ? (
                                    <h1>true</h1>
                                  ) : (
                                    <h1>false</h1>
                                  )}
                                </th>
                                <td className="text-sm font-normal px-6 py-4 whitespace-nowrap text-right">
                                  <button
                                    className="font-medium text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 transition duration-300 ease-in-out"
                                    onClick={() =>
                                      handleEditProduct(
                                        product.productId,
                                        product.productName
                                      )
                                    }
                                  >
                                    Edit
                                  </button>
                                </td>
                                <td className="text-sm font-normal px-6 py-4 whitespace-nowrap text-right">
                                  <button
                                    className="font-medium text-red-600 hover:text-red-700 focus:text-red-700 active:text-red-800 transition duration-300 ease-in-out"
                                    onClick={() =>
                                      handleDeleteProduct(product.productId)
                                    }
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            </>
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

export default ProductManagement
