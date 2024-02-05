import { ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

import { getBearerToken } from './bearerToken';

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
});

const wsLink = new GraphQLWsLink(
  createClient({ url: `${process.env.NEXT_PUBLIC_API_URL_WS}/subscription` }),
);

const authLink = setContext((_, { headers }) => {
  const bearerToken = getBearerToken();

  return {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      authorization: bearerToken ? `Bearer ${bearerToken} siwe` : undefined,
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
