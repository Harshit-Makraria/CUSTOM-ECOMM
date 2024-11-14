import type { NextApiRequest, NextApiResponse } from 'next';
 
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendEmail(email:string){

 
   const { data, error } = await resend.emails.send({
     from: 'Lexus <admin@wondmobility.co.in>', // sender address
     to: `${email}`, // list of receivers
     subject: "Cridential", // Subject line
 
     html: `<b>Username :${email} </b>`
   });

   if(error) {
    return false
   }

   return true
  
  
};


 