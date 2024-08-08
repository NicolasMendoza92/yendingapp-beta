import NextAuth from 'next-auth'
import { authConfig, prisma } from './auth.config'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update: update
} = NextAuth({
  ...authConfig,
  callbacks: {
    async jwt({ token, user, trigger, session, account}) {
      if (account?.provider === 'google') {
        token.accessToken = account.access_token;
      }
      if (user && token) {
        token.userData = user
      }
      if (trigger === 'update' && session) {
        token = { ...token, userData: session?.userData }
        return token
      }
      return token
    },
    async session({ session, token}) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.userData && session.user) {
        session.user.userData = token.userData
      }
      return session
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string
          password: string
        }
        console.log('Email:', email)
        console.log('Password:', password)

        try {
          const user = await prisma.users.findUnique({ where: { email: email } })
          console.log('User in auth.ts:', user)
          if (!user || !user.password) return null

          const passwordMatch = await bcrypt.compare(
            password,
            user.password || ''
          )
          if (!passwordMatch) {
            return null
          }
          return user
        } catch (error) {
          console.error('Authorization error:', error)
          return null
        }
      }
    }),
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      profile(profile) {
        console.log('Google profile:', profile);
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    })
  ]
})
