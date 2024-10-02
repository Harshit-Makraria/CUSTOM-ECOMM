import { optional, z } from "zod";
import { Hono } from "hono";
import { eq, and, desc, asc } from "drizzle-orm";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import db from "@/db/prisma";



const projectInsertSchema = z.object({
  name: z.string(),
  json: z.string(),  // Add specific fields in your JSON if needed
  width: z.number(),
  height: z.number(),
});
const app = new Hono()
  .get(
    "/templates",
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

      const data = await db.design.findMany({
        where: {
          isTemplate: true,
        },
        take: limit, // Equivalent to `limit`
        skip: (page - 1) * limit, // Equivalent to `offset`
        orderBy: [
          { isPro: "asc" }, // First, order by `isPro` in ascending order
          { updatedAt: "desc" }, // Then, order by `updatedAt` in descending order
        ],
        include : {
          json :true
        }
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
      const record = await db.design.findUnique({
        where: { id: id, userId: auth.user?.id },
      });

      // 2. Perform the deletion
      const data = await db.design.delete({
        where: { id: id },
      });

      // 3. Return the deleted record

      return c.json({ data: { id } });
    }
  )
  .post(
    '/:id/duplicate',
    verifyAuth(),
    zValidator('param', z.object({ id: z.string() })),
    async (c) => {
      const auth = c.get('authUser');
      const { id } = c.req.valid('param');
  
      if (!auth.token?.id) {
        return c.json({ error: 'Unauthorized' }, 401);
      }
  
      // Retrieve the project to be duplicated
      const project = await db.design.findUnique({
        where: { id: id, userId: auth.token.id },
        include :{
          json : true
        }
      });
  
      if (!project) {
        return c.json({ error: 'Not found' }, 404);
      }
       const { name , width ,height  , json} = project
   
       const duplicateJsonArray = json.map(({height ,json,width})=>{
        
        return {height ,json,width}

       })
      // Insert the duplicated project
      const data = await db.design.create({
        data: {
          name,
          width,
          height,
          userId: auth.token.id,
        json : {
          create : duplicateJsonArray
        }
        },

        include :{
          json :true
        }
        
      });
  
      return c.json({ data });
    }
  )
.get(
    '/',
    verifyAuth(),
    zValidator(
      'query',
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      })
    ),
    async (c) => {
      const auth = c.get('authUser');
      const { page, limit } = c.req.valid('query');
  
      if (!auth.token?.id) {
        return c.json({ error: 'Unauthorized' }, 401);
      }
  
      const data = await db.design.findMany({
        where: { userId: auth.token.id },
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { updatedAt: 'desc' },
        include :{
          json:true
        }
      });
  
      return c.json({
        data,
        nextPage: data.length === limit ? page + 1 : null,
      });
    }
  )
  
  .patch(
    '/:id/:jsonId',
    verifyAuth(),
    zValidator('param', z.object({ id: z.string() , jsonId:z.string()})),
    zValidator(
      "json",
      projectInsertSchema.partial()
        
        
    ),
    async (c) => {
      
      const auth = c.get('authUser');
      const { id  , jsonId} = c.req.valid('param');
      const values = c.req.valid('json');
      
      
  
      if (!auth.token?.id) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      // we haVe to update the canvajson now
   
      const data = await db.canvaJson.update({
        where: {
          id: jsonId,
        
        },
        data: {
          ...values,
          updatedAt: new Date(),
        },
      });
      
      await db.design.update({
        where:{
          id:id , 
          userId:auth.user?.id
        } , 
        data :{

          updatedAt: new Date(),

        }
      })

     
  
      if (!data) {
        return c.json({ error: 'Not found or Unauthorized' }, 404);
      }
  
      // Fetch the updated record
      const updatedRecord = await db.design.findUnique({
        where: { id: id },
      });
      const Canvajson = await db.canvaJson.findUnique({
        where  :{
        id:jsonId
        }
      })
  
      return c.json({ data:updatedRecord  , Canvajson });
    }
  )
  
 .get(
    '/:id',
    verifyAuth(),
    zValidator('param', z.object({ id: z.string() })),
    async (c) => {
      const auth = c.get('authUser');
      const { id } = c.req.valid('param');
  
      if (!auth.token?.id) {
        return c.json({ error: 'Unauthorized' }, 401);
      }
  
      const data = await db.design.findUnique({
        where: {
          
            id: id,
            userId: auth.token.id,
          
        },
        include :{
          json:true
        }
      });

      // const Canvajson = await db.canvaJson.findFirst({
      //   where  :{
      //   designId:id
      //   }
      // })
  
      if (!data) {
        return c.json({ error: 'Not found' }, 404);
      }

      // if(!Canvajson) {
      //       return c.json({ error: 'Not found' }, 404);
      // }
  
      return c.json({ data  });
    }
  )
  
  .post(
    '/',
    verifyAuth(),
    zValidator(
      "json",
     
      projectInsertSchema.pick({
        name: true,
        json: true,
        width: true,
        height: true,
      })
      
    ),
    
    async (c) => {
      const auth = c.get('authUser');
      const { name, json, height, width } = c.req.valid('json');
  
      if (!auth.token?.id) {
        return c.json({ error: 'Unauthorized' }, 401);
      }
  
      // Insert the new project
      const data = await db.design.create({
        data: {
          name,
          width,
          height,
          userId: auth.token.id,
        json : {
          create : [
            {
              json,
              height,
              width
            }
          ]
        }
        },

        include :{
          json :true
        }
        
      });
 
  
      // Return the created record
      return c.json({ data });
    }
  );
  

export default app;
