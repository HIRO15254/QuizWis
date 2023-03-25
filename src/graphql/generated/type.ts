import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type CreateUserDataInput = {
  authUserId: Scalars['ID'];
  bio?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  userId: Scalars['String'];
};

export type GetUserDataInput = {
  userId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUserData?: Maybe<UserData>;
  updateUserData?: Maybe<UserData>;
};


export type MutationCreateUserDataArgs = {
  input: CreateUserDataInput;
};


export type MutationUpdateUserDataArgs = {
  input: UpdateUserDataInput;
};

export type Node = {
  id?: Maybe<Scalars['ID']>;
};

export type Query = {
  __typename?: 'Query';
  getUserData?: Maybe<UserData>;
  me?: Maybe<UserData>;
  node?: Maybe<Node>;
};


export type QueryGetUserDataArgs = {
  input: GetUserDataInput;
};


export type QueryNodeArgs = {
  id: Scalars['String'];
};

export type UpdateUserDataInput = {
  bio?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  iconUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  newUserId?: InputMaybe<Scalars['String']>;
  userId: Scalars['String'];
};

/** ユーザーの情報（実際に取得・変更する用） */
export type UserData = Node & {
  __typename?: 'UserData';
  /** 各ユーザーのプロフィールページの内容 */
  bio?: Maybe<Scalars['String']>;
  /** データベース上のID。基本使わない。 */
  databaseId: Scalars['ID'];
  /** 各ユーザーemailアドレス */
  email?: Maybe<Scalars['String']>;
  /** ユーザーのアイコン画像のURL */
  iconUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Admin権限の有無\nクライアント側からの変更禁止 */
  isAdmin: Scalars['Boolean'];
  /** 各ユーザーの表示名 */
  name: Scalars['String'];
  /** 各ユーザーが任意につけられるかつUniqueなID */
  userId: Scalars['String'];
};

export type CheckUserIdQueryVariables = Exact<{
  input: GetUserDataInput;
}>;


export type CheckUserIdQuery = { __typename?: 'Query', getUserData?: { __typename?: 'UserData', userId: string } | null };

export type CreateUserDataMutationVariables = Exact<{
  input: CreateUserDataInput;
}>;


export type CreateUserDataMutation = { __typename?: 'Mutation', createUserData?: { __typename?: 'UserData', userId: string } | null };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me?: { __typename?: 'UserData', userId: string, name: string, bio?: string | null, email?: string | null, isAdmin: boolean, iconUrl?: string | null } | null };

export type UpdateUserDataMutationVariables = Exact<{
  input: UpdateUserDataInput;
}>;


export type UpdateUserDataMutation = { __typename?: 'Mutation', updateUserData?: { __typename?: 'UserData', userId: string, email?: string | null, name: string, bio?: string | null, iconUrl?: string | null } | null };


export const CheckUserIdDocument = gql`
    query checkUserId($input: GetUserDataInput!) {
  getUserData(input: $input) {
    userId
  }
}
    `;

/**
 * __useCheckUserIdQuery__
 *
 * To run a query within a React component, call `useCheckUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckUserIdQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCheckUserIdQuery(baseOptions: Apollo.QueryHookOptions<CheckUserIdQuery, CheckUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckUserIdQuery, CheckUserIdQueryVariables>(CheckUserIdDocument, options);
      }
export function useCheckUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckUserIdQuery, CheckUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckUserIdQuery, CheckUserIdQueryVariables>(CheckUserIdDocument, options);
        }
export type CheckUserIdQueryHookResult = ReturnType<typeof useCheckUserIdQuery>;
export type CheckUserIdLazyQueryHookResult = ReturnType<typeof useCheckUserIdLazyQuery>;
export type CheckUserIdQueryResult = Apollo.QueryResult<CheckUserIdQuery, CheckUserIdQueryVariables>;
export const CreateUserDataDocument = gql`
    mutation CreateUserData($input: CreateUserDataInput!) {
  createUserData(input: $input) {
    userId
  }
}
    `;
export type CreateUserDataMutationFn = Apollo.MutationFunction<CreateUserDataMutation, CreateUserDataMutationVariables>;

/**
 * __useCreateUserDataMutation__
 *
 * To run a mutation, you first call `useCreateUserDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserDataMutation, { data, loading, error }] = useCreateUserDataMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserDataMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserDataMutation, CreateUserDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserDataMutation, CreateUserDataMutationVariables>(CreateUserDataDocument, options);
      }
export type CreateUserDataMutationHookResult = ReturnType<typeof useCreateUserDataMutation>;
export type CreateUserDataMutationResult = Apollo.MutationResult<CreateUserDataMutation>;
export type CreateUserDataMutationOptions = Apollo.BaseMutationOptions<CreateUserDataMutation, CreateUserDataMutationVariables>;
export const GetMeDocument = gql`
    query getMe {
  me {
    userId
    name
    bio
    email
    isAdmin
    iconUrl
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const UpdateUserDataDocument = gql`
    mutation updateUserData($input: UpdateUserDataInput!) {
  updateUserData(input: $input) {
    userId
    email
    name
    bio
    iconUrl
  }
}
    `;
export type UpdateUserDataMutationFn = Apollo.MutationFunction<UpdateUserDataMutation, UpdateUserDataMutationVariables>;

/**
 * __useUpdateUserDataMutation__
 *
 * To run a mutation, you first call `useUpdateUserDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserDataMutation, { data, loading, error }] = useUpdateUserDataMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserDataMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserDataMutation, UpdateUserDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserDataMutation, UpdateUserDataMutationVariables>(UpdateUserDataDocument, options);
      }
export type UpdateUserDataMutationHookResult = ReturnType<typeof useUpdateUserDataMutation>;
export type UpdateUserDataMutationResult = Apollo.MutationResult<UpdateUserDataMutation>;
export type UpdateUserDataMutationOptions = Apollo.BaseMutationOptions<UpdateUserDataMutation, UpdateUserDataMutationVariables>;