import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { BsInfoCircle } from 'react-icons/bs'

import scheduleVaccineImg from '../public/images/schedule_vaccine.png'
import fluShotsAreHereImg from '../public/images/flu_shots_are_here.png'
import doctorImg from '../public/images/doctor.png'
import productList from '../datas/productList.json'
import { HomeSlider, FeaturedProductsSlider } from '../components/Slider'
import Layout from '../components/Layout'
import { useEffect, useState } from 'react'

const covid19Rows = [
  {
    id: 1,
    img: scheduleVaccineImg,
    name: 'Medicine',
  },
  {
    id: 2,
    img: fluShotsAreHereImg,
    name: 'Vaccination',
  },
  {
    id: 3,
    img: doctorImg,
    name: 'Doctor',
  },
]

const Home: NextPage = () => {
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    setUserId(localStorage.getItem('userId'))
  }, [])

  return (
    <Layout title="Home">
      <div className="">
        <HomeSlider />
        <div className="flex px-20 py-8">
          <BsInfoCircle className="text-2xl mr-2" />
          <p className="text-lg">
            Get vaccinated. Vaccines are widely available. COVID-19 affects
            different people in different ways. Infected people have had a wide
            range of symptoms reported – from mild symptoms to severe illness.
          </p>
        </div>
        <div className="flex items-center bg-[#F5f5f0] py-2 px-10">
          <h1 className="text-4xl w-1/3">COVID-19</h1>
          <div className="flex justify-around w-2/3">
            {covid19Rows.map((row) => (
              <div key={row.id} className="text-center">
                <Image src={row.img} alt="" width="100" height="100" />
                <h5>{row.name}</h5>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="">
        <div className="my-10">
          <div className="flex justify-between items-center px-8">
            <h2 className="text-3xl">
              <strong className="text-[#75b239]">Product List</strong>
            </h2>
          </div>
          <div className="px-8 pt-6">
            <hr />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 justify-items-center">
          {productList.map((product) => (
            <div key={product.id} className="grid border p-16">
              <Image src={product.img} alt="" width="200" height="200" />
              <Link href={product.link}>
                <a className="text-center py-4 hover:underline">
                  {product.name}
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10">
        <div className="my-5">
          <div className="flex justify-between items-center px-8">
            <h2 className="text-3xl">
              <strong className="text-[#75b239]">Featured Products</strong>
            </h2>
          </div>
          <div className="px-8 py-6">
            <hr />
          </div>
        </div>
        <FeaturedProductsSlider />
      </div>
      {userId === null && (
        <div className="bg-green-500 text-white text-center py-4 mt-5">
          <h1 className="w-full text-3xl">
            Sign up for discount up to 50 % OFF
          </h1>
          <p className="w-full py-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
            laborum voluptates excepturi neque labore
          </p>
          <Link href="/register">
            <button className="border border-white px-5 py-1 rounded-md">
              SIGN UP
            </button>
          </Link>
        </div>
      )}
    </Layout>
  )
}

export default Home
