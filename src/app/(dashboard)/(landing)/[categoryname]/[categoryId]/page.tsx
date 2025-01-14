import React from "react";
import db from "@/db/prisma";
import Link from "next/link";
 
import Sidebar from "./components/sidebar";
export default async function page({
  params,
  searchParams,
}: // searchparams,
{
  params: { categoryId: string , categoryname:string };
  searchParams?: { size?: string,eyelets?:string, };
}) {
  const { categoryId } = params;
   
  const filters = {
    size: searchParams?.size ? [searchParams.size] : undefined,
    eyelets: searchParams?.eyelets,
  };
  
  
 
  const product = await db.product.findMany({
    where: {

      
      categoryId: categoryId,
        ...(filters.size && { size: { hasEvery: filters.size } }),
        ...(filters.eyelets && { eyelets: { equals: filters.eyelets} }),
        // size: { equals: [size] },
         
       
    },
 
        include: {
          design: {
            include: {
              json: true,
            },
          },
        },
      
     
  });

   

  const availableSizes = Array.from(
    new Set( product.flatMap((product) => product.size))
  ).filter(Boolean); 

  const availableEyelets = Array.from(
    new Set( product.flatMap((product) => product.eyelets))
  ).filter((eyelet): eyelet is string => eyelet !== null);

  const currentFilters = {
    size: filters.size?.[0], 
    eyelets: filters.eyelets,
  };

 
 
  const isFilterActive = filters.size || filters.eyelets;

return (
  <>
    <div className="flex">
      <h1 className="text-3xl px-10 p-6 font-bold font-sans">Current Templates</h1>
    </div>
    <div className="flex">
      <div className="m-5">
        <Sidebar
          catname={params.categoryname}
          currentFilters={currentFilters}
          categoryId={categoryId}
          availableSizes={availableSizes}
          availableEyelets={availableEyelets}
        />
      </div>
      <div className="grid grid-cols-3 px-8">
      
          
        {  product.map((el, key) => (
            <Link
              key={el.id || key}
              href={`/${params.categoryname}/${categoryId}/${el.id}`}
            >
              <div className="bg-orange-50 mx-4 my-2 border border-gray-300
              rounded-[20px]">
                <div className="p-10">
                  <img
                    src={el.imageUrl!}
                    alt={el.designId ?? ""}
                    className="w-[30vw] h-[20vh]"
                  />
                </div>
                \
                </div>
            </Link>
          ))
        }
      </div>
    </div>
  </> );
}
