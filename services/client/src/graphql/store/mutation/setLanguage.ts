import gql from 'graphql-tag';

export const setLanguageMutation = gql`
  mutation SetLanguage($language: LanguageEnum!) {
    setLanguage(language: $language) @client
  }
`;
