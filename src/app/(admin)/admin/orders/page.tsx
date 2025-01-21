'use client'

import { useGetOrder } from '@/features/order/use-get-order'
import { useGetproduct } from '@/features/product/api/use-get-product'
import Image from 'next/image'
import React from 'react'
import { toast } from 'sonner'
import { useUpdateOrder } from '@/features/order/use-update-order' 
export default function Page() {
  const { data: orders } = useGetOrder();

  const updateOrder = useUpdateOrder();
  const handleUpdate = (orderId: string, status: string) => {
    updateOrder.mutate(
      { orderId, status },
      {
        onSuccess: () => {
          // Show success toast
          toast.success("Order status updated to " + status);
        },
        onError: (err) => {
          // Show error toast
          toast.error(`Failed to update order: ${err.message}`);
        },
      }
    );
  }

  return (
    <>
      <h1 className="font-bold text-lg text-black mb-3">Orders</h1>
      {orders &&
        orders.map((order) => (
          <div
            key={order.orderId}
            className="border rounded-lg shadow-sm p-4 bg-white flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-600">
                Order ID:{" "}
                <span className="font-medium text-gray-900">{order.orderId}</span>
              </p>
              <p className="text-sm text-gray-600">
                Product:{" "}
                <span className="font-medium text-gray-900">
                  {order.productName}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Order Date:{" "}
                <span className="font-medium text-gray-900">
                  {new Date(order.updatedAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <select
                value={order.status}
                onChange={(e) => handleUpdate(order.id, e.target.value)}
                className="text-sm font-medium px-3 py-1 rounded-full bg-gray-100"
              >
                <option value="PENDING">Pending</option>
                <option value="OUTFORDELIVERY">Out for Delivery</option>
                <option value="SHIPPED">Shipped</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="DELIVERED">Delivered</option>
              </select>
              <p className="text-lg font-semibold text-gray-900">
                ₹{order.unitPrice}.00
              </p>
            </div>
          </div>
        ))}
    </>
  );
}
