import gql from 'graphql-tag';

export const meQuery = gql`
  query Me {
    me {
      id
      email
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
`;
