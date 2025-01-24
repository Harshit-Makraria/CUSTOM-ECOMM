'use client'

import { useGetOrderByUserId } from '@/features/order/use-get-orderByUserId'
import React from 'react'
import { UseUser } from '../_component/user-provider'
import Image from 'next/image'

export default function OrderPage() {

 
     const  {data :orders} = useGetOrderByUserId()
  
 
 
  return (
    <>
    
    <h1>Yours order</h1>

  <div className="space-y-6">
    {orders && orders.map(order=>{
      return <div key={order.id} className='flex flex-col gap-2'>
      
      <div
              key={order.id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
            >
              <Image alt='kjnjsdv' fill src={order.design.json[0].imageUrl??""}>

              </Image>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Order ID: {order.id}
                </h2>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Order Date: {new Date(order.updatedAt).toLocaleDateString()}
              </p>
              <ul className="divide-y divide-gray-200">
                {
                  <li
                    className="flex justify-between py-2 text-gray-700"
                  >
                    <span>{order.productName}</span>
                    <span>
                      {order.quantity} × ₹{(order.unitPrice ?? 0).toFixed(2)}
                    </span>
                  </li>
                }
              </ul>
              <div className="flex justify-between mt-4 text-gray-800 font-semibold">
                <span>Total:</span>
                {/* <span>₹{order..toFixed(2)}</span> */}
              </div>
            </div>
          

      
      </div>
    })}
  </div>

    </>
  )
}
