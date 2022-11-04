import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Layout from '../components/Layout'
import { getAllCategoriesApi } from '../services/category/categoryServices'
import { IReturnGetCategories } from '../services/category/types'
import { IReturnProducts } from '../services/product/types'
import {
  getAllProductsApi,
  getProductsByCategoryApi,
  searchProductsApi,
} from '../services/product/productServices'
import Spinner from '../components/Spinner'
import ShopLayout from '../components/Layout/ShopLayout'

const Shop = () => {
  const [categories, setCategories] = useState<Array<IReturnGetCategories>>([])
  const [products, setProducts] = useState<Array<IReturnProducts>>([])
  const [searchWord, setSearchWord] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchAllCategories = async () => {
    try {
      setLoading(true)
      const res = await getAllCategoriesApi()
      setCategories(res.data)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchAllProducts = async () => {
    try {
      const res = await getAllProductsApi()
      setProducts(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const searchProducts = async () => {
    try {
      setLoading(true)
      if (searchWord === '') {
        fetchAllProducts()
      } else {
        const res = await searchProductsApi(searchWord)
        setProducts(res.data.products)
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const searchProductsByCategory = async (categoryId: string) => {
    try {
      setLoading(true)
      const res = await getProductsByCategoryApi(categoryId)
      console.log(res)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const sortByFeatured = () => {
    const featuredProducts: Array<IReturnProducts> = []
    products.map((product) => {
      if (product.featured) {
        featuredProducts.push(product)
      }
    })
    setProducts(featuredProducts)
  }

  useEffect(() => {
    fetchAllProducts()
    fetchAllCategories()
  }, [])

  return (
    <>
      <Layout title="Shop">
        <div className="">
          <section className="bg-white">
            <ShopLayout
              categories={categories}
              setSearchWord={setSearchWord}
              searchProducts={searchProducts}
              searchProductsByCategory={searchProductsByCategory}
            >
              {loading ? (
                <div className="w-full h-44 flex justify-center items-center">
                  <Spinner />
                </div>
              ) : (
                <>
                  {products.length > 0 ? (
                    <>
                      {products.map((product) => (
                        <div
                          key={product.productId}
                          className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col cursor-pointer"
                        >
                          <Link
                            href={{
                              pathname: '/product/[id]',
                              query: { id: product.productId },
                            }}
                          >
                            <>
                              {product.imageUrl && (
                                <Image
                                  src={product.imageUrl}
                                  alt={product.productName}
                                  width={300}
                                  height={300}
                                  className="hover:grow hover:shadow-lg"
                                />
                              )}
                              <div className="pt-3 flex items-center justify-between">
                                <p className="">{product.productName}</p>
                                <svg
                                  className="h-6 w-6 fill-current text-gray-500 hover:text-black"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
                                </svg>
                              </div>
                              <p className="pt-1 text-gray-900">
                                ${product.price}
                              </p>
                            </>
                          </Link>
                        </div>
                      ))}
                    </>
                  ) : (
                    <h1>Can not find...</h1>
                  )}
                </>
              )}
            </ShopLayout>
          </section>
        </div>
      </Layout>
    </>
  )
}

export default Shop
