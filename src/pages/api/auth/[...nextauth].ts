import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { AuthOptions, Session } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import GoogleProvider from 'next-auth/providers/google';

import prisma from '../../../backend/lib/prisma';

const createUserID = () => {
  const c = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 8;
  return [...Array(length)].map(() => c[Math.floor(Math.random() * c.length)]).join('');
};

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24, // 24 hours
  },
  callbacks: {
    async session({ session }) {
      const userValue = await prisma.user.findUnique({
        where: {
          email: session.user?.email ?? '',
        },
      });
      const userDataValue = await prisma.userData.findUnique({
        where: {
          databaseId: userValue?.userDataId || '',
        },
      });
      // NOTE: ここでのパラメーター再割り当ては許容してほしい
      // eslint-disable-next-line no-param-reassign
      const newSession: Session = {
        userId: userDataValue?.userId ?? '',
        name: userDataValue?.name ?? '',
        iconUrl: userDataValue?.iconUrl ?? undefined,
        isDarkTheme: userDataValue?.isDarkTheme ?? false,
        databaseId: userDataValue?.databaseId ?? '',
        expires: session.expires,
      };
      return newSession;
    },
  },
  events: {
    async createUser({ user }) {
      const userId = createUserID();
      await prisma.userData.create({
        data: {
          userId,
          name: user.name ?? `user_${userId}`,
          authUser: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    },
  },
  useSecureCookies: process.env.NODE_ENV === 'production',
  secret: process.env.NEXTAUTH_SECRET ?? '',
  pages: {
    signIn: '/auth/login',
  },
};

export default NextAuth(authOptions);
