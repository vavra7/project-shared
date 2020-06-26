import gql from 'graphql-tag';

export const flashMessagesQuery = gql`
  query FlashMessages {
    flashMessages {
      id
      body
      display
      timestamp
    }
  }
`;
