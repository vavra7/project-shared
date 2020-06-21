import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { NextPage } from 'next';
import { Container } from '../components/common/gridSystem';
import Layout1 from '../components/layouts/layout1';
import { getApolloClient } from '../lib/apolloClient';

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

Index.getInitialProps = () => {
  const apolloClient = getApolloClient();

  return {
    apolloCache: apolloClient.extract()
  };
};

export default Index;
