"use client";
import Link from 'next/link';
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { useCreateOrder } from '@/features/order/use-create-order';
import { useGetcart } from "@/features/cart/api/use-get-cart";

export default function CreateOrder() {
  const { data } = useGetcart();
  const { productname } = useParams();
  const mutation = useCreateOrder();
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
    setFormData(prev => ({
      ...prev,
      productName: Array.isArray(productname) ? productname.join(", ") : productname,
    }));
  }, [productname]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // mutation.mutate({
    //   orderId: "",
    //   // Include the necessary fields
    // });

    console.log("Form Data:", formData);
  };
 console.log(data)
  return (
    <div>
      <h1 className="font-bold text-lg text-black mb-3">Create Order</h1>
      {data && data.map((item, key) => (
        <div key={item.id}>
          <h2>{item.productId}</h2>
          <p>{item.quantity}</p>
        </div>
      ))}
    </div>
  );
}
