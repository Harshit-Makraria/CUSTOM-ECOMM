// "use client"
// import { useGetcart } from "@/features/cart/api/use-get-cart";
// import Link from "next/link";
// import React, { useState } from "react";



// const CartPage: React.FC = () => {


  // const  {data } = useGetcart();


//   console.log(data)

//   return (
    
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        
//         <div className="space-y-4 ">
//           {data&&data.map((item) =>
//           {
//            return <>
//            <div className=" flex w-max bg-black p-2">
//             <Link className="" href={`/editor/${item.design.id}/${item.design.json[0].id}`}>
            
//             <img className="max-w-[400px]" src={item.design.json[0].imageUrl || '' } alt={ item.designId} />
//             </Link>
//             <p className="bg-slate-600">{item.quantity}</p>
//             </div>
//            </>
//           }
        
//         )
          
//           }
//           <div className="text-right">
//           </div>
          // <Link href="/cart/checkout" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          //   Proceed to Checkout
          // </Link>
//         </div>
      
//     </div>
//   );
// };

// export default CartPage;

"use client"
import { useGetcart } from "@/features/cart/api/use-get-cart";
import Link from "next/link";
import React, { useState } from "react";


const CartPage: React.FC = () => {

  const  {data } = useGetcart();
 console.log(data)
 const totalAmount = data?.reduce((total, item) => {
  const itemTotal =
    parseInt(item.unitPrice?.toString() || "0") *
    parseInt(item.quantity?.toString() || "0");
  return total + itemTotal;
}, 0);
  return (
    <div>
      <div>
      <h1 className="text-4xl font-semibold m-4 ml-8 mb-2">My Cart</h1></div>
        
    <div className="flex flex-col lg:flex-row justify-between gap-8 p-6 ">
      {/* Left Section - Cart Items */}
      
      <div className="w-full lg:w-2/3 border border-gray-200 rounded-lg p-6 ring-gray-300 ring-1">
      
        {/* <h2 className="text-2xl font-bold mb-4">My Cart <span className="text-blue-500">(1)</span></h2> */}
        {data&&data.map((item) =>
           { 
             return <>
        <div className="flex gap-4  border-b border-gray-200 pb-4">
          {/* Image Section */}
          <div className="w-48 h-48 rounded-lg  flex  justify-center">
            <img
              src={item.design.json[0].imageUrl || '' }
              alt="Your product pic"
              className="rounded-lg object-cover"
            />
          </div>
          {/* Details Section */}
          <div className="flex-1 ml-5 ">
            <div className="flex justify-between items-start">
              <h3 className="text-3xl font-semibold">{item.productName || "null"}</h3>
              <Link href={`/editor/${item.design.id}/${item.design.json[0].id}`} className="text-sm text-red-500">Edit Design</Link>
            </div>
            <p className="text-gray-500 mt-1">Quantity:{item.quantity}</p>
            <a
              href="#"
              className="text-sm font-semibold text-gray-700 mt-2 inline-block"
            >
              Edit quantity 
            </a>
            <p></p>
          </div>
        </div>
        <div className="text-xl text-right border-b flex justify-between  font-semibold py-5 mb-5 ">
          <p>Item Total:</p>
          <p>₹{ parseInt(item.unitPrice?.toString() || '0') * parseInt(item.quantity?.toString() || '0')}</p>
        </div>
      
      </>
           }
        
        )}
        </div>

      {/* Right Section - Order Summary */}
      <div className="w-full lg:w-1/3 border h-60 border-gray-300 ring-1 ring-gray-300 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-500">Subtotal</p>
          <p className="font-semibold">₹{totalAmount}.00</p>
        </div>
        <a
          href="#"
          className="text-sm text-blue-500 hover:underline mb-4 block"
        >
          Have a code?
        </a>
        <button className="w-full bg-blue-400 text-white py-3 rounded-lg font-semibold hover:bg-blue-500 transition">
         <Link href={"/cart/checkout"}> Checkout</Link>
        </button>
      </div>
    </div>
    
    </div>
    
  );
};

export default CartPage;
