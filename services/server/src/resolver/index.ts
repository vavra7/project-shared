import { BuildSchemaOptions } from 'type-graphql';
import { RegisterResolver } from './user/RegisterResolver';
import { LoginResolver } from './user/LoginResolver';
import { MeResolver } from './user/MeResolver';

export const resolvers: BuildSchemaOptions['resolvers'] = [
  RegisterResolver,
  LoginResolver,
  MeResolver
];
