import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { ErrorLink } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { IncomingHttpHeaders } from 'http';
import getConfig from 'next/config';
import { AlertType } from '../graphql/store/types';
import { initialState, resolvers, typeDefs } from '../store';
import alerts from './alerts';

const {
  serverRuntimeConfig: { gqlNetworkUrl },
  publicRuntimeConfig: { gqlPublicUrl }
} = getConfig();

let cookie: IncomingHttpHeaders['cookie'];
let globalApolloClient: ApolloClient<NormalizedCacheObject>;

export function setNetworkCookie(_cookie: IncomingHttpHeaders['cookie']) {
  cookie = _cookie;
}

function initializeApolloClient(): ApolloClient<NormalizedCacheObject> {
  const isServer: boolean = typeof window === 'undefined';

  const contextLink = setContext(() => {
    return {
      headers: {
        cookie
      }
    };
  });

  const httpLink = new HttpLink({
    credentials: 'include',
    uri: isServer ? gqlNetworkUrl : gqlPublicUrl
  });

  const errorLink = new ErrorLink(({ graphQLErrors, networkError, response }) => {
    if (response?.errors?.length) {
      response.errors = [];
    }

    if (graphQLErrors) {
      alerts.add({
        title: graphQLErrors[0].extensions ? graphQLErrors[0].extensions.code : '',
        body: graphQLErrors[0].message,
        icon: 'icon-exclamation-circle',
        type: AlertType.Error
      });
    } else {
      console.error('networkError', networkError);
    }
  });

  const cache = new InMemoryCache();

  return new ApolloClient({
    link: ApolloLink.from([errorLink, contextLink, httpLink]),
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
