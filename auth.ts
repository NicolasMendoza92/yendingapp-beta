import NextAuth from 'next-auth';
import { authConfig, prisma } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import { getUserById } from './services/users';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth({
  ...authConfig,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user && token) {
        token.userData = user;
      }
      if (trigger === 'update' && session) {
        token = { ...token, userData: session?.userData };
        return token;
      }
      return token;
    },
    async session({ session, token }) {
      // console.log('en auth.ts', { sessionToken: token })
      // esto para que siempre tengamos la info del id dentro de la session
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.userData && session.user) {
        session.user.userData = token.userData;
      }
      return session;
    },
    async signIn({ user, account }) {
      // si hace login con google no hace falta verificar email
      if (account?.provider !== "credentials") return true;
      if (account?.provider === "credentials") {
        console.log("whit crede")
      };

      // añado esto por un error verga de ts 
      if (!user.id) {
        console.error("user Id is missing")
        return false
      }

      try {
        
        const existingUser = await getUserById(user.id);
        console.log("email veri: ",existingUser?.emailVerified)
        // evito el sing in sin email verification 
        // if (!existingUser?.emailVerified) return false;

        // TODO: Add 2factor auth 

        return true
      } catch (error) {
        console.error("Error during signIn callback:", error);
        return false;
      }

    }
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user = await prisma.user.findUnique({ where: { email: email } });
        if (user) {
          const passwordMatch = await bcrypt.compare(password, user.password || '');
          if (!passwordMatch) {
            return null;
          }
          return user;
        }
        return null;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
      profile(profile) {
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
