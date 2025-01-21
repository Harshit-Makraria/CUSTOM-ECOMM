import NextAuth from "next-auth";
import { NextRequest } from "next/server";
 import db from "./db/prisma"; 

export {auth as middleware} from '@/auth'


 

export const auth = NextAuth({
    providers:[] ,
    callbacks: {
      async session({ session, token }) {
        if (session.user && token.sub) {
          // Check if the user exists in the database
          const user = await db.user.findUnique({
            where: { id: token.sub },
          });
  
          // If the user doesn't exist, invalidate the session
          if (!user) {
            return { ...session, user: undefined }; // This removes the user from the session
          }
        }
  
        return session; // Return the session if the user exists
      },
    },
    secret: process.env.SCREATE,
    
  });

  import { signOut } from "next-auth/react";

const deleteUserAndSignOut = async (userId:any) => {
  // Delete the user from the database
  await fetch(`/api/delete-user`, {
    method: "DELETE",
    body: JSON.stringify({ userId }),
  });

  // Sign out the user
  signOut();
};
