import { BuildSchemaOptions } from 'type-graphql';
import { ConfirmUserResolver } from './user/ConfirmUserResolver';
import { LoginResolver } from './user/LoginResolver';
import { MeResolver } from './user/MeResolver';
import { RegisterResolver } from './user/RegisterResolver';
import { UserResolver } from './user/UserResolver';

export const resolvers: BuildSchemaOptions['resolvers'] = [
  RegisterResolver,
  LoginResolver,
  MeResolver,
  UserResolver,
  ConfirmUserResolver
];
