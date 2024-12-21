import { optional, z } from "zod";
import { Hono } from "hono";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import db from "@/db/prisma";

const productInsertSchema = z.object({
  cartId:z.string(),
  name: z.string(),
  description: z.string(),
  price: z.array(z.number()),
  // imageUrl: z.string(), // Assuming products have an image URL
  categoryId:z.string(),
  canvaNo : z.number(),
  size: z.array(z.string()),
  width: z.number(),
  height: z.number(),
  eyelets:z.string(),
  cod:z.string(),
  designId:z.string(),
  productId:z.string(),
  isConsent:z.boolean()

}) ;

const cart = new Hono()
  
  .get(
    "/",
    verifyAuth(),
   
    async (c) => {
      const auth = c.get("authUser");

      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const productId = c.req.query("productId");

      const data = await db.cart.findMany({
        where: { userId: auth.token?.id!,
          productId: productId,
         },
        include :{
            design : {
                include :{
                    json:true
                }
            }
        }
      });

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  )
  .patch(
   '/',
    verifyAuth(),
    
    zValidator("json", productInsertSchema.partial()),
    async (c) => {
      const auth = c.get("authUser");
    
      const values = c.req.valid("json");

      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }



      const cart = await db.cart.findMany({
        where: {
           id: values.cartId ,
          designId:values.designId,
          userId:auth.token.id
         },
         select :{
          id:true
         }
      });

      if (!cart ) {
        return c.json({ error: "Not found or Unauthorized" }, 404);
      }

      const data = await db.cart.updateMany({
        where: { id: {
          in:cart.map(cart=>cart.id )
        } },
        data: { ...values, updatedAt: new Date()},
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
    zValidator("json", productInsertSchema.partial()),
    async (c) => {
      const auth =  c.get("authUser");


      const values = c.req.valid("json");
      

      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

 

        const cartcheck = await db.cart.findFirst({
            where :{
            productId:values.productId,
      
            
            userId : auth.token.id!
            },

            include :{
                design :{
                    include :{
                        json:true,
                        product:true
                        
                    }

                }
            }
        })



        if(cartcheck){
            return c.json({ designId:cartcheck.design.id , jsonId:cartcheck.design.json[0].id});
        }

       
      // fetch the design

      const  design = await db.design.findFirst({
        where: {    
             id:values.designId
        },
        include :{
            json :true
        }
        })

        if(!design){
            return c.json({ error: "Design not found" }, 404);
        }

      const canvaJson = design.json


      const dumy = await db.design.create({
        data :{
          height:design.height,
          name:design.name,
          width:design.width,
          userId:auth.token?.id!,
          json :{
            create :canvaJson.map((item:any)=>{
                return{
                    
                    json:item.json,
                    height:item.height,
                    width:item.width,
                    createdAt:new Date(),
                    updatedAt:new Date()
                } })
          }
        }
        ,
        include :{
            json:true
        }
      })

      // Insert the new product
      const data = await db.cart.create({
        data: {
          userId:auth.token?.id!,
          ...values,
          // 👇 ye wali line ko upper mt lana overwrite ho jaygi
          designId:dumy.id,
  
        },
      });

      return c.json({ designId:dumy.id , jsonId:dumy.json[0].id});
    }
  );

export default cart;
