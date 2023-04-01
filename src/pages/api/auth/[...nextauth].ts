import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { AuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import GoogleProvider from 'next-auth/providers/google';

import { prisma } from '../../../lib/prisma';

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
    strategy: 'database',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24, // 24 hours
  },
  callbacks: {
    async session({ session, token: _token, user }) {
      const userValue = await prisma.user.findUnique({ where: { id: user.id } });
      const userDataValue = await prisma.userData.findUnique(
        { where: { databaseId: userValue?.userDataId || '' } },
      );
      // NOTE: ここでのパラメーター再割り当ては許容してほしい
      // eslint-disable-next-line no-param-reassign
      session.user.userDataLinked = !!userValue?.userDataId;
      // eslint-disable-next-line no-param-reassign
      session.user.id = userValue?.id ?? '';
      // eslint-disable-next-line no-param-reassign
      session.userData = {
        userId: userDataValue?.userId ?? '',
        name: userDataValue?.name ?? '',
        iconUrl: userDataValue?.iconUrl ?? undefined,
        isDarkTheme: userDataValue?.isDarkTheme ?? false,
      };
      return session;
    },
  },
  useSecureCookies: process.env.NODE_ENV === 'production',
  secret: process.env.NEXTAUTH_SECRET ?? '',
  pages: {
    signIn: '/auth/login',
  },
};

export default NextAuth(authOptions);
