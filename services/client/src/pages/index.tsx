import { NextPage } from 'next';
import { add } from '@project-shared/shared';
import { getApolloClient } from '../lib/apolloClient';
import Link from 'next/link';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { testQuery } from '../graphql/query/user/test';

interface Props {
  initialApolloState: NormalizedCacheObject | string;
}

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
    query: testQuery
  });

  return { initialApolloState: apolloClient.cache.extract() };
};

export default index;
