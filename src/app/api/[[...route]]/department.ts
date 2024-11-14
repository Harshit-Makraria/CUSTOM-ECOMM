import {  z } from "zod";
import { Hono } from "hono";

import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import db from "@/db/prisma";

const verificationSchema = z.object({
  
 
  departmentName:z.string(),
  pincode:z.string(),
  city:z.string(),
  address:z.string(),
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
      const data = await db.department.delete({
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

      const data = await db.department.findMany({
       
       
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

 
      const data = await db.department.findUnique({
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
      verificationSchema.omit(
 {}
      ),
    ),
    async (c) => {
      const auth = c.get("authUser");
      const {  pincode, departmentName, address , city } = c.req.valid("json");

      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized"}, 401);
      }
       

      // Insert the new verification token
      const data = await db.department.create({
        data: {
          departmentName,
          pincode,
          city,
          address
          
        },
      });

      // Send an email to the provided email address
     

      return c.json({ data });
    }
  );

export default app;
