import gql from 'graphql-tag';

export const alertsQuery = gql`
  query Alerts {
    alerts {
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
