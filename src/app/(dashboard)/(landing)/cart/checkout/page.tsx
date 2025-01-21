// "use client";
// import Link from "next/link";
// import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
// import { useSearchParams, useParams, useRouter, redirect } from "next/navigation";
// import { useCreateOrder } from "@/features/order/use-create-order";
// import { useGetcart } from "@/features/cart/api/use-get-cart";
// import { toast } from "sonner";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";

// export default function CreateOrder() {
  // const { data } = useGetcart();
  // const { productname } = useParams();
  // const { mutate } = useCreateOrder();
  // const params = useSearchParams();
  // const error = params.get("error");
  // const router = useRouter();
  // // const totalAmount = data?.reduce((total, item) => {
  // //   const itemTotal =
  // //     parseInt(item.unitPrice?.toString() || "0") *
  // //     parseInt(item.quantity?.toString() || "0");
  // //   return total + itemTotal;
  // // });
  // const [formData, setFormData] = useState({
  //   orderId: "",
  //   productId: "",
  //   productName: "",
  //   quantity: "",
  //   unitPrice: "",
  //   totalPrice: "",
    
  // });

  // useEffect(() => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     productName: Array.isArray(productname)
  //       ? productname.join(", ")
  //       : productname,
  //   }));
  // }, [productname]);

  //  function placeOrder() {
  //   if(data && data.length != 0) {

  //     mutate({
  //       cartIds:data.map(cart=>cart.id),
        
  //     } , 
  //   {
  //     onSuccess : ()=>{
  //       toast.success("Order placed")
  //      router.push('/orders')
  //     }
  //   });
  //   }

   
  // }

  // console.log(data);
//   return (
//     <div className="p-5">
//       <h1 className="font-bold text-2xl text-black mb-5 ">Create Order</h1>
//       <div className="flex flex-col items-start justify-start">

//       {data &&
//         data.map((item, key) => (
//           <div className="border shadow-sm rounded-md bg-black  p-1" key={item.id}>
//             <Image src={item.design.json[0].imageUrl!} alt="sdfs" width={400} height={400} />
//             <p>{item.isConsent}</p>
//           </div>
//         ))}
//       </div>

//       <Button variant={"default"} className="bg-blue-500 mt-10" onClick={placeOrder}> Place order </Button>
//     </div>
//   );
// }



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
  const totalAmount = data?.reduce((total, item) => {
    const itemTotal =
      parseInt(item.unitPrice?.toString() || "0") *
      parseInt(item.quantity?.toString() || "0");
    return total + itemTotal;
  }, 0);

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
  const [isAddressSaved, setIsAddressSaved] = useState(false); 
  
  function handleSaveAddress() {
    setIsAddressSaved(prevState => !prevState); // Toggle the state value
  }
  console.log(data);
  return (
    <div className=" flex flex-col items-center w-full bg-white">
      <div className=" w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-semibold mb-8">Shipping</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Delivery Address Form */}
          {!isAddressSaved ? (
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name*"
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
                <input
                  type="text"
                  placeholder="Last Name*"
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>
              <input
                type="text"
                placeholder="Company (required for business addresses)"
                className="w-full border border-gray-300 rounded-lg p-3"
              />
              <input
                type="text"
                placeholder="Phone*"
                className="w-full border border-gray-300 rounded-lg p-3"
              />
              <select
                className="w-full border border-gray-300 rounded-lg p-3"
                defaultValue="India"
              >
                <option>India</option>
              </select>
              <input
                type="text"
                placeholder="Address*"
                className="w-full border border-gray-300 rounded-lg p-3"
              />
              <input
                type="text"
                placeholder="Apartment, suite, unit, or floor (Optional)"
                className="w-full border border-gray-300 rounded-lg p-3"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="City/town*"
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
                <select
                  className="w-full border border-gray-300 rounded-lg p-3"
                  defaultValue="Andaman and Nicobar Islands"
                >
                  <option>Andaman and Nicobar Islands</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Pincode*"
                className="w-full border border-gray-300 rounded-lg p-3"
              />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="defaultShipping"
                    className="w-4 h-4"
                  />
                  <label htmlFor="defaultShipping" className="text-gray-700">
                    Set as default shipping address
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="defaultBilling"
                    className="w-4 h-4"
                  />
                  <label htmlFor="defaultBilling" className="text-gray-700">
                    Set as default billing address
                  </label>
                </div>
              </div>
              <button
                type="submit"
                onClick={handleSaveAddress}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                Save Delivery Address →
              </button>
            </form>
          </div>):(
          // New Component to render after address is saved
          <div className="border border-gray-200 rounded-lg p-6 ">
            <button onClick={handleSaveAddress} className="flex items-end w-full ml-[38vw] mt-[-3vh] text-3xl font-semibold font-sans cursor-pointer hover:text-gray-400 transition-colors">&larr;</button>
            <h2 className="text-xl font-semibold mb-4">New Component Content</h2>
            {/* Add the content for the new component here */}
            <p>Your address has been saved successfully!</p>
            <Button onClick={placeOrder} className="mt-[45vh] ml-[30vw]">Proceed to Order</Button>
          </div>
        )}

          {/* Order Summary */}
          
      
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              GST Identification Number
            </h2>
            <div className="flex items-center gap-4 mb-6">
              <input
                type="text"
                placeholder="Enter your GSTIN"
                className="flex-1 border border-gray-300 rounded-lg p-3"
              />
              <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200">
                Apply
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              For business use only. Company name and state listed in GST
              registration must match billing address.{" "}
              <a href="#" className="text-blue-500 underline">
                About GST
              </a>
            </p>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {/* <div className="flex justify-between mb-4">
              <p className="text-gray-500">Subtotal</p>
              <p className="font-semibold">₹3,228.57</p>
            </div>
            <div className="flex justify-between mb-4">
              <p className="text-gray-500">Shipping (estimated)</p>
              <p className="font-semibold">--</p>
            </div>
            <div className="flex justify-between mb-4">
              <p className="text-gray-500">IGST</p>
              <p className="font-semibold">₹161.43</p>
            </div> */}
            <div className="flex justify-between border-t border-gray-200 pt-4">
              <p className="text-lg font-semibold">Total due</p>
              <p className="text-lg font-semibold">₹{totalAmount}.00</p>
            </div>
            <a href="#" className="text-blue-500 underline text-sm mt-4 block">
              Have a code?
            </a>
          
            <h3 className="text-xl border-t border-gray-200 pt-1 font-semibold mt-3">Items:</h3>
          {data &&
        data.map((item, key) => (
          <>
        <div className="flex   border-b border-gray-200 pb-2 mt-4">
          {/* Image Section */}
          <div className="w-16 h-16 rounded-lg  flex  justify-center">
            <img
              src={item.design.json[0].imageUrl || '' }
              alt="Your product pic"
              className="rounded-lg object-cover"
            />
          </div>
          {/* Details Section */}
          <div className="flex-1 ml-1 mt-1 ">
            <div className="flex justify-between align-middle items-start text-sm">
              <h3 className="text-md font-semibold">{item.productName || "null"}</h3>
              <Link href={`/editor/${item.designId}/${item.design.json[0].id}`} className="text-sm text-red-500">Edit Design</Link>
            </div>
            <p className="text-gray-500  text-sm">Quantity:{item.quantity}</p>
          
            <p className="text-gray-500  text-sm">Item Total:₹{ parseInt(item.unitPrice?.toString() || '0') * parseInt(item.quantity?.toString() || '0')}</p>
          </div>
        </div>
      
      
          </>
          ))}
          </div>
        </div>

      </div>
    </div>
  );
}
