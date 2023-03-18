import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_URL || `https://${process.env.VERCEL_URL}`}/api/graphql`,
  cache: new InMemoryCache(),
});

export default apolloClient;
