import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '../pages/api/auth/[...nextauth]';

export const createContext = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  const currentUserData = await prisma.userData.findUnique({
    where: {
      userId: session?.userId ?? '',
    },
  });
  return {
    currentUserData,
  };
};
