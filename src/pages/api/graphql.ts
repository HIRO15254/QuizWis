import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

import { Context, createContext } from '../../graphql/context';
import schema from '../../graphql/schema';

const apolloServer = new ApolloServer<Context>({ schema });

export default startServerAndCreateNextHandler(apolloServer, { context: createContext });
