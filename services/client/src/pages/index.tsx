import { NextPage } from 'next';
import { add } from '@project-shared/shared';
import { getApolloClient } from '../lib/apolloClient';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { testQuery } from '../graphql/query/user/test';
import Layout1 from '../components/layouts/layout1';
import { Container } from '../components/common/gridSystem';

interface Props {
  initialApolloState: NormalizedCacheObject | string;
}

const Index: NextPage<Props> = props => {
  return (
    <Layout1>
      <Container>
        <pre>{JSON.stringify(props, null, 2)}</pre>
        <div>{add(1, 2, 4)} test</div>
      </Container>
    </Layout1>
  );
};

Index.getInitialProps = async () => {
  const apolloClient = getApolloClient();

  await apolloClient.query({
    query: testQuery
  });

  return { initialApolloState: apolloClient.cache.extract() };
};

export default Index;
