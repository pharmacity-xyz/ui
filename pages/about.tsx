import { NextPage } from 'next'
import Image from 'next/image'
import React from 'react'
import Layout from '../components/Layout'

import img1 from '../public/images/hero_bg_2.jpg'
import person1 from '../public/images/person_1.jpg'
import person2 from '../public/images/person_2.jpg'
import person3 from '../public/images/person_3.jpg'

const introductions = [
  {
    id: 1,
    title: 'Free Delivery',
    detail:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa laborum voluptates excepturi neque labore .',
    loadMore: '/free',
  },
  {
    id: 2,
    title: 'New Medicine Everyday',
    detail:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa laborum voluptates excepturi neque labore .',
    loadMore: '/new-medicine-everyday',
  },
  {
    id: 3,
    title: 'Medicines Guaranteed',
    detail:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa laborum voluptates excepturi neque labore .',
    loadMore: '/medicines-guranteed',
  },
]

const introductions1 = [
  {
    id: 1,
    title: 'Why Us',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae nisi magni in fugit, ad laudantium.',
  },

  {
    id: 2,
    title: 'History',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae nisi magni in fugit, ad laudantium.',
  },
  {
    id: 3,
    title: 'Awards',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae nisi magni in fugit, ad laudantium.',
  },
]

const teams = [
  {
    id: 1,
    image: person1,
    name: 'Elizabeth Graham',
  },
  {
    id: 2,
    image: person2,
    name: 'Patrick Marx',
  },
  {
    id: 3,
    image: person3,
    name: 'Mike Coolbert',
  },
]

const About: NextPage = () => {
  return (
    <Layout title="About">
      <div className="w-full h-1/4">
        <Image src={img1} alt="" width={500} height={200} layout="responsive" />
      </div>
      <div className="p-5">
        <div className="">
          <div className="flex justify-around gap-3">
            {introductions.map((introduction) => (
              <div
                key={introduction.id}
                className="w-4/5 text-center border rounded-md p-3"
              >
                <span className=""></span>
                <h3 className="text-[#75b239] font-medium text-xl">
                  {introduction.title}
                </h3>
                <p>{introduction.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="py-5">
        <div className="container  px-4">
          <div className="grid grid-cols-3 gap-3">
            {introductions1.map((introduction) => (
              <div key={introduction.id} className="w-full px-10 py-5">
                <span className=""></span>
                <h3 className="text-black font-sm text-2xl mb-2">
                  {introduction.title}
                </h3>
                <p>{introduction.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="text-center my-10">
          <h2 className="text-3xl underline">Team</h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {teams.map((person) => (
            <div key={person.id} className="w-full px-10 py-5 text-center">
              <span className=""></span>
              <Image src={person.image} alt="" width={200} height={200} />
              <h3 className="text-black font-sm text-lg mb-2">{person.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default About
