import { optional, string, z } from "zod";
import { Hono } from "hono";

import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import db from "@/db/prisma";
import { Account, Post } from "@prisma/client";

const addressSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  company: z.string().optional(), // Optional field
  phone: z.string().optional(), // Optional field
  country: z.string().default("India"), // Default value
  address: z.string(),
  apartment: z.string().optional(), // Optional field
  city: z.string(),
  state: z.string(),
  pincode: z.string(),
  defaultShipping: z.boolean(),
  defaultBilling: z.boolean(),
});

const app = new Hono()

  .delete(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");

      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      // 2. Perform the deletion
      const data = await db.address.delete({
        where: { id: id },
      });

      return c.json({ data: { id } });
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

      const address = await db.address.findMany({
        where: {
          userId: auth.user?.id,
        },
      });

      return c.json({ data: { ...address } });
    }
  )

  .get(
    "/:id",

    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const { id } = c.req.valid("param");

      const data = await db.account.findMany({
        where: {
          id: id,
        },
      });

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  )

  .post(
    "/",
    verifyAuth(),
    zValidator(
      "json",

      addressSchema
    ),

    async (c) => {
      const auth = c.get("authUser");

      const { defaultBilling, defaultShipping, ...values } =
        c.req.valid("json");

      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const userId = auth.token?.id;

      // const isEmailSent =  await sendEmail(email)

      //  if(!isEmailSent) {
      //    return c.json({error :"Internal Server Error"}, 402)
      //  }

      // Insert the new project

      const data = await db.address.create({
        data: {
          userId: auth.token.id,
          ...values,
        },
      });

      if (defaultBilling) {
        await db.user.update({
          where: {
            id: userId,
          },
          data :{
            defaultBillingId:data.id
          }
        });
      }
      if (defaultShipping) {
        await db.user.update({
          where: {
            id: userId,
          },
          data :{
            defaultShippingId:data.id
          }
        });
      }

      // Return the created record
      return c.json({ data });
    }
  );

export default app;
