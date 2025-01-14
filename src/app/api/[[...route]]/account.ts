import { optional, string, z } from "zod";
import { Hono } from "hono";
 
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import db from "@/db/prisma";
import { Account, Post } from "@prisma/client";

const accountSchema = z.object({
  userId: z.string(),
  branchId: z.string(),
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
      const data = await db.account.delete({
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

      const accountDetails = await db.account.findMany({
        where: {
          userId: auth.user?.id,
        },
        select: {
          branch: true,
          post: {
            select: {
              Post: true,
            },
          },
        },
      });

     const data =  accountDetails.map(account=>{
      return {
        ...account,
        posts:account.post.map(post=>({...post.Post}))
      }
     })

      return c.json({data});
    }
  )

  .get(
    "/:id",
    // verifyAuth(),
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

      accountSchema.pick({
        branchId: true,
        userId: true,
      })
    ),

    async (c) => {
      const auth = c.get("authUser");
      const { userId, branchId } = c.req.valid("json");

      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      // const isEmailSent =  await sendEmail(email)

      //  if(!isEmailSent) {
      //    return c.json({error :"Internal Server Error"}, 402)
      //  }

      // Insert the new project
      const data = await db.account.create({
        data: {
          userId,
          branchId,
        },
      });

      // Return the created record
      return c.json({ data });
    }
  );

export default app;
