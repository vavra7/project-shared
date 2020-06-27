import gql from 'graphql-tag';

export const registerMutation = gql`
  mutation Register($inputData: RegisterInput!) {
    register(inputData: $inputData) {
      id
      email
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
`;
