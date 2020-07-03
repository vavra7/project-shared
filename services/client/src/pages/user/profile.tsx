import { useQuery } from '@apollo/react-hooks';
import { FC } from 'react';
import withAuth from '../../components/hoc/withAuth';
import Layout1 from '../../components/layouts/layout1';
import { meQuery } from '../../graphql/user/query/me';
import { MeQuery } from '../../graphql/user/types';

const Profile: FC = () => {
  const { data } = useQuery<MeQuery>(meQuery);

  return (
    <Layout1>
      <div>Profile</div>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </Layout1>
  );
};

export default withAuth(Profile);
