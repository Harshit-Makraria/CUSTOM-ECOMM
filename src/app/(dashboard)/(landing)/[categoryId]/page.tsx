import React from "react";
import db from "@/db/prisma";
import Link from "next/link";

export default async function page({
  params,
}: {
  params: { categoryId: string };
}) {
  const { categoryId } = params;
   

    console.log(params);
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



  const href = `/${category?.name}/?categoryId=${categoryId}`;
 
  return (
    <>
    <div className="flex p-6   ">
      <h1 className="text-[40px] font-bold font-sans px-20">Current Templates</h1>
       {/* <button
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
      create banner
     </Link>
     </button> */}
     </div>
     <div className="grid grid-cols-4  px-20"> 
      {category?.product.map((el) => {
        return (
          <div className="bg-orange-50 mx-4 my-2 border border-gray-300 rounded-[20px]">
          <div className="  p-10  ">
            
            <img  src={el.imageUrl!} alt={el.design?.json[0].name??""} className="w-[30vw] h-[20vh]" />
            
            
          </div>
          {/* <div className="text-center hover:bg-orange-200 border hover:border-black border-gray-300  rounded-xl py-1 transition-all duration-1000 cursor-pointer bg-orange-50 ">
          <Link href={`/editor/${el.designId}/${el.design?.json[0].id}` }>Edit Designs</Link>
          </div> */}
          </div>
        );
      })}
    </div>
      
    </>
  );
}
