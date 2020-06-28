import * as ApolloReactCommon from '@apollo/react-common';
import { GraphQLResolveInfo } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum AlertType {
  Error = 'ERROR',
  Success = 'SUCCESS',
  Info = 'INFO'
}

export type AlertInput = {
  title: Scalars['String'];
  body?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  type: AlertType;
};

export type Alert = {
  __typename?: 'Alert';
  id: Scalars['ID'];
  title: Scalars['String'];
  body?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  type: AlertType;
  display: Scalars['Boolean'];
  timestamp: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  alerts: Array<Maybe<Alert>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAlert?: Maybe<Alert>;
  hideAlert: Scalars['Boolean'];
};

export type MutationAddAlertArgs = {
  inputData: AlertInput;
};

export type MutationHideAlertArgs = {
  id: Scalars['ID'];
};

export type AddAlertMutationVariables = Exact<{
  inputData: AlertInput;
}>;

export type AddAlertMutation = { __typename?: 'Mutation' } & {
  addAlert?: Maybe<
    { __typename?: 'Alert' } & Pick<
      Alert,
      'id' | 'title' | 'body' | 'icon' | 'type' | 'display' | 'timestamp'
    >
  >;
};

export type HideAlertMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type HideAlertMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'hideAlert'>;

export type AlertsQueryVariables = Exact<{ [key: string]: never }>;

export type AlertsQuery = { __typename?: 'Query' } & {
  alerts: Array<
    Maybe<
      { __typename?: 'Alert' } & Pick<
        Alert,
        'id' | 'title' | 'body' | 'icon' | 'type' | 'display' | 'timestamp'
      >
    >
  >;
};

export const AddAlertDocument = gql`
  mutation AddAlert($inputData: AlertInput!) {
    addAlert(inputData: $inputData) @client {
      id
      title
      body
      icon
      type
      display
      timestamp
    }
  }
`;
export type AddAlertMutationFn = ApolloReactCommon.MutationFunction<
  AddAlertMutation,
  AddAlertMutationVariables
>;
export type AddAlertMutationResult = ApolloReactCommon.MutationResult<AddAlertMutation>;
export type AddAlertMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddAlertMutation,
  AddAlertMutationVariables
>;
export const HideAlertDocument = gql`
  mutation HideAlert($id: ID!) {
    hideAlert(id: $id) @client
  }
`;
export type HideAlertMutationFn = ApolloReactCommon.MutationFunction<
  HideAlertMutation,
  HideAlertMutationVariables
>;
export type HideAlertMutationResult = ApolloReactCommon.MutationResult<HideAlertMutation>;
export type HideAlertMutationOptions = ApolloReactCommon.BaseMutationOptions<
  HideAlertMutation,
  HideAlertMutationVariables
>;
export const AlertsDocument = gql`
  query Alerts {
    alerts {
      id
      title
      body
      icon
      type
      display
      timestamp
    }
  }
`;
export type AlertsQueryResult = ApolloReactCommon.QueryResult<AlertsQuery, AlertsQueryVariables>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AlertType: AlertType;
  AlertInput: AlertInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  Alert: ResolverTypeWrapper<Alert>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AlertInput: AlertInput;
  String: Scalars['String'];
  Alert: Alert;
  ID: Scalars['ID'];
  Boolean: Scalars['Boolean'];
  Query: {};
  Mutation: {};
};

export type AlertResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Alert'] = ResolversParentTypes['Alert']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['AlertType'], ParentType, ContextType>;
  display?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  alerts?: Resolver<Array<Maybe<ResolversTypes['Alert']>>, ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  addAlert?: Resolver<
    Maybe<ResolversTypes['Alert']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddAlertArgs, 'inputData'>
  >;
  hideAlert?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationHideAlertArgs, 'id'>
  >;
};

export type Resolvers<ContextType = any> = {
  Alert?: AlertResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
