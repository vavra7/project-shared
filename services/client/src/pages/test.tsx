import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { NextPage } from 'next';
import { Container } from '../components/common/gridSystem';
import Layout1 from '../components/layouts/layout1';
import { addFlashMessageMutation } from '../graphql/store/mutation/addFlashMessage';
import { flashMessagesQuery } from '../graphql/store/query/flashMessages';
import { getApolloClient } from '../lib/apolloClient';

const Test: NextPage = props => {
  const { data: sedData } = useQuery(flashMessagesQuery);
  const [addFlashMessage, { data: addData }] = useMutation(addFlashMessageMutation);

  return (
    <Layout1>
      <Container>
        <h1>test page</h1>
        <button onClick={() => addFlashMessage({ variables: { body: 'ahoj' } })} type="button">
          add flash message
        </button>
        <pre>{JSON.stringify(addData, null, 4)}</pre>
        <pre>{JSON.stringify(sedData, null, 4)}</pre>
        <pre>{JSON.stringify(props, null, 4)}</pre>
      </Container>
    </Layout1>
  );
};

Test.getInitialProps = async () => {
  const apolloClient = getApolloClient();

  await apolloClient.query({
    query: gql`
      query {
        user(id: "1d1aeea4-a81f-490c-bab5-d66808c4289e") {
          id
          email
          firstName
          lastName
          createdAt
          updatedAt
        }
      }
    `
  });

  return {
    pageInitialState: apolloClient.extract()
  };
};

export default Test;
