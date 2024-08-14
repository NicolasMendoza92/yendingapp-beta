import NextAuth from 'next-auth';
import { authConfig, prisma } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import { getUserById } from './services/users';
import { getTwoFactorConfirmationByUserId } from './lib/two-factor-confirmation';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth({
  ...authConfig,
  // Esto es para que cuando se verifique el email, nextauth actualice el emailVerified.
  events: {
    async linkAccount({ user }) {
      const userToUpdate = await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
      console.log("events: ", userToUpdate)
    }
  },
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

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.userData && session.user) {
        session.user.userData = token.userData;
      }
      return session;
    },
    async signIn({ user, account }) {
      console.log(user)
      // si hace login con google no hace falta verificar email
      if (account?.provider !== "credentials") return true;
      // añado esto por un error verga de ts 
      if (!user.id) {
        console.error("user Id is missing")
        return false
      }

      try {
        const existingUser = await getUserById(user.id);
        // evito el sing in sin email verification 
        if (!existingUser?.emailVerified) {
          console.error("Email not verified.");
          return false;
        }

        // Add logic to 2FA
        if (existingUser.isTwoFactorEnabled) {
          const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

          if (!twoFactorConfirmation) {
            console.error("Two-factor authentication not confirmed.");
            return false;
          }
          // delete 2fa for next sign in
          await prisma.twoFactorConfirmation.delete({
            where: { id: twoFactorConfirmation.id }
          })
        }

        return true

      } catch (error) {
        console.error("Error during signIn callback:", error);
        return false;
      }

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
        if (!user) {
          console.error("No user found with this email.");
          throw new Error('No user found with this email.');
        }

        const passwordMatch = await bcrypt.compare(password, user.password || '');
        if (!passwordMatch) {
          console.error("Password does not match.");
          throw new Error('Password does not match.');
        }

        return user;
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
