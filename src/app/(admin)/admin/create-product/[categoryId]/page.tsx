import React from "react";
import db from "@/db/prisma";
import Link from "next/link";

export default async function page({
  params,
}: {
  params: { categoryId: string };
}) {
  const { categoryId } = params;
   


  const category = await db.category.findUnique({
    where:{
      id:categoryId
    } ,

    include :{
      product:{
        include:{design:{
          include:{
            json :true
          }
        }}
      }
    }
  })



  const href = `/admin/create-product/form/${category?.name}/?categoryId=${categoryId}`;
 
  return (
    <>
    <div className="flex  ">
      <h1 className="text-3xl font-bold font-sans">Current Templates</h1>
       <button
      className="flex  items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900 focus:ring-2 focus:ring-gray-400 focus:outline-none ml-[60%] mb-10"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
     <Link href={href}>
      create {category?.name}
     </Link>
     </button>
     </div>
     <div className="grid grid-cols-3  px-2"> 
      {category?.product.map((el,key) => {
        return (
          <div  key={el.designId || key} className=" mx-2 my-2 border border-gray-200 rounded-[20px]">
          <div className="  p-4  ">
            
            <img  src={el.imageUrl!} alt={el.design?.json[0].name??""} className="w-[30vw] h-[20vh] rounded-2xl" />
            
            
          </div>
          <div className="text-center hover:bg-orange-200 border hover:border-black border-gray-100  rounded-xl py-1 transition-all duration-1000 cursor-pointer ">
          <Link href={`/editor/${el.designId}/${el.design?.json[0].id}` }>Edit Designs</Link>
          </div>
          </div>
        );
      })}
    </div>
      
    </>
  );
}
