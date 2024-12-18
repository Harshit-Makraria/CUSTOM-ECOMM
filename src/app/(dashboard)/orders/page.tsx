'use client'

import { useGetOrderByUserId } from '@/features/order/use-get-orderByUserId'
import React from 'react'

export default function OrderPage() {

 
     const  {data :orders} = useGetOrderByUserId()


  return (
    <>
    
    <h1>Yours order</h1>

  <div>
    {orders && orders.map(order=>{
      return <div key={order.id} className='flex flex-col gap-2'>
      
        {order.designId}
      
      </div>
    })}
  </div>

    </>
  )
}
