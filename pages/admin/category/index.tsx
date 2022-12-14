import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import AdminLayout from 'components/AdminLayout'
import {
  deleteCategoryApi,
  getAllCategoriesApi,
  updateCategoryApi,
} from 'services/category/categoryServices'
import { IReturnGetCategories } from 'services/category/types'

const CategoryManagement = () => {
  const [categories, setCategories] = useState<Array<IReturnGetCategories>>([])

  const fetchAllCategories = async () => {
    try {
      const res = await getAllCategoriesApi()
      setCategories(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleEditCategory = async (
    categoryId: string,
    updatedName: string
  ) => {
    try {
      if (updatedName === '') {
        toast.error('Please enter category name')
        return
      }
      const res = await updateCategoryApi({
        category_id: categoryId,
        name: updatedName,
      })
      await fetchAllCategories()
      toast('Updated!')
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      const res = await deleteCategoryApi(categoryId)
      setCategories(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchAllCategories()
  }, [])

  return (
    <AdminLayout title="User">
      <div>
        <h1 className="text-2xl">Category List</h1>
        <div className="container py-10 mx-auto md:px-6">
          <div className="text-right">
            <Link href="/admin/category/add">
              <button type="button" className="border px-5 my-5 bg-green-500">
                ADD
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
                              ID
                            </th>
                            <th
                              scope="col"
                              className="text-white rounded-tl-lg text-sm font-medium px-6 py-4"
                            >
                              NAME
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
                          {categories.map((category) => (
                            <tr className="border-b" key={category.category_id}>
                              <th
                                className="text-sm font-medium px-6 py-4 whitespace-nowrap text-left"
                                scope="row"
                              >
                                {category.category_id}
                              </th>
                              <th
                                className="text-sm font-medium px-6 py-4 whitespace-nowrap text-left"
                                scope="row"
                              >
                                <input
                                  defaultValue={category.name}
                                  onChange={(e) => {
                                    category.name = e.target.value
                                  }}
                                />
                              </th>
                              <td className="text-sm font-normal px-6 py-4 whitespace-nowrap text-right">
                                <button
                                  className="font-medium text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 transition duration-300 ease-in-out"
                                  onClick={() =>
                                    handleEditCategory(
                                      category.category_id,
                                      category.name
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
                                    handleDeleteCategory(category.category_id)
                                  }
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
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

export default CategoryManagement
