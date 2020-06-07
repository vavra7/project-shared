import { Resolver, Query, Ctx } from 'type-graphql';
import { User } from '../../entity/User';
import { Request } from 'express';

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: { req: Request }): Promise<User | null | undefined> {
    if (!req.session!.userId) {
      return null;
    } else {
      return User.findOne(req.session!.userId);
    }
  }
}
