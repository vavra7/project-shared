import { HttpLink } from 'apollo-link-http';
import getConfig from 'next/config';

const {
  serverRuntimeConfig: { gqlNetworkUrl },
  publicRuntimeConfig: { gqlPublicUrl }
} = getConfig();

const isServer: boolean = typeof window === 'undefined';

export function getHttpLink(): HttpLink {
  return new HttpLink({
    credentials: 'include',
    uri: isServer ? gqlNetworkUrl : gqlPublicUrl
  });
}
