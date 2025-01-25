import { z } from "zod";
import { Hono } from "hono";

import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import db from "@/db/prisma";
import { TbRulerMeasure } from "react-icons/tb";
// import generateUniqueUUID from "../_utils/uuid";

// Define the schema for OrderItem
const orderItemSchema = z.object({
  cartIds: z.array(z.string()),
  status: z.enum(["PENDING","OUTFORDELIVERY", "SHIPPED", "CANCELLED","DELIVERED"]).optional(),
  orderId: z.string(),
  productId: z.string(),
  productName: z.string(),
  quantity: z.string(),
  unitPrice: z.number().optional(),
  totalPrice: z.number(),
});

// Initialize Hono App
const app = new Hono()
  .post(
    "/",
    verifyAuth(),
    zValidator("json", orderItemSchema.partial()),
    async (c) => {
      const values = c.req.valid("json");

      // Ensure the user is authenticated
      const auth = c.get("authUser");
      const user = await db.user.findUnique({
        where :{
          id : auth.token?.id
        } , 
        select :{
          defaultBilling:true,
          defaultShipping:true
        }
      })
      if (!auth.token?.id || !user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

       


      //fetch the cart

      const carts = await db.cart.findMany({
        where: {
          userId: auth.token.id,
          id: {
            in: values.cartIds,
          },
        },
      });



      // Create a new Order
      const data = await db.order.createMany({
        data: carts.map((cart) => {
          
          const { id, ...cartdata } = cart;
          // const orderId = generateUniqueUUID()
          return {
            
            ...cartdata,
            shippingAddress : JSON.stringify(user.defaultBilling),
            billingAddress : JSON.stringify(user.defaultShipping),
            userId: auth.token!.id!,
            // orderId,
          
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        }),
      });

      //  empty the cart
      await db.cart.deleteMany({
        where: {
          id: {
            in: values.cartIds,
          },
        },
      });

      return c.json({ data });
    }
  )
  .get("/", verifyAuth(), async (c) => {
    const auth = c.get("authUser");
    if (!auth.token?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Fetch all OrderItems
    const data = await db.order.findMany({
      where: { userId: auth.token?.id! }, 
        include :{
          design : {
            include :{
              json :true
            }
          }
        },
    });

    return c.json({ data });
  })
  .get(
    "/id",
    verifyAuth(),
    
    async (c) => {
      const auth = c.get("authUser");
      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      // Fetch OrderItem by ID
      const data = await db.order.findMany({
        where: { userId: auth.token?.id! }, 
        include :{
          design : {
            include :{
              json :true
            }
          }
        },
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
      const { productId, productName, quantity, unitPrice, totalPrice } =
        c.req.valid("json");

      // Ensure the user is authenticated
      const auth = c.get("authUser");
      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      // Update the OrderItem
      const data = await db.order.update({
        where: { id },
        data: {
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
  .patch(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })), // Validate the `id` parameter
    zValidator(
      "json",
      z.object({
        status: z.enum(["PENDING", "OUTFORDELIVERY", "SHIPPED", "CANCELLED", "DELIVERED"]).optional(),
      })
    ), // Validate that only `status` is provided and it matches the enum
    async (c) => {
      const { id } = c.req.valid("param"); // Extract `id` from the parameters
      const { status } = c.req.valid("json"); // Extract `status` from the request body
  
      // Ensure the user is authenticated
      const auth = c.get("authUser");
      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }
  
      // Update only the `status` field
      const data = await db.order.update({
        where: { id },
        data: {
          status, // Update the status
          updatedAt: new Date(), // Update the timestamp
        },
      });
  
      return c.json({ data }); // Return the updated data
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
      await db.order.delete({
        where: { id },
      });

      return c.json({ data: { id } });
    }
  );

export default app;
