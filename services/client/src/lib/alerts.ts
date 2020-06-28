import { addAlertMutation } from '../graphql/store/mutation/addAlert';
import { hideAlertMutation } from '../graphql/store/mutation/hideAlert';
import {
  AddAlertMutation,
  AddAlertMutationVariables,
  Alert,
  AlertInput,
  HideAlertMutation,
  HideAlertMutationVariables
} from '../graphql/store/types';
import { getApolloClient } from './apolloClient';

export default {
  add: async (alertInput: AlertInput): Promise<Alert> => {
    const apolloClient = getApolloClient();
    const { data } = await apolloClient.mutate<AddAlertMutation, AddAlertMutationVariables>({
      mutation: addAlertMutation,
      variables: { inputData: alertInput }
    });

    return data!.addAlert!;
  },
  hide: async (id: Alert['id']): Promise<boolean> => {
    console.log(id);
    const apolloClient = getApolloClient();
    const { data } = await apolloClient.mutate<HideAlertMutation, HideAlertMutationVariables>({
      mutation: hideAlertMutation,
      variables: {
        id
      }
    });

    return data!.hideAlert;
  }
};
