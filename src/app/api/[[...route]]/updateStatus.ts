import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import db from "@/db/prisma";
const app = new Hono();

app.post('/update-status', async (c) => {
  const { orderId, status } = await c.req.json();

  if (!orderId || !status) {
    return c.json({ message: "Invalid input" }, 400);
  }

  try {
    const updatedOrder = await db.order.update({
      where: { id: orderId },
      data: { status },
    });
    return c.json({ message: "Order status updated", order: updatedOrder });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return c.json({ message: "Error updating status", error: errorMessage }, 500);
  }
});

export default app;
