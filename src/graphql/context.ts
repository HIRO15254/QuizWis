import { ContextFunction } from '@apollo/server';
import { PrismaClient, User, UserData } from '@prisma/client';
import { NextApiHandler } from 'next';
import { getSession } from 'next-auth/react';

import { prisma } from '../lib/prisma';

export type Context = {
  prisma: PrismaClient
  currentUser: User | null
  currentUserData: UserData | null
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
        userId: currentUser.id,
      },
    })
    : null;

  return {
    prisma,
    currentUser,
    currentUserData,
  };
};
