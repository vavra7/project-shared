import {
  AddAlertMutation,
  AddAlertMutationVariables,
  Alert,
  AlertInput,
  HideAlertMutation,
  HideAlertMutationVariables
} from '../graphql/store/modelGenerated';
import { addAlertMutation } from '../graphql/store/mutation/addAlert';
import { hideAlertMutation } from '../graphql/store/mutation/hideAlert';
import Apollo from './apollo';

export default {
  add: async (alertInput: AlertInput): Promise<Alert> => {
    const apolloClient = Apollo.getClient();
    const { data } = await apolloClient.mutate<AddAlertMutation, AddAlertMutationVariables>({
      mutation: addAlertMutation,
      variables: { inputData: alertInput }
    });

    return data!.addAlert!;
  },
  hide: async (id: Alert['id']): Promise<boolean> => {
    const apolloClient = Apollo.getClient();
    const { data } = await apolloClient.mutate<HideAlertMutation, HideAlertMutationVariables>({
      mutation: hideAlertMutation,
      variables: {
        id
      }
    });

    return data!.hideAlert;
  }
};
