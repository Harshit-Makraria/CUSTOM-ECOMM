import type { NextApiRequest, NextApiResponse } from 'next';
 
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendEmail(email:string){

 try {
   const { data, error } = await resend.emails.send({
     from: 'Lexus <lexuslearning@gmail.com>', // sender address
     to: `${email}`, // list of receivers
     subject: "Cridential", // Subject line
 
     html: `<b>Username :${email} </b>`
   });
 console.log({data , error})
   return true
 
 } catch (error) {
  return false
 }
  
};


 