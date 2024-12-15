import { z } from "zod";
import { Hono } from "hono";

import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import db from "@/db/prisma";

// Define the schema for OrderItem
const orderItemSchema = z.object({
  orderId: z.string(),
  productId: z.string(),
  productName: z.string(),
  quantity: z.number(),
  unitPrice: z.number().optional(),
  totalPrice: z.number(),
});

// Initialize Hono App
const app = new Hono()
.post(
  "/",
  verifyAuth(),
  zValidator("json", orderItemSchema),
  async (c) => {
    const { orderId, productId, productName, quantity, unitPrice, totalPrice } = c.req.valid("json");

    // Ensure the user is authenticated
    const auth = c.get("authUser");
    if (!auth.token?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Create a new OrderItem
    const data = await db.orderItem.create({
      data: {
        orderId,
        productId,
        productName,
        quantity,
        unitPrice,
        totalPrice,
      },
    });

    return c.json({ data });
  }
)
.get(
  "/",
  verifyAuth(),
  async (c) => {
    const auth = c.get("authUser");
    if (!auth.token?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Fetch all OrderItems
    const data = await db.orderItem.findMany({
    });

    return c.json({ data });
  }
)
.get(
  "/:id",
  verifyAuth(),
  zValidator("param", z.object({ id: z.string() })),
  async (c) => {
    const { id } = c.req.valid("param");

    // Fetch OrderItem by ID
    const data = await db.orderItem.findUnique({
      where: { id },
    });

    if (!data) {
      return c.json({ error: "OrderItem not found" }, 404);
    }

    return c.json({ data });
  }
)
.put(
  "/:id",
  verifyAuth(),
  zValidator("param", z.object({ id: z.string() })),
  zValidator("json", orderItemSchema),
  async (c) => {
    const { id } = c.req.valid("param");
    const { orderId, productId, productName, quantity, unitPrice, totalPrice } = c.req.valid("json");

    // Ensure the user is authenticated
    const auth = c.get("authUser");
    if (!auth.token?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Update the OrderItem
    const data = await db.orderItem.update({
      where: { id },
      data: {
        orderId,
        productId,
        productName,
        quantity,
        unitPrice,
        totalPrice,
      },
    });

    return c.json({ data });
  }
)
.delete(
  "/:id",
  verifyAuth(),
  zValidator("param", z.object({ id: z.string() })),
  async (c) => {
    const { id } = c.req.valid("param");

    // Ensure the user is authenticated
    const auth = c.get("authUser");
    if (!auth.token?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Delete the OrderItem
    await db.orderItem.delete({
      where: { id },
    });

    return c.json({ data: { id } });
  }
);

export default app;
