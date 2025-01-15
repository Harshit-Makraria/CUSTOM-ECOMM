
 
import React, { useState } from "react";
import BannerPage from "./image";
import CustomBannersPage from "./description";
 import db from "@/db/prisma";
export default async function page( {params } :{ params : {categoryId:string , productId:string}}) {
  // const [selectedImage, setSelectedImage] = useState("/bg.jpg");
   const {productId,categoryId} = params
    const product = await db.product.findUnique({where :{
       id:productId , 
       
    } 
  
   ,
   include :{
    
    
    design : {
      select : {
        id:true ,
        json : {
          select :{
            id:true
          }
        }
      }
    }
   }})
// console.log(product)
 
  return (
    <>
      <BannerPage product={product}  />
      <CustomBannersPage product={product!}/>
    </>
 
  );
};
 
 