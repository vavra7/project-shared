import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import moment from 'moment';
import { alertsQuery } from '../graphql/store/query/alerts';
import { Alert, AlertsQuery, MutationResolvers, Query } from '../graphql/store/types';

export const resolvers = {
  Mutation: {
    addAlert: (parent, { inputData }, { cache }: { cache: InMemoryCache }) => {
      const result = cache.readQuery<AlertsQuery>({ query: alertsQuery });
      const { alerts } = result!;

      const getId = (alerts: Query['alerts']) => {
        if (alerts.length) {
          return alerts[0]!.id + 1;
        } else {
          return 0;
        }
      };

      const newAlert: Alert = {
        __typename: 'Alert',
        id: getId(alerts) as string,
        ...inputData,
        display: true,
        timestamp: moment().toISOString()
      };

      const data = {
        alerts: [newAlert, ...alerts]
      };

      cache.writeData({ data });

      return newAlert;
    },
    hideAlert: (
      parent,
      { id },
      { cache, getCacheKey }: { cache: InMemoryCache; getCacheKey: any }
    ) => {
      const cacheId = getCacheKey({ __typename: 'Alert', id });
      const fragment = gql`
        fragment displayAlert on Alert {
          display
        }
      `;

      cache.writeFragment({
        fragment,
        id: cacheId,
        data: {
          __typename: 'Alert',
          display: false
        }
      });

      return true;
    }
  }
} as {
  Mutation: MutationResolvers;
};
