import { z } from "zod";
import { Hono } from "hono";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";

import db from "@/db/prisma";
import { Role, User } from "@prisma/client";
import { auth } from "@/auth";
import { verifyAuth } from "@hono/auth-js";

const EmployeeUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(3).max(20),
  branchIds: z.array(z.string()),
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
      const { name, email, password } = c.req.valid("json");

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
    
    zValidator("json", EmployeeUserSchema.partial()),
    async (c) => {
      const { name, email, password, branchIds, post } =
        c.req.valid("json");

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
        },
      });

      var activeAccountId = null;

      if (branchIds != undefined) {
        for (let branchId of branchIds) {
          const account = await db.account.create({
            data: {
              branchId,
              userId: user.id,
            },
          });

          const postToAccount = await db.postToAccount.createMany({
            data: post!.map((postId) => {
              return {
                accountId: account.id,
                postId,
              };
            }),
          });

          activeAccountId = account.id;
        }
      } else {

        //  here will come the user who doesnt have the depaertment

         const account = await db.account.create({
          data :{
            userId:user.id
          }
         })

        const postToAccount = await db.postToAccount.createMany({
          data: post!.map((postId) => {
            return {
              accountId: account.id,
              postId,
            };
          }),
        });
      }

      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          activeAccountId,
        },
      });

      await db.verificationToken.update({
        where :{
          email
        } , 
        data :{
          status :"ACCEPTED"
        }
      })

      return c.json(null, 200);
    }
  )
  .get(
    "/employee",
    verifyAuth(),
    
    async (c) => {
   
   const userId =  c.get('authUser').token?.id
 
    const user = await db.user.findUnique({
      where :{
             id:userId
      }
      ,
      include : {
        activeAccount :{
          select :{
            branch:true,
            post:{
              select:{
         Post:true
              }
            }
          }
        }
      }
    })

    const accountDetails = await db.account.findMany({
      where: {
        userId:user?.id,
        
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

  

   const formatedAccountDetail =  accountDetails.map(account=>{
    return {
      ...account,
      post:account.post.map(post=>({...post.Post}))
    }
   })

     

      return c.json({...user , accounts:formatedAccountDetail ,activeAccount:{...user?.activeAccount ,post:user
        ?.activeAccount?.post.map(el=>el.Post)
       } }, 200);
    }
  );

export default app;
