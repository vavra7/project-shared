import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { User } from '../../entity/User';

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  allUsers(): string {
    return 'hello';
  }

  @Mutation(() => Number)
  async register(@Arg('firstName') firstName: string): Promise<number> {
    const user = await User.create({
      firstName
    }).save();

    return user.id;
  }
}
