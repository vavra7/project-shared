import { Request } from 'express';
import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { User } from '../../entity/User';

@Resolver()
export class MeResolver {
  @Authorized()
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: { req: Request }): Promise<User | undefined> {
    if (!req.session!.userId) {
      return;
    } else {
      return User.findOne(req.session!.userId);
    }
  }
}
