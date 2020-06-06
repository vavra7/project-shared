import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { User } from '../../entity/User';
import bcrypt from 'bcrypt';

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  allUsers(): string {
    return 'hello';
  }

  @Mutation(() => User)
  async register(
    @Arg('email') email: string,
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('password') password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      firstName,
      lastName,
      password: hashedPassword
    }).save();

    return user;
  }
}
