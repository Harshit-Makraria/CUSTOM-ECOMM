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
        include:{
          design:{
          include:{
            json :true
          }
        }}
      }
    }
  })



  const href = `/${category?.name}/${categoryId}`;
 
  return (
    <>
    <div className="flex  ">
      <h1 className="text-3xl px-10 p-6 font-bold font-sans">Current Templates</h1>
       
     </div>
     <div className="grid grid-cols-3  px-8"> 
      {category?.product.map((el,key) => {
        
        return (
            <Link key={el.designId || key} href={`/${category?.name}/${categoryId}/${el.id}`}>

          <div className="bg-orange-50 mx-4 my-2 border border-gray-300 rounded-[20px]">
          <div className="  p-10  ">
            
            <img  src={el.imageUrl!} alt={el.design?.json[0].name??""} className="w-[30vw] h-[20vh]" />
            
            
          </div>
          </div>
          </Link>
        );
      })}
    </div>
      
    </>
  );
}
