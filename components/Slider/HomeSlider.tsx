import Image from 'next/image'
import React from 'react'
import Carousel from 'react-multi-carousel'

import homeSlider from '../../datas/homeSlider.json'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
}

export const HomeSlider = () => {
  return (
    <>
      <Carousel
        swipeable={false}
        autoPlay
        infinite
        arrows={false}
        ssr
        responsive={responsive}
        className="text-center z-10"
      >
        {homeSlider.map((product, index) => (
          <div className="w-full" key={index}>
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                width={100}
                height={35}
                layout="responsive"
              />
            )}
          </div>
        ))}
      </Carousel>
    </>
  )
}
