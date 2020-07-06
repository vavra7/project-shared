import { routes } from '@project-shared/shared';
import { NextPage, NextPageContext } from 'next';
import { AlertTypeEnum } from '../../graphql/store/types';
import { meQuery } from '../../graphql/user/query/me';
import { MeQuery } from '../../graphql/user/types';
import Apollo from '../../lib/apollo';
import { redirectWithAlert } from '../../lib/redirect';
import { trp } from '../../lib/translations';

interface WithAuthProps {
  wrappedInitialProps?: any;
}

export default (Wrapped: NextPage) => {
  const WithAuth: NextPage<WithAuthProps> = ({ wrappedInitialProps }) => {
    return <Wrapped {...wrappedInitialProps} />;
  };

  //#region [Initial]
  WithAuth.getInitialProps = async (ctx: NextPageContext): Promise<{}> => {
    let wrappedInitialProps;
    const apolloClient = Apollo.getClient();
    const { data } = await apolloClient.query<MeQuery>({ query: meQuery });

    if (!data.me) {
      redirectWithAlert(ctx, trp({ tRoutes: routes.login }), {
        title: 'NOT_AUTHENTICATED',
        type: AlertTypeEnum.Info,
        icon: 'icon-user-lock',
        body: 'Please log in.'
      });
    }

    if (Wrapped.getInitialProps) {
      wrappedInitialProps = { ...(await Wrapped.getInitialProps(ctx)) };
    }

    return {
      apolloCache: apolloClient.extract(),
      wrappedInitialProps
    };
  };
  //#endregion

  return WithAuth;
};
