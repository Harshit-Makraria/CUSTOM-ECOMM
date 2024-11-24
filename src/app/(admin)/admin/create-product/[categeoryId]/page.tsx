import React from "react";
import db from "@/db/prisma";
import Link from "next/link";

export default async function page({
  params,
}: {
  params: { categoryId: string };
}) {
  const { categoryId } = params;

  const product = await db.product.findMany({ where: { name: categoryId } });

  const href = `/admin/create-product/form/${product[0].name}/?categoryId=${categoryId}`;

  return (
    <>
      {product.map((el) => {
        return (
          <>
            <div>{el.categoryId}</div>
          </>
        );
      })}
    </>
  );
}
