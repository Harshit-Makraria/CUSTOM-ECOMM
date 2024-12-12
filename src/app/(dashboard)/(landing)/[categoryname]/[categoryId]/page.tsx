import React from "react";
import db from "@/db/prisma";
import Link from "next/link";
import qs from "query-string";
import Sidebar from "./components/sidebar";
export default async function page({
  params,
  searchparams,
}: // searchparams,
{
  params: { categoryId: string };
  searchparams?: { size?: string,eyelets?:string, };
}) {
  const { categoryId } = params;
  // const { size,eyelets } = searchparams;
  const filters = {
    size: searchparams?.size ? [searchparams.size] : undefined,
    eyelets: searchparams?.eyelets,
  };
  const products = await db.product.findMany({
    where: {
      categoryId: categoryId
    }
  });
  const category = await db.category.findUnique({
    where: {
      id: categoryId,
    },

    include: {
      product: {
        where: {
          ...(filters.size && { size: { hasEvery: filters.size } }),
          ...(filters.eyelets && { eyelets: { equals: filters.eyelets } }),
          // size: { equals: [size] },
          // eyelets: { equals: eyelets },
        },
        include: {
          design: {
            include: {
              json: true,
            },
          },
        },
      },
    },
  });

  const availableSizes = Array.from(
    new Set(category?.product.flatMap((product) => product.size))
  ).filter(Boolean); 

  const availableEyelets = Array.from(
    new Set(category?.product.flatMap((product) => product.eyelets))
  ).filter((eyelet): eyelet is string => eyelet !== null);

  const currentFilters = {
    size: filters.size?.[0], 
    eyelets: filters.eyelets,
  };


  const href = `/${category?.name}/${categoryId}`;
  const nm = category?.name;
  const cid = category?.id;
  const isFilterActive = filters.size || filters.eyelets;

return (
  <>
    <div className="flex">
      <h1 className="text-3xl px-10 p-6 font-bold font-sans">Current Templates</h1>
    </div>
    <div className="flex">
      <div className="m-5">
        <Sidebar
          catname={category?.name!}
          currentFilters={currentFilters}
          categoryId={categoryId}
          availableSizes={availableSizes}
          availableEyelets={availableEyelets}
        />
      </div>
      <div className="grid grid-cols-3 px-8">
        {isFilterActive ? (
          products.filter((el) => {
              const matchesSize = filters.size ? el.size === filters.size : true;
              // const matchesEyelets = filters.eyelets ? el.eyelets === filters.eyelets : true;
              
              console.log("matchesSize", matchesSize);
              return matchesSize;
              
            })
            .map((el, key) => (
              <Link
                key={el.id || key}
                href={`/${category?.name}/${categoryId}/${el.id}`}
              >
                <div className="bg-orange-50 mx-4 my-2 border border-gray-300 rounded-[20px]">
                  <div className="p-10">
                    <img
                      src={el.imageUrl!}
                      alt={el.designId ?? ""}
                      className="w-[30vw] h-[20vh]"
                    />
                  </div>
                </div>
              </Link>
            ))
        ) : (
          category?.product.map((el, key) => (
            <Link
              key={el.id || key}
              href={`/${category?.name}/${categoryId}/${el.id}`}
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
        )}
      </div>
    </div>
  </> );
}
