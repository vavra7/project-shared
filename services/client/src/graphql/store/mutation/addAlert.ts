import gql from 'graphql-tag';

export const addAlertMutation = gql`
  mutation AddAlert($inputData: AlertInput!) {
    addAlert(inputData: $inputData) @client {
      id
      title
      body
      icon
      type
      display
      timestamp
    }
  }
`;
