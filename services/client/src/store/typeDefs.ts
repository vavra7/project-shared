import gql from 'graphql-tag';

export const typeDefs = gql`
  type FlashMessage {
    id: ID!
    body: String!
    display: Boolean!
    timestamp: String
  }

  type Query {
    flashMessages: [FlashMessage]!
  }

  type Mutation {
    addFlashMessage(body: String!): Boolean
  }
`;
