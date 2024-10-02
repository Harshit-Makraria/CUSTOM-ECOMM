import NextAuth from "next-auth";

export { auth as middleware } from "@/auth";
export const auth = NextAuth({
    providers:[] ,
    secret: process.env.SCREATE,
  });