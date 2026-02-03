import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // temporary dummy user
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        // 1 Find user in DB
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.password) {
          return null
        }

        // 2 Compare password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isValid) {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],
  pages: {
    signIn: "/", // login page
  },

  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
