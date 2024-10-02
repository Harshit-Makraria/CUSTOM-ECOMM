import { z } from "zod";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
 
import { JWT } from "next-auth/jwt";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
 
import db from './db/prisma'

const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

declare module "next-auth/jwt" {
  interface JWT {
    id: string | undefined;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string | undefined;
  }
}

export default {
  adapter: PrismaAdapter(db),
  providers: [
   
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        pasword: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = CredentialsSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        const user = await db.user.findUnique({
          where: { email: email }, // Look up the user by email
        });
      
        // 2. If no user or no password is found, return null
        if (!user || !user.password) {
          return null;
        }
      
        // 3. Compare the password with the hashed password
        const passwordsMatch = await bcrypt.compare(password, user.password);
      
        // 4. If passwords don't match, return null
        if (!passwordsMatch) {
          return null;
        }
      
        // 5. Return the user if authentication is successful
        return user;
      }
    }), 
  
    // GitHub, 
    // Google
  ],
  pages: {
    signIn: "/sign-in",
    error: "/sign-in"
  },
  secret: process.env.SCREATE,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
      }

      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;  
      }

      return token;
    }
    
  },
} satisfies NextAuthConfig
