import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { getStore } from '../../lib/store';

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(
    @Arg('token')
    token: string
  ): Promise<boolean> {
    const store = getStore();
    const userId = await store.get(token);

    if (!userId) {
      return false;
    } else {
      User.update({ id: userId }, { confirmed: true }).then(() => {
        store.del(token);
      });

      return true;
    }
  }
}
