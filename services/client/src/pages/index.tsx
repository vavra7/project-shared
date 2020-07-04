import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { NextPage } from 'next';
import { Container } from '../components/common/gridSystem';
import Layout1 from '../components/layouts/layout1';
import { meQuery } from '../graphql/user/query/me';
import Apollo from '../lib/apollo';

interface IndexInitialProps {
  apolloCache: NormalizedCacheObject;
}

const Index: NextPage<IndexInitialProps> = props => {
  return (
    <Layout1>
      <Container>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </Container>
    </Layout1>
  );
};

//#region [Initial]
Index.getInitialProps = async () => {
  const apolloClient = Apollo.getClient();
  const data = await apolloClient.query({ query: meQuery });

  return {
    apolloCache: apolloClient.extract(),
    data
  };
};
//#endregion

export default Index;
