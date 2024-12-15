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
  eyelets:z.string(),
  cod:z.string(),
  designId:z.string(),
  productId:z.string()

});

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
    zValidator("json", productInsertSchema.partial()),
    async (c) => {
      const auth =  c.get("authUser");


      const { name, description, price, imageUrl , categoryId , canvaNo, height, width, eyelets, cod , designId , productId } = c.req.valid("json");
      

      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

 

        const cartcheck = await db.cart.findFirst({
            where :{
            productId,
            quantity: "1",
            
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
             id:designId
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
        designId:dumy.id,
        userId:auth.token?.id!,
  
        },
      });

      return c.json({ designId:dumy.id , jsonId:dumy.json[0].id});
    }
  );

export default cart;
