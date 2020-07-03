import { ApolloProvider } from '@apollo/react-hooks';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { IncomingHttpHeaders } from 'http';
import App, { AppInitialProps } from 'next/app';
import Head from 'next/head';
import { ReactElement } from 'react';
import GlobalAlerts from '../components/common/alerts/GlobalAlerts';
import '../fonts/fonts.scss';
import { AlertInput } from '../graphql/store/types';
import alerts from '../lib/alerts';
import { getApolloClient, setNetworkCookie } from '../lib/apolloClient';
import '../styles/styles.scss';

interface ProjectSharedAppProps extends AppInitialProps {
  alert?: AlertInput;
  cookie?: IncomingHttpHeaders['cookie'];
}

const isServer: boolean = typeof window === 'undefined';

class ProjectSharedApp extends App<ProjectSharedAppProps> {
  static async getInitialProps(context: any): Promise<ProjectSharedAppProps> {
    let alert;
    let cookie;

    if (isServer) {
      const { query } = context.ctx;

      if (query.alert) {
        alert = JSON.parse(query.alert);
      }

      cookie = context.ctx.req?.headers?.cookie;
    }
    setNetworkCookie(cookie);
    const appProps = await App.getInitialProps(context);

    return { ...appProps, alert, cookie };
  }

  private apolloClient: ApolloClient<NormalizedCacheObject>;

  constructor(props: ProjectSharedAppProps) {
    super(props as any);

    this.apolloClient = getApolloClient(props.pageProps.apolloCache);
  }

  componentDidMount(): void {
    if (this.props.alert) {
      alerts.add(this.props.alert);
    }
  }

  render(): ReactElement {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        </Head>

        <ApolloProvider client={this.apolloClient}>
          <GlobalAlerts />

          <Component {...pageProps} />
        </ApolloProvider>
      </>
    );
  }
}

export default ProjectSharedApp;
