import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { IncomingHttpHeaders } from 'http';
import { resolvers, typeDefs } from '../../store';
import { getContextLink } from './contextLink';
import { getErrorLink } from './errorLink';
import { getHttpLink } from './httpLink';
import { getInMemoryCache } from './inMemoryCache';

const isServer: boolean = typeof window === 'undefined';

class Apollo {
  private static cookie: undefined | IncomingHttpHeaders['cookie'];
  private static client: undefined | ApolloClient<NormalizedCacheObject>;

  public static setCookie(cookie: IncomingHttpHeaders['cookie']): void {
    this.cookie = cookie;
  }

  public static getClient(
    apolloCache?: NormalizedCacheObject
  ): ApolloClient<NormalizedCacheObject> {
    if (!this.client) this.initializeClient();

    if (apolloCache) {
      this.client!.restore(apolloCache);
    }

    return this.client!;
  }

  private static initializeClient(): void {
    const links = [];

    links.push(getErrorLink());
    if (isServer && this.cookie) {
      links.push(getContextLink(this.cookie));
    }
    links.push(getHttpLink());

    this.client = new ApolloClient({
      link: ApolloLink.from(links),
      cache: getInMemoryCache(),
      ssrMode: isServer,
      typeDefs,
      resolvers: resolvers as any
    });
  }
}

export default Apollo;
