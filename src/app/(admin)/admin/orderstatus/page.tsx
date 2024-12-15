"use client"
import { useState } from 'react';
import { PrismaClient, OrderStatus } from '@prisma/client';

const prisma = new PrismaClient();

const AdminOrderUpdate = () => {
  const [newStatus, setNewStatus] = useState<OrderStatus>(OrderStatus.Processing);

  const updateOrderStatus = async () => {
    try {
      const updatedOrder = await prisma.order.update({
        where: { id: '1' },
        data: {
          status: newStatus,
          
        }
      });
      console.log('Order updated:', updatedOrder);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <div>
      <h3>Update Order Status</h3>
      <select value={newStatus} onChange={(e) => setNewStatus(e.target.value as OrderStatus)}>
        {Object.values(OrderStatus).map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <button onClick={updateOrderStatus}>Update Status</button>
    </div>
  );
};

export default AdminOrderUpdate;
