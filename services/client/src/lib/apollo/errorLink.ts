import { ErrorLink } from 'apollo-link-error';
import { AlertTypeEnum } from '../../graphql/store/types';
import alerts from '../alerts';

export function getErrorLink(): ErrorLink {
  return new ErrorLink(({ graphQLErrors, networkError, response }) => {
    if (response?.errors?.length) {
      response.errors = [];
    }

    if (graphQLErrors) {
      alerts.add({
        title: graphQLErrors[0].extensions ? graphQLErrors[0].extensions.code : '',
        body: graphQLErrors[0].message,
        icon: 'icon-exclamation-circle',
        type: AlertTypeEnum.Error
      });
    } else {
      console.error('networkError', networkError);
    }
  });
}
