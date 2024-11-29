import React from 'react'
import Link from 'next/link';
import db from '@/db/prisma';
export default async function page() {
    

      const categorys = await db.category.findMany();
       

   
   
    const items = [
        { id: 1, img: "/bg.jpg", text: "Banner", link: "/admin/create-product/banner" },
        { id: 2, img: "/bg.jpg", text: "Flex", link: "/admin/create-product/flex" },
        { id: 3, img: "/bg.jpg", text: "Standee", link: "/admin/create-product/standee" },

      ];

  return (
    <div>
        <h1 className="text-3xl font-semibold">Create Product</h1>
     
        <div className="flex flex-wrap gap-10 justify-center">
        {categorys.map((item) => (
        <Link key={item.id} href={`/admin/create-product/${item.id} `} className="w-80 h-72 bg-gray-200 rounded-lg shadow-lg flex flex-col items-center mt-10">
          <img
            src={'/bg.jpg'}
            alt={item.name}
            className="w-full h-[80%] object-cover rounded-t-lg"
          />

          <p className="w-full text-center text-lg font-semibold text-gray-800 p-4">
            {item.name}
          </p>
        </Link>
      ))}
    </div>
     </div>
  )
}
