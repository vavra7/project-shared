import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { User } from '../../entity/User';
import { RegisterInput } from './register/RegisterInput';
import bcrypt from 'bcrypt';

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  allUsers(): string {
    return 'hello';
  }

  @Mutation(() => User)
  async register(
    @Arg('data') { email, firstName, lastName, password }: RegisterInput
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
