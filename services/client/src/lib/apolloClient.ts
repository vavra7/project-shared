import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { ErrorLink } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import getConfig from 'next/config';
import { useMemo } from 'react';
import { initialState, resolvers, typeDefs } from '../store';

const {
  serverRuntimeConfig: { gqlNetworkUrl },
  publicRuntimeConfig: { gqlPublicUrl }
} = getConfig();

let globalApolloClient: ApolloClient<NormalizedCacheObject>;

function initializeApolloClient(): ApolloClient<NormalizedCacheObject> {
  const isServer: boolean = typeof window === 'undefined';

  const httpLink = new HttpLink({
    credentials: 'include',
    uri: isServer ? gqlNetworkUrl : gqlPublicUrl
  });

  const errorLink = new ErrorLink(({ graphQLErrors, networkError }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  });

  const cache = new InMemoryCache();

  return new ApolloClient({
    link: ApolloLink.from([errorLink, httpLink]),
    cache,
    ssrMode: isServer,
    typeDefs,
    resolvers: resolvers as any
  });
}

export function getApolloClient(
  pageInitialState?: NormalizedCacheObject
): ApolloClient<NormalizedCacheObject> {
  const isServer: boolean = typeof window === 'undefined';

  if (isServer) {
    const apolloClient = initializeApolloClient();
    apolloClient.cache.writeData({
      data: initialState
    });

    return apolloClient;
  } else {
    if (!globalApolloClient) {
      globalApolloClient = initializeApolloClient();

      if (pageInitialState) {
        globalApolloClient.cache.restore(pageInitialState);
      }

      globalApolloClient.cache.writeData({
        data: initialState
      });
    }

    return globalApolloClient;
  }
}

export function useApollo(
  pageInitialState?: NormalizedCacheObject
): ApolloClient<NormalizedCacheObject> {
  const contextClient = useMemo(() => getApolloClient(pageInitialState), [pageInitialState]);

  return contextClient;
}
