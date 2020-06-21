import { Arg, Query, Resolver } from 'type-graphql';
import { User } from '../../entity/User';

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(@Arg('id') id: number): Promise<User | undefined> {
    return User.findOne(id);
  }
}
