"use client"
import { useGetcart } from "@/features/cart/api/use-get-cart";
import Link from "next/link";
import React, { useState } from "react";



const CartPage: React.FC = () => {


  const  {data } = useGetcart();


  console.log(data)

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        
        <div className="space-y-4 ">
          {data&&data.map((item) =>
          {
           return <>
           <div className=" flex w-max bg-black p-2">
            <Link className="" href={`/editor/${item.design.id}/${item.design.json[0].id}`}>
            
            <img className="max-w-[400px]" src={item.design.json[0].imageUrl || '' } alt={ item.designId} />
            </Link>
            <p className="bg-slate-600">{item.quantity}</p>
            </div>
           </>
          }
        
        )
          
          }
          <div className="text-right">
          </div>
          <Link href="/cart/checkout" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Proceed to Checkout
          </Link>
        </div>
      
    </div>
  );
};

export default CartPage;
