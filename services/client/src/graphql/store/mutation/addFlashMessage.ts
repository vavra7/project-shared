import gql from 'graphql-tag';

export const addFlashMessageMutation = gql`
  mutation AddFlashMessage($body: String!) {
    addFlashMessage(body: $body) @client
  }
`;
