import { optional, z } from "zod";
import { Hono } from "hono";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import db from "@/db/prisma";

const productInsertSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.array(z.number()),
  imageUrl: z.string(), // Assuming products have an image URL
  categoryId:z.string(),
  canvaNo : z.number(),
  size: z.array(z.string()),
  width: z.number(),
  height: z.number(),
  eyelets:z.string().optional(),
  cod:z.string(),
  min_quantity:z.number(),

});

const app = new Hono()
  .get(
    "/products",
    verifyAuth(),
    zValidator(
      "query",
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      })
    ),
    async (c) => {
      const { page, limit } = c.req.valid("query");

      const data = await db.product.findMany({
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { updatedAt: "desc" },
      });

      return c.json({ data });
    }
  )
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

      const record = await db.product.findUnique({
        where: { id: id },
      });

      if (!record) {
        return c.json({ error: "Not found" }, 404);
      }

      const data = await db.product.delete({
        where: { id: id },
      });

      return c.json({ data: { id } });
    }
  )
  // .post(
  //   "/:id/duplicate",
  //   verifyAuth(),
  //   zValidator("param", z.object({ id: z.string() })),
  //   async (c) => {
  //     const auth = c.get("authUser");
  //     const { id } = c.req.valid("param");

  //     if (!auth.token?.id) {
  //       return c.json({ error: "Unauthorized" }, 401);
  //     }

  //     // Retrieve the product to be duplicated
  //     const product = await db.product.findUnique({
  //       where: { id: id },
  //     });

  //     if (!product) {
  //       return c.json({ error: "Not found" }, 404);
  //     }

  //     const { name, description, price, imageUrl, category, userId } = product;

  //     // Insert the duplicated product
  //     const data = await db.product.create({
  //       data: {
  //         name,
  //         description,
  //         price,
  //         imageUrl,
  //         category,
  //         userId:auth.user?.id!,
  //         quantity:45

  //       },
  //     });

  //     return c.json({ data });
  //   }
  // )
  .get(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");

      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db.product.findFirst({
        where: { id: id },
      });

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  )
  .patch(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", productInsertSchema.partial()),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const product = await db.product.findUnique({
        where: { id: id },
      });

      if (!product ) {
        return c.json({ error: "Not found or Unauthorized" }, 404);
      }

      const data = await db.product.update({
        where: { id: id },
        data: { ...values, updatedAt: new Date(), categoryId: values.categoryId ?? undefined },
      });

      if (!data) {
        return c.json({ error: "Not found or Unauthorized" }, 404);
      }

      return c.json({ data });
    }
  )
  .post(
    "/",
    verifyAuth(),
    zValidator("json", productInsertSchema),
    async (c) => {
      const auth =  c.get("authUser");


      const { name, description, price, imageUrl , categoryId , canvaNo, height, width, eyelets, cod, size,min_quantity} = c.req.valid("json");
      

      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const desing = await db.design.create({
        data :{
          height,
          name:"untitled",
          width,
          userId:auth.token?.id!,
          json :{
            create :{
              height,
              width,
              name:"canva1",
              json:''
            }
          }
        }
      })

      // Insert the new product
      const data = await db.product.create({
        data: {
         designId:desing.id,
          categoryId,
          name,
          description,
           price,
          imageUrl,
          height,
          width,
          eyelets,
          cod,
          size,
          min_quantity,
           quantity:1,
          userId:auth.token?.id!,
        },
      });

      return c.json({ data });
    }
  );

export default app;
