import { BuildSchemaOptions } from 'type-graphql';
import { RegisterResolver } from './user/RegisterResolver';
import { LoginResolver } from './user/LoginResolver';
import { MeResolver } from './user/MeResolver';
import { UserResolver } from './user/UserResolver';
import { TestResolver } from './user/test.resolver';

export const resolvers: BuildSchemaOptions['resolvers'] = [
  RegisterResolver,
  LoginResolver,
  MeResolver,
  UserResolver,
  TestResolver
];
