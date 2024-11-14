import NextAuth from "next-auth";
import { NextRequest } from "next/server";
 

export {auth as middleware} from '@/auth'


 

export const auth = NextAuth({
    providers:[] ,
    secret: process.env.SCREATE,
    
  });