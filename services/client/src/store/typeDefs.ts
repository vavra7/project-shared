import gql from 'graphql-tag';

export const typeDefs = gql`
  enum AlertTypeEnum {
    ERROR
    SUCCESS
    INFO
  }

  enum LanguageEnum {
    cs
    en
  }

  input AlertInput {
    title: String!
    body: String
    icon: String
    type: AlertTypeEnum!
  }

  type Alert {
    id: ID!
    title: String!
    body: String
    icon: String
    type: AlertTypeEnum!
    display: Boolean!
    timestamp: String!
  }

  type Query {
    alerts: [Alert]!
    language: LanguageEnum!
  }

  type Mutation {
    addAlert(inputData: AlertInput!): Alert
    hideAlert(id: ID!): Boolean!
    setLanguage(language: LanguageEnum!): Boolean!
  }
`;
