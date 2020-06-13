import gql from 'graphql-tag';

export const testQuery = gql`
  query Test {
    test {
      id
      email
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
`;
