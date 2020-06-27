import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { ErrorLink } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import getConfig from 'next/config';
import { useMemo } from 'react';
import { AlertType } from '../graphql/store/types';
import { initialState, resolvers, typeDefs } from '../store';
import alerts from './alerts';

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
    if (graphQLErrors) {
      alerts.add({
        title: graphQLErrors[0].extensions ? graphQLErrors[0].extensions.code : '',
        body: graphQLErrors[0].message,
        icon: 'icon-home',
        type: AlertType.Error
      });
    } else {
      console.error('networkError', networkError);
    }
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
