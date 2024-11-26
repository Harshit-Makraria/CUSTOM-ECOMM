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

     <Link href={href}>
      create banner
     </Link>
      {category?.product.map((el) => {
        return (
          <div className="bg-black ">
            
            <img  src={el.design?.json[0].imageUrl??""} alt={el.design?.json[0].name??""} className="w-[80vw] h-[60vh] " />
            
            <div className="bg-white">
            <Link href={`/editor/${el.designId}/${el.design?.json[0].id}` }>edit on canva</Link>
            </div>
          </div>
        );
      })}
      
    </>
  );
}
