import { addAlertMutation } from '../graphql/store/mutation/addAlert';
import {
  AddAlertMutation,
  AddAlertMutationVariables,
  Alert,
  AlertInput
} from '../graphql/store/types';
import { getApolloClient } from './apolloClient';

export default {
  add: async function addAlert(alertInput: AlertInput): Promise<Alert> {
    const apolloClient = getApolloClient();
    const { data } = await apolloClient.mutate<AddAlertMutation, AddAlertMutationVariables>({
      mutation: addAlertMutation,
      variables: { inputData: alertInput }
    });

    return data!.addAlert!;
  }
};
