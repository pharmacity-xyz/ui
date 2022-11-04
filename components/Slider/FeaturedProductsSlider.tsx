import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import Link from 'next/link'

import products from '../../datas/product.json'

import 'react-multi-carousel/lib/styles.css'
import { IReturnProducts } from '../../services/product/types'
import { getFeaturedProducts } from '../../services/product/productServices'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
}

interface IProduct {
  id: string
  name: string
  category: number
  price: number
  detail: string
  image: string
  isFeatured: boolean
}

export const FeaturedProductsSlider = (props) => {
  const [featuredProducts, setFeaturedProducts] =
    useState<Array<IReturnProducts>>()
  const fetchFeaturedProducts = async () => {
    try {
      const res = await getFeaturedProducts()
      setFeaturedProducts(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  return (
    <>
      {featuredProducts && (
        <Carousel ssr responsive={responsive} className="text-center z-10">
          {featuredProducts.map((product) => (
            <Link
              href={{
                pathname: '/product/[id]',
                query: { id: product.productId },
              }}
              key={product.productId}
            >
              <div className="container m-1 cursor-pointer hover:scale-100 transform border">
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.productName}
                    className="w-80 h-72"
                  />
                )}
                <h2 className="text-lg">{product.productName}</h2>
                <p>$ {product.price}</p>
              </div>
            </Link>
          ))}
        </Carousel>
      )}
    </>
  )
}
