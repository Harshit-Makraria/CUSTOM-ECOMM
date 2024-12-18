'use'

import { useGetOrder } from '@/features/order/use-get-order'
import { useGetproduct } from '@/features/product/api/use-get-product'
import React from 'react'

export default function page() {

    const {data:orders } = useGetOrder()

  return (
    <>
    {orders && orders.map(order=>{
      return <> 
        <div>{order.id}</div>
      </>
    })}
    </>
  )
}
