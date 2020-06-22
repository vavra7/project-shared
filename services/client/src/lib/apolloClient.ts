import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { ErrorLink } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import getConfig from 'next/config';
import { useMemo } from 'react';

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

  return new ApolloClient({
    link: ApolloLink.from([errorLink, httpLink]),
    cache: new InMemoryCache(),
    ssrMode: isServer
  });
}

/**
 * Checks if exists Apollo client otherwise initialize it.
 * Also restore initial cache from SSR
 */
export function getApolloClient(
  initialState?: NormalizedCacheObject
): ApolloClient<NormalizedCacheObject> {
  const isServer: boolean = typeof window === 'undefined';

  if (isServer) {
    return initializeApolloClient();
  } else {
    globalApolloClient = globalApolloClient || initializeApolloClient();

    if (initialState) globalApolloClient.cache.restore(initialState);

    return globalApolloClient;
  }
}

/**
 * Wraps getApolloClient function in useMemo for use in
 * custom app file like context.
 */
export function useApollo(
  initialState?: NormalizedCacheObject
): ApolloClient<NormalizedCacheObject> {
  const contextClient = useMemo(() => getApolloClient(initialState), [initialState]);

  return contextClient;
}
