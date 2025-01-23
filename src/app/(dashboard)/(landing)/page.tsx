import React from 'react'
import Navbar from './_components/navbar'
import SwiperSlider from './_components/s2'
import RectSlider from './_components/slider'
import Hero from './_components/hero'
import db from '@/db/prisma'
const page = async () => {

  const Product = await db.product.findMany({})
  console.log(Product)
  return (
    <div>
      <Hero/>
      {/* <SwiperSlider/> */}
      {/* <RectSlider categories={categories}/> */}
      <RectSlider categories={Product} nm={"banner"}/>
      <RectSlider categories={Product} nm={"standee"}/>

    </div>
  )
}

export default page
