"use client";
import Link from "next/link";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useSearchParams, useParams, useRouter, redirect } from "next/navigation";
import { useCreateOrder } from "@/features/order/use-create-order";
import { useGetcart } from "@/features/cart/api/use-get-cart";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CreateOrder() {
  const { data } = useGetcart();
  const { productname } = useParams();
  const { mutate } = useCreateOrder();
  const params = useSearchParams();
  const error = params.get("error");
  const router = useRouter();
  const [formData, setFormData] = useState({
    orderId: "",
    productId: "",
    productName: "",
    quantity: "",
    unitPrice: "",
    totalPrice: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      productName: Array.isArray(productname)
        ? productname.join(", ")
        : productname,
    }));
  }, [productname]);

   function placeOrder() {
    if(data && data.length != 0) {

      mutate({
        cartIds:data.map(cart=>cart.id),
  
      } , 
    {
      onSuccess : ()=>{
        toast.success("Order placed")
       router.push('/orders')
      }
    });
    }

   
  }

  console.log(data);
  return (
    <div className="">
      <h1 className="font-bold text-lg text-black mb-3">Create Order</h1>
      <div className="flex flex-col items-start justify-start">

      {data &&
        data.map((item, key) => (
          <div className="border shadow-sm rounded-md" key={item.id}>
            <Image src={item.design.json[0].imageUrl!} alt="sdfs" width={400} height={400} />
            <p>{item.userId}</p>
          </div>
        ))}
      </div>

      <Button variant={"default"} className="bg-blue-500" onClick={placeOrder}> Place order </Button>
    </div>
  );
}
