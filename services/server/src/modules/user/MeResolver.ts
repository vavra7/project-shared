import { Resolver, Query, Ctx, Authorized } from 'type-graphql';
import { User } from '../../entity/User';
import { Request } from 'express';

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
