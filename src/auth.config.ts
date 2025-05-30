import { z } from "zod";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";

import { JWT } from "next-auth/jwt";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";

import db from "./db/prisma";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's name. */
      name: string | null;
      role: Role | null;
      image: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string | undefined;
    role: Role | null;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string | undefined;
    role: Role | null;
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
      },
    }),

    // GitHub,
    // Google
  ],
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  secret: process.env.SCREATE,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: async ({ session, token }) => {
       
      
     



      if (token.id) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        const DBuser = await db.user.findUnique({
          where: {
            id: user.id,
          },
        });
        token.id = DBuser?.id;
        token.role = DBuser?.role ?? null;
      }

      return token;
    },

    async authorized({ request, auth }) {
      //if a non-employee come to a admin path it will redirect you to the home page
      // but an employee can go  to a home route
  
      if (
        auth?.user.role == null &&
        request.nextUrl.pathname.startsWith("/admin")
      ) {
        return NextResponse.redirect(request.nextUrl.origin + "/");
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
