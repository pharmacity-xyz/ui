import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import Link from 'next/link'

import 'react-multi-carousel/lib/styles.css'
import { IReturnProducts } from 'services/product/types'
import { getFeaturedProducts } from 'services/product/productServices'

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

export const FeaturedProductsSlider = (props) => {
  const [featuredProducts, setFeaturedProducts] =
    useState<Array<IReturnProducts>>()
  const fetchFeaturedProducts = async () => {
    try {
      const res = await getFeaturedProducts()
      console.log(res.data)
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
        <Carousel ssr responsive={responsive} className="text-center z-10 px-8">
          {featuredProducts.map((product) => (
            <Link
              href={{
                pathname: '/product/[id]',
                query: { id: product.product_id },
              }}
              key={product.product_id}
            >
              <div className="cursor-pointer hover:scale-100 transform border p-2 mx-2">
                {product.image_url && (
                  <Image
                    src={product.image_url}
                    alt={product.product_name}
                    className=""
                    width={200}
                    height={200}
                  />
                )}
                <h2 className="text-ellipsis whitespace-nowrap overflow-hidden">
                  {product.product_name}
                </h2>
                <p>$ {product.price}</p>
              </div>
            </Link>
          ))}
        </Carousel>
      )}
    </>
  )
}
