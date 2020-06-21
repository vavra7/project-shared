import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient, ApolloClientOptions } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import getConfig from 'next/config';
import { useMemo } from 'react';

const {
  serverRuntimeConfig: { gqlNetworkUrl },
  publicRuntimeConfig: { gqlPublicUrl }
} = getConfig();

let apolloClient: ApolloClient<NormalizedCacheObject>;

const serverConfig: ApolloClientOptions<NormalizedCacheObject> = {
  link: new HttpLink({
    uri: gqlNetworkUrl
  }),
  cache: new InMemoryCache(),
  ssrMode: true
};

const clientConfig: ApolloClientOptions<NormalizedCacheObject> = {
  link: new HttpLink({
    uri: gqlPublicUrl
  }),
  cache: new InMemoryCache(),
  ssrMode: false
};

function initializeApolloClient(
  config: ApolloClientOptions<NormalizedCacheObject>
): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient(config);
}

/**
 * Checks if exists Apollo client otherwise initialize it.
 * Also restore initial cache from SSR
 */
export function getApolloClient(
  initialState?: NormalizedCacheObject
): ApolloClient<NormalizedCacheObject> {
  const isServer: boolean = typeof window === 'undefined';

  const _apolloClient =
    apolloClient ?? initializeApolloClient(isServer ? serverConfig : clientConfig);

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  return _apolloClient;
}

/**
 * Wraps get client function in useMemo for use in
 * custom app file like context.
 */
export function useApollo(
  initialState?: NormalizedCacheObject
): ApolloClient<NormalizedCacheObject> {
  const contextClient = useMemo(() => getApolloClient(initialState), [initialState]);

  return contextClient;
}
