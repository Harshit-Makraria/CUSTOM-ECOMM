import { optional, z } from "zod";
import { Hono } from "hono";
import { eq, and, desc, asc } from "drizzle-orm";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import db from "@/db/prisma";
import { Role } from "@prisma/client";

const verificationSchema = z.object({
  departmentId: z.string(),
  email: z.string(), // Add specific fields in your JSON if needed
  departmentName:z.string(),
  role: z.array(z.nativeEnum(Role)).optional(),
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
      const data = await db.verificationToken.delete({
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

      const data = await db.verificationToken.findMany({
       
       
        orderBy: { createdAt: "desc" },

      });

      return c.json({
        data
    
      });
    }
  )

  .get(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      
      const { id } = c.req.valid("param");

 
      const data = await db.verificationToken.findUnique({
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

      verificationSchema.pick({
        departmentId: true,
        email: true,
        departmentName:true,
        role: true,
      })
    ),

    async (c) => {
      const auth = c.get("authUser");
      const { departmentId, email, departmentName, role } = c.req.valid("json");

      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      


      // Insert the new project
      const data = await db.verificationToken.create({
        data: {
          departmentId,
          email,
          expires : new Date(),
          role:role??['EMPLOYEE'],
          status: "PENDING",
          departmentName
        },
      });

      // Return the created record
      return c.json({ data });
    }
  );

export default app;
