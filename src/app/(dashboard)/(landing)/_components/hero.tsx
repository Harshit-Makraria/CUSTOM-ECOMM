import React from 'react'
import Link from 'next/link';
import db from '@/db/prisma';
import ImageSlider from './_slider';
import ImageSlide from './slide';
import PromotionalCards from './PromotionalCards';
export default async function hero() {

  
  const categorys = await db.category.findMany();
    

  return (
    <div>
      <ImageSlider />
      <PromotionalCards/>
        {/* <h1 className="text-3xl font-semibold text-center mt-5">Top Product</h1>
     
        <div className="flex flex-wrap gap-10 justify-center">
        {categorys.map((item)  => (
          
        <Link key={item.id} href={`/${item.name}/${item.id}`} className="w-80 h-72 bg-gray-200 rounded-lg shadow-lg flex flex-col items-center mt-10">
          <img
            src={`/Banner.jpeg`}
            className="w-full h-[80%] object-cover rounded-t-lg"
          />
          <p className="w-full text-center text-lg font-semibold text-gray-800 p-4">
            {item.name}
          </p>
        </Link>
      ))}
    </div> */}
     </div>
  )
}
