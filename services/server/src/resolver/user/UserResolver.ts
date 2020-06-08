import { Resolver, Query } from 'type-graphql';
import { User } from '../../entity/User';

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(): Promise<User | undefined> {
    return User.findOne();
  }
}
