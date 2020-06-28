import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { NextPage } from 'next';
import { Container } from '../components/common/gridSystem';
import Layout1 from '../components/layouts/layout1';
import { addAlertMutation } from '../graphql/store/mutation/addAlert';
import { hideAlertMutation } from '../graphql/store/mutation/hideAlert';
import { alertsQuery } from '../graphql/store/query/alerts';
import { AlertInput, AlertType } from '../graphql/store/types';
import { getApolloClient } from '../lib/apolloClient';

const inputAlert: AlertInput = {
  title: 'Title ds fds dsf asdf s',
  body: 'Body',
  type: AlertType.Success,
  icon: 'icon-home'
};

const Test: NextPage = props => {
  const { data: sedData } = useQuery(alertsQuery);
  const [addAlert, { data: addData }] = useMutation(addAlertMutation);
  const [hideAlert] = useMutation(hideAlertMutation);

  return (
    <Layout1>
      <Container>
        <h1>test page</h1>
        <button onClick={() => addAlert({ variables: { inputData: inputAlert } })} type="button">
          add alert
        </button>

        <button onClick={() => hideAlert({ variables: { id: 1 } })} type="button">
          hide alert
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
    errorPolicy: 'none',
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
