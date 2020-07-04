import gql from 'graphql-tag';
import { NextPage } from 'next';
import withAuth from '../components/hoc/withAuth';
import Layout1 from '../components/layouts/layout1';
import Apollo from '../lib/apollo';

const DUMMY_GQL = gql`
  query($id: String!) {
    user(id: $id) {
      id
      email
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
`;

const Profile: NextPage = props => {
  return (
    <Layout1>
      <div>Profile</div>
      <pre>{JSON.stringify(props, null, 4)}</pre>
    </Layout1>
  );
};

//#region [Initial]
Profile.getInitialProps = async () => {
  const apolloClient = Apollo.getClient();

  const { data } = await apolloClient.query({
    query: DUMMY_GQL,
    variables: { id: '1d1aeea4-a81f-490c-bab5-d66808c4289e' }
  });

  return {
    apolloCache: apolloClient.extract(),
    data
  };
};
//#endregion

export default withAuth(Profile);
