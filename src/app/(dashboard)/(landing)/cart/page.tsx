"use client"
import { useGetcart } from "@/features/cart/api/use-get-cart";
import Link from "next/link";
import React, { useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartPage: React.FC = () => {


  const  {data } = useGetcart();


  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Product A",
      price: 20,
      quantity: 2,
      image: "/product-a.jpg",
    },
    {
      id: "2",
      name: "Product B",
      price: 15,
      quantity: 1,
      image: "/product-b.jpg",
    },
  ]);

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  console.log(data)

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-4 ">
          {data&&data.map((item) =>
          {
           return <>
           <div className="grid grid-cols-3 p-2">
            <Link className="" href={`/editor/${item.design.id}/${item.design.json[0].id}`}>
            
            <img src={item.design.json[0].imageUrl || '' } alt={ item.designId} />
            </Link>
            </div>
           </>
          }
        
        )
          
          }
          <div className="text-right">
            <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
          </div>
          <Link href="/cart/checkout" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
