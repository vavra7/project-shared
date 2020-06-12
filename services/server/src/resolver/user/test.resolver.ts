import { User } from '../../entity/User';
import { Resolver, Query } from 'type-graphql';

@Resolver()
export class TestResolver {
  @Query(() => User)
  async test(): Promise<User | undefined> {
    return User.findOne();
  }
}
