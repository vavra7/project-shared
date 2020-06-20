import bcrypt from 'bcrypt';
import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { User } from '../../entity/User';
import { Request } from 'express';

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { req }: { req: Request }
  ): Promise<User | undefined> {
    const user = await User.findOne({ where: { email } });

    if (!user || !user.confirmed) {
      return;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return;
    }

    req.session!.userId = user.id;

    return user;
  }
}
