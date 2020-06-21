import bcrypt from 'bcrypt';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { RegisterInput } from './register/RegisterInput';
import { setUpConfirmation } from './register/setUpConfirmation';

@Resolver()
export class RegisterResolver {
  @Mutation(() => User)
  async register(
    @Arg('data') { email, firstName, lastName, password }: RegisterInput
  ): Promise<User> {
    let user: User | undefined;

    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      user = await User.create({
        email,
        firstName,
        lastName,
        password: hashedPassword
      }).save();

      return user;
    } catch {
      user = await User.findOne({ where: { email } });

      if (user && !user.confirmed) {
        user.firstName = firstName;
        user.lastName = lastName;
        user.password = hashedPassword;

        user = await User.save(user);
      }

      return user!;
    } finally {
      setUpConfirmation(user!);
    }
  }
}
