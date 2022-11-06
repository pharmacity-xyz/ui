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
      setProducts(res.data)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSelectSort = (option) => {
    switch (option.id) {
      case 1: {
        sortByFeatured()
        break
      }
      case 2: {
        sortByLowToHigh()
        break
      }
      case 3: {
        sortByHighToLow()
        break
      }
      default:
        fetchAllProducts()
        break
    }
  }

  const sortByFeatured = () => {
    let featuredProducts: Array<IReturnProducts> = []
    products.map((product) => {
      if (product.featured) {
        featuredProducts.push(product)
      }
    })
    setProducts(featuredProducts)
  }

  const sortByLowToHigh = async () => {
    setLoading(true)
    const res = await getAllProductsApi()
    let sortedProducts: Array<IReturnProducts> = res.data.sort(
      (a, b) => a.price - b.price
    )
    setProducts(sortedProducts)
    setLoading(false)
  }

  const sortByHighToLow = async () => {
    const res = await getAllProductsApi()
    let sortedProducts: Array<IReturnProducts> = res.data.sort(
      (a, b) => b.price - a.price
    )
    setProducts(sortedProducts)
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
              handleSelectSort={handleSelectSort}
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
                        <Link
                          href={{
                            pathname: '/product/[id]',
                            query: { id: product.productId },
                          }}
                          key={product.productId}
                        >
                          <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col cursor-pointer">
                            <>
                              {product.imageUrl && (
                                <Image
                                  src={product.imageUrl}
                                  alt={product.productName}
                                  width={300}
                                  height={300}
                                />
                              )}
                              <div className="pt-3 flex items-center justify-between">
                                <p className="w-full text-ellipsis whitespace-nowrap overflow-hidden">
                                  {product.productName}
                                </p>
                              </div>
                              <p className="pt-1 text-gray-900">
                                $ {product.price}
                              </p>
                            </>
                          </div>
                        </Link>
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
