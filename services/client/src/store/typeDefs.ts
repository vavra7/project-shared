import gql from 'graphql-tag';

export const typeDefs = gql`
  enum AlertType {
    ERROR
    SUCCESS
    INFO
  }

  input AlertInput {
    title: String!
    body: String
    icon: String
    type: AlertType!
  }

  type Alert {
    id: ID!
    title: String!
    body: String
    icon: String
    type: AlertType!
    display: Boolean!
    timestamp: String!
  }

  type Query {
    alerts: [Alert]!
  }

  type Mutation {
    addAlert(inputData: AlertInput!): Alert
  }

  type Mutation {
    hideAlert(id: ID!): Boolean!
  }
`;
