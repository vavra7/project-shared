import { NextPage } from 'next';
import { add } from '@project-shared/shared';
import { getApolloClient } from '../lib/apolloClient';
import Link from 'next/link';
import gql from 'graphql-tag';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

interface Props {
  test: NormalizedCacheObject | string;
}

const TEST_QUERY = gql`
  query {
    test {
      id
      email
      lastName
    }
  }
`;

const index: NextPage<Props> = props => {
  return (
    <div>
      <Link href="/test">
        <a>test</a>
      </Link>
      <pre>{JSON.stringify(props, null, 2)}</pre>
      <div>{add(1, 2, 4)} test</div>
    </div>
  );
};

index.getInitialProps = async () => {
  const apolloClient = getApolloClient();

  await apolloClient.query({
    query: TEST_QUERY
  });

  return { test: apolloClient.cache.extract() };

  // return { test: 'apolloClient.cache.extract()' };
};

export default index;
