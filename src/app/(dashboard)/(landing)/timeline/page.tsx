"use client";
import { useEffect, useState } from 'react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const UserOrderTimeline = () => {
  const [status, setStatus] = useState([]);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const order = await prisma.order.findUnique({
          where: { id: '1' }, // Assuming '1' is the order ID you're fetching
        });
        if (order) {
          setStatus(order.status);
        }
      } catch (error) {
        console.error('Error fetching timeline:', error);
      }
    };

    fetchTimeline();
  }, []); // Empty dependency array ensures this effect runs only once after the component mounts

  return (
    <div>
      <h3>Order Timeline</h3>
      <ul>
        {status.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserOrderTimeline;
