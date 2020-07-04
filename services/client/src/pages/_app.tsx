import { ApolloProvider } from '@apollo/react-hooks';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import App, { AppInitialProps } from 'next/app';
import Head from 'next/head';
import { ReactElement } from 'react';
import GlobalAlerts from '../components/common/alerts/GlobalAlerts';
import '../fonts/fonts.scss';
import { AlertInput } from '../graphql/store/types';
import alerts from '../lib/alerts';
import Apollo from '../lib/apollo';
import '../styles/styles.scss';

interface ProjectSharedAppProps extends AppInitialProps {
  alert?: AlertInput;
}

const isServer: boolean = typeof window === 'undefined';

class ProjectSharedApp extends App<ProjectSharedAppProps> {
  //#region [Initial]
  static async getInitialProps(context: any): Promise<ProjectSharedAppProps> {
    let alert;

    if (isServer) {
      const { query } = context.ctx;

      if (query.alert) {
        alert = JSON.parse(query.alert);
      }

      Apollo.setCookie(context.ctx.req?.headers?.cookie);
    }

    const appProps = await App.getInitialProps(context);

    return { ...appProps, alert };
  }
  //#endregion

  private apolloClient: ApolloClient<NormalizedCacheObject>;

  constructor(props: ProjectSharedAppProps) {
    super(props as any);

    this.apolloClient = Apollo.getClient(props.pageProps.apolloCache);
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
