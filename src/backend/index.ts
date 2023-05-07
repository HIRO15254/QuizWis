import { createYoga } from 'graphql-yoga';

import { createContext } from './context';
import { schema } from './schema';

import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

export const server = createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  graphqlEndpoint: '/api/graphql',
  schema,
  context: async ({ req, res }) => createContext(req, res),
});
