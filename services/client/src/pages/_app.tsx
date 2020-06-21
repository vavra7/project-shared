import { ApolloProvider } from '@apollo/react-hooks';
import { AppProps } from 'next/app';
import { ReactElement } from 'react';
import '../fonts/fonts.scss';
import { useApollo } from '../lib/apolloClient';
import '../styles/styles.scss';

function Client({ Component, pageProps }: AppProps): ReactElement {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default Client;
