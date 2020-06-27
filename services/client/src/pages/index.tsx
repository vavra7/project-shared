import { useQuery } from '@apollo/react-hooks';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { NextPage } from 'next';
import { Container } from '../components/common/gridSystem';
import Layout1 from '../components/layouts/layout1';
import { getApolloClient } from '../lib/apolloClient';

interface IndexInitialProps {
  apolloCache: NormalizedCacheObject;
}

const query = gql`
  query {
    user(id: "1d1aeea4-a81f-490c-bab5-d66808c4289ee") {
      id
      email
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
`;

const Index: NextPage<IndexInitialProps> = props => {
  const { data } = useQuery(query);

  return (
    <Layout1>
      <Container>
        <pre>{JSON.stringify(data, null, 2)}</pre>
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
