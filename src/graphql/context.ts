import { ContextFunction } from '@apollo/server';
import { PrismaClient, User, UserData } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextApiHandler } from 'next';
import { getSession } from 'next-auth/react';

import { prisma } from '../lib/prisma';

export type Context = {
  prisma: PrismaClient
  currentUser: User | null
  currentUserData: UserData | null
  hash: (text: string) => Promise<string>
};

type CreateContextType = ContextFunction<Parameters<NextApiHandler>, Context>;

/**
 * GraphQLのクエリに渡されるcontext
 */
export const createContext: CreateContextType = async (req) => {
  const session = await getSession({
    req,
  });

  const currentUserEmail = session?.user?.email;
  const currentUser = currentUserEmail
    ? await prisma.user.findUnique({
      where: {
        email: currentUserEmail,
      },
    })
    : null;
  const currentUserData = currentUser
    ? await prisma.userData.findUnique({
      where: {
        databaseId: currentUser.userDataId || '',
      },
    })
    : null;
  const saltRounds = 10;
  const hash = async (text: string) => bcrypt.hash(text, saltRounds);

  return {
    prisma,
    currentUser,
    currentUserData,
    hash,
  };
};
