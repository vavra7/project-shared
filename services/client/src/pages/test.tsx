import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { NextPage } from 'next';
import { Container } from '../components/common/gridSystem';
import Layout1 from '../components/layouts/layout1';
import { addAlertMutation } from '../graphql/store/mutation/addAlert';
import { hideAlertMutation } from '../graphql/store/mutation/hideAlert';
import { alertsQuery } from '../graphql/store/query/alerts';
import { AlertInput, AlertTypeEnum } from '../graphql/store/types';
import Apollo from '../lib/apollo';

const inputAlert: AlertInput = {
  title: 'Test Alert',
  body: 'Body',
  type: AlertTypeEnum.Success,
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

//#region [Initial]
Test.getInitialProps = async () => {
  const apolloClient = Apollo.getClient();

  await apolloClient.query({
    errorPolicy: 'none',
    query: gql`
      query {
        user(id: "df9b6a39-129d-480d-81f7-ded989fa4eca") {
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
    apolloCache: apolloClient.extract(),
    test: apolloClient.extract()
  };
};
//#endregion

export default Test;
