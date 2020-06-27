import gql from 'graphql-tag';

export const hideAlertMutation = gql`
  mutation HideAlert($id: ID!) {
    hideAlert(id: $id) @client
  }
`;
