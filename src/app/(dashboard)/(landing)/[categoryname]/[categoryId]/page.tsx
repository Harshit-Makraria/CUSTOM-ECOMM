import React from "react";
import db from "@/db/prisma";
import Link from "next/link";

import Sidebar from "./components/sidebar";

export default async function page({
  params,
  searchParams,
}: {
  params: { categoryId: string; categoryname: string };
  searchParams?: { size?: string; eyelets?: string };
}) {
  const { categoryId } = params;

  // Fetch all products in the category (without applying filters)
  const allProducts = await db.product.findMany({
    where: {
      categoryId: categoryId,
    },
  });

  // Extract all available sizes and eyelets from the full product dataset
  const availableSizes = Array.from(
    new Set(allProducts.flatMap((product) => product.size))
  ).filter(Boolean);

  const availableEyelets = Array.from(
    new Set(allProducts.flatMap((product) => product.eyelets))
  ).filter((eyelet): eyelet is string => eyelet !== null);

  // Apply the selected filters to get the displayed products
  const filters = {
    size: searchParams?.size ? [searchParams.size] : undefined,
    eyelets: searchParams?.eyelets,
  };

  const filteredProducts = await db.product.findMany({
    where: {
      categoryId: categoryId,
      ...(filters.size && { size: { hasEvery: filters.size } }),
      ...(filters.eyelets && { eyelets: { equals: filters.eyelets } }),
    },
    include: {
      design: {
        include: {
          json: true,
        },
      },
    },
  });

  const currentFilters = {
    size: filters.size?.[0],
    eyelets: filters.eyelets,
  };

  return (
    <>
      <div className="flex">
        <h1 className="text-3xl px-10 p-6 font-bold font-sans">
          Current Templates
        </h1>
      </div>
      <div className="flex">
        <div className="">
          <Sidebar
            catname={params.categoryname}
            currentFilters={currentFilters}
            categoryId={categoryId}
            availableSizes={availableSizes} // Derived from the full product dataset
            availableEyelets={availableEyelets} // Derived from the full product dataset
          />
        </div>
        <div className="grid grid-cols-3 px-8">
          {filteredProducts.map((el, key) => (
            <Link
              key={el.id || key}
              href={`/${params.categoryname}/${categoryId}/${el.id}`}
            >
              <div
                className="h-72 mx-4 my-2 rounded-[20px]"
              >
                <div className="px-6 pt-5">
                  <img
                    src={el.imageUrl!}
                    alt={el.designId ?? ""}
                    className="w-[30vw] h-[20vh] rounded-[10px]"
                  />
                  <p className="mt-5 mb-2 font-semibold">{el.size} cm</p>
                  <p>1 from ₹{el.price}.00</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
