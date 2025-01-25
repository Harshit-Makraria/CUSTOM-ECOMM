'use client';

import { useGetOrder } from '@/features/order/use-get-order';
import { useUpdateOrder } from '@/features/order/use-update-order';
import { toast } from 'sonner';
import React, { useState } from 'react';

export default function Page() {
  const { data: orders } = useGetOrder();
  const updateOrder = useUpdateOrder();

  // State for filters
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // State for confirmation modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedStatus, setSelectedStatus] = useState('');

    type OrderStatus = 'PENDING' | 'OUTFORDELIVERY' | 'SHIPPED' | 'CANCELLED' | 'DELIVERED';

    type Order = {
      userId: string;
      quantity: string | null;
      id: string;
      createdAt: string;
      updatedAt: string;
      status: OrderStatus;
      designId: string;
      categoryId: string | null;
      unitPrice: number | null; // Allow null values here
      productName: string | null;
    };
  const openModal = (order: Order, status: string) => {
    setSelectedOrder(order);
    setSelectedStatus(status);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setSelectedStatus('');
  };

  const confirmUpdate = () => {
    if (selectedOrder) {
      updateOrder.mutate(
        { orderId: selectedOrder.id, status: selectedStatus },
        {
          onSuccess: () => {
            toast.success(`Order status updated to ${selectedStatus}`);
            closeModal();
          },
          onError: (err) => {
            toast.error(`Failed to update order: ${err.message}`);
            closeModal();
          },
        }
      );
    }
  };

  // Filtered orders based on filters
  const filteredOrders = orders?.filter(
    (order) =>
      (filterName === '' || (order.productName && order.productName.includes(filterName))) &&
      (filterStatus === '' || order.status === filterStatus)
  );

  return (
    <>
      <h1 className="font-bold text-lg text-black mb-3">Orders</h1>

      {/* Filters */}
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <select
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="px-3 py-2 border rounded-lg bg-white text-sm"
        >
          <option value="">Filter by Product</option>
          {orders &&
            [...new Set(orders.map((order) => order.productName))].map((name) => (
              <option key={name} value={name || ''}>
                {name}
              </option>
            ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border rounded-lg bg-white text-sm"
        >
          <option value="">Filter by Status</option>
          <option value="PENDING">Pending</option>
          <option value="OUTFORDELIVERY">Out for Delivery</option>
          <option value="SHIPPED">Shipped</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="DELIVERED">Delivered</option>
        </select>
      </div>

      {/* Orders */}
      {filteredOrders &&
        filteredOrders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg shadow-sm p-4 bg-white flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className=''><img src={order.design.json[0].imageUrl || ""} alt=""  className='w-52  h-32 border rounded-xl'/></div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-600">
                Order ID:{' '}
                <span className="font-medium text-gray-900">{order.id}</span>
              </p>
              <p className="text-sm text-gray-600">
                Product:{' '}
                <span className="font-medium text-gray-900">{order.productName}</span>
              </p>
              <p className="text-sm text-gray-600">
                Order Date:{' '}
                <span className="font-medium text-gray-900">
                  {new Date(order.updatedAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </span>
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <select
                value={order.status}
                onChange={(e) => openModal(order, e.target.value)}
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

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Confirm Update</h2>
            <p className="text-sm text-gray-600">
              Are you sure you want to update the status of{' '}
              <span className="font-medium">{selectedOrder?.productName}</span> to{' '}
              <span className="font-medium">{selectedStatus}</span>?
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
