import { routes } from '@project-shared/shared';
import { NextPage, NextPageContext } from 'next';
import { AlertType } from '../../graphql/store/types';
import { meQuery } from '../../graphql/user/query/me';
import { MeQuery } from '../../graphql/user/types';
import { getApolloClient } from '../../lib/apolloClient';
import { redirectWithAlert } from '../../lib/redirect';

const withAuth = (WrappedComponent: NextPage) => {
  const WithAuth: NextPage = () => {
    return <WrappedComponent />;
  };

  WithAuth.getInitialProps = async (ctx: NextPageContext): Promise<{}> => {
    const apolloClient = getApolloClient();
    const { data } = await apolloClient.query<MeQuery>({ query: meQuery });

    if (!data.me) {
      redirectWithAlert(ctx, routes.login(), {
        title: 'NOT_AUTHENTICATED',
        type: AlertType.Info,
        icon: 'icon-user-lock',
        body: 'Please log in.'
      });
    }

    return {};
  };

  return WithAuth;
};

export default withAuth;
