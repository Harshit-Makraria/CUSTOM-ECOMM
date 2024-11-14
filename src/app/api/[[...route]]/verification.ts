import { optional, string, z } from "zod";
import { Hono } from "hono";
import { eq, and, desc, asc } from "drizzle-orm";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import db from "@/db/prisma";
import { Post } from "@prisma/client";
import sendEmail from "../_utils/nodemailer/send-email";
import { error } from "console";
 

const verificationSchema = z.object({
  departmentIds:z.array(z.string()),
  email: z.string(), // Add specific fields in your JSON if needed
 
  post:  z.array(z.string())
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
    // verifyAuth(),
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



      return c.json( data );
    }
  )

  .post(
    "/",
    verifyAuth(),
    zValidator(
      "json",

      verificationSchema.partial()
    ),

    async (c) => {
      const auth = c.get("authUser");
      const { departmentIds, email , post } = c.req.valid("json");

      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      // const isEmailSent =  await sendEmail(email)
      
      const tokenExist = await db.verificationToken.findFirst({
        where :{
          email
        }
      })

      const userExist = await db.user.findFirst({
        where :{
          email
        }
      })
      
       if(userExist || tokenExist) {
         return c.json({error :"Already Created"}, 402)
       }

     const isEmailSent =   await sendEmail(email!)
   
     if(!isEmailSent) {
      return  c.json({error:"Email cannot be sent"} , 500)
     }
    
      const data = await db.verificationToken.create({
        data: {
          departmentIds,
          email:email!,
          expires : new Date(),
          post,
          status: "PENDING",
     
        },
      });

      // Return the created record
      return c.json({ data });
    }
  );

export default app;
