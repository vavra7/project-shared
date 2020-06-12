import { ApolloClient, ApolloClientOptions } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import getConfig from 'next/config';

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

export function getApolloClient(): ApolloClient<NormalizedCacheObject> {
  const isServer: boolean = typeof window === 'undefined';
  const _apolloClient =
    apolloClient ?? initializeApolloClient(isServer ? serverConfig : clientConfig);

  return _apolloClient;
}
