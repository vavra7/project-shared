import { InMemoryCache } from 'apollo-cache-inmemory';
import moment from 'moment';
import { flashMessagesQuery } from '../graphql/store/query/flashMessages';
import { FlashMessage, FlashMessagesQuery, MutationResolvers, Query } from '../graphql/store/types';

export const resolvers = {
  Mutation: {
    addFlashMessage: (parent, { body }, { cache }: { cache: InMemoryCache }) => {
      const result = cache.readQuery<FlashMessagesQuery>({ query: flashMessagesQuery });
      const { flashMessages } = result!;

      const getId = (flashMessages: Query['flashMessages']) => {
        if (flashMessages.length) {
          return flashMessages[0]!.id + 1;
        } else {
          return 0;
        }
      };

      const newFlashMessage: FlashMessage = {
        __typename: 'FlashMessage',
        id: getId(flashMessages) as string,
        body,
        display: true,
        timestamp: moment().toISOString()
      };

      const data = {
        flashMessages: [newFlashMessage, ...flashMessages]
      };

      cache.writeData({ data });

      return true;
    }
  }
} as {
  Mutation: MutationResolvers;
};
