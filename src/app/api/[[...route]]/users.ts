import { z } from "zod";
import { Hono } from "hono";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";

import db from "@/db/prisma";
import { Role, User } from "@prisma/client";

const EmployeeUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(3).max(20),
  departmentId: z.string(),
  post: z.array(z.string()),
});


const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(3).max(20),

});

const app = new Hono()
  .post(
    "/",
    zValidator(
      "json",

      UserSchema.partial()
    ),
    async (c) => {
      const { name, email, password} = c.req.valid("json");

      const hashedPassword = await bcrypt.hash(password!, 12);

      const query = await db.user.findUnique({
        where: {
          email: email,
        },
      });

      if (query) {
        return c.json({ error: "Email already in use" }, 400);
      }

      const user = await db.user.create({
        data: {
          email: email!,
          name: name,
          password: hashedPassword,
        },
      });

  

      return c.json(null, 200);
    }
  )
  .post(
    "/employee",
    zValidator(
      "json",
      EmployeeUserSchema.partial()
    ),
    async (c) => {
      const { name, email, password, departmentId, post } = c.req.valid("json");

      const hashedPassword = await bcrypt.hash(password!, 12);

      const query = await db.user.findUnique({
        where: {
          email: email,
        },
      });

      if (query) {
        return c.json({ error: "Email already in use" }, 400);
      }

      const user = await db.user.create({
        data: {
          email: email!,
          name: name,
          password: hashedPassword,
          role: "EMPLOYEE",
          departmentId,
        },
      });

      if(post !=  undefined) {

        await db.postToUser.createMany({
          data: post.map((postId) => ({
            userId: user.id,
            postId: postId
          })),
        });
      }


      return c.json(null, 200);
    }
  );

export default app;
