import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // temporary dummy user
        if (!credentials?.email) return null

        return {
          id: "1",
          email: credentials.email,
        }
      },
    }),
  ],
})

export { handler as GET, handler as POST }
