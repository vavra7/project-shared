import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { IncomingHttpHeaders } from 'http';

export function getContextLink(cookie: IncomingHttpHeaders['cookie']): ApolloLink {
  return setContext(() => {
    return {
      headers: {
        cookie
      }
    };
  });
}
