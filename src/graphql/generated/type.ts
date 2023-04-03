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

export type Action = Node & {
  __typename?: 'Action';
  /** アクションの種類 */
  actionType: Scalars['String'];
  /** アクションを行ったユーザー */
  actionUser: UserData;
  actionUserId: Scalars['String'];
  /** 作成日時 */
  createdAt: Scalars['DateTime'];
  /** データベース上のID */
  databaseId: Scalars['ID'];
  id: Scalars['ID'];
  /** アクションが属するルール */
  rule: Rule;
  ruleId: Scalars['String'];
  /** アクションを行った対象のユーザー */
  targetUser: UserData;
  targetUserId: Scalars['String'];
  /** 更新日時 */
  updatedAt: Scalars['DateTime'];
};

export type CreateRoomInput = {
  name: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
};

export type CreateUserDataInput = {
  authUserId: Scalars['ID'];
  bio?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  userId: Scalars['String'];
};

export type GetRoomInput = {
  databaseId: Scalars['String'];
};

export type GetRoomsInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
};

export type GetUserDataInput = {
  userId: Scalars['String'];
};

export type JoinRoomInput = {
  databaseId: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createRoom?: Maybe<Room>;
  createUserData?: Maybe<UserData>;
  joinRoom?: Maybe<Room>;
  leaveRoom?: Maybe<Room>;
  switchDarkTheme?: Maybe<UserData>;
  updateUserData?: Maybe<UserData>;
};


export type MutationCreateRoomArgs = {
  input: CreateRoomInput;
};


export type MutationCreateUserDataArgs = {
  input: CreateUserDataInput;
};


export type MutationJoinRoomArgs = {
  input: JoinRoomInput;
};


export type MutationUpdateUserDataArgs = {
  input: UpdateUserDataInput;
};

export type Node = {
  id?: Maybe<Scalars['ID']>;
};

export type Query = {
  __typename?: 'Query';
  getRoom?: Maybe<Room>;
  getRooms?: Maybe<Array<Maybe<Room>>>;
  getUserData?: Maybe<UserData>;
  loginUser?: Maybe<UserData>;
  node?: Maybe<Node>;
};


export type QueryGetRoomArgs = {
  input: GetRoomInput;
};


export type QueryGetRoomsArgs = {
  input: GetRoomsInput;
};


export type QueryGetUserDataArgs = {
  input: GetUserDataInput;
};


export type QueryNodeArgs = {
  id: Scalars['String'];
};

export type Room = Node & {
  __typename?: 'Room';
  /** 作成日時 */
  createdAt: Scalars['DateTime'];
  /** 現在実行中のルール */
  currentRule: Rule;
  currentRuleId: Scalars['String'];
  /** データベース上のID */
  databaseId: Scalars['ID'];
  hasPassword: Scalars['Boolean'];
  /** 参加に必要なパスワード */
  hashedPassword?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** ルームが有効かどうか（ルーム一覧に表示するかどうか） */
  isActive: Scalars['Boolean'];
  /** ルーム名 */
  name: Scalars['String'];
  /** ルールの履歴 */
  ruleHistory: Array<Rule>;
  /** 更新日時 */
  updatedAt: Scalars['DateTime'];
  /** 参加中のユーザー */
  users: Array<UserData>;
};

export enum RoomRole {
  Owner = 'OWNER',
  Player = 'PLAYER'
}

export type Rule = Node & {
  __typename?: 'Rule';
  /** このルール内で行われたアクション */
  actions: Array<Action>;
  createdAt: Scalars['DateTime'];
  currentRoom?: Maybe<Room>;
  /** データベース上のID */
  databaseId: Scalars['ID'];
  id: Scalars['ID'];
  room: Room;
  roomDatabaseId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  /** このルールに参加しているユーザー */
  users: Array<UserData>;
};

export type UpdateUserDataInput = {
  bio?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  iconUrl?: InputMaybe<Scalars['String']>;
  isDarkTheme?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  newUserId?: InputMaybe<Scalars['String']>;
  userId: Scalars['String'];
};

/** ユーザーの情報（実際に取得・変更する用） */
export type UserData = Node & {
  __typename?: 'UserData';
  /** ルーム内アクション関係リレーション */
  actions: Array<Action>;
  /** 各ユーザーのプロフィールページの内容 */
  bio?: Maybe<Scalars['String']>;
  /** 作成日時 */
  createdAt: Scalars['DateTime'];
  /** データベース上のID。基本使わない。 */
  databaseId: Scalars['ID'];
  /** 各ユーザーemailアドレス */
  email?: Maybe<Scalars['String']>;
  /** ユーザーのアイコン画像のURL */
  iconUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Admin権限の有無\nクライアント側からの変更禁止 */
  isAdmin: Scalars['Boolean'];
  /** ダークテーマ設定 */
  isDarkTheme: Scalars['Boolean'];
  /** 各ユーザーの表示名 */
  name: Scalars['String'];
  /** 得点表示用ルーム */
  room?: Maybe<Room>;
  roomId?: Maybe<Scalars['String']>;
  roomRole?: Maybe<RoomRole>;
  /** ルーム内での得点 */
  rule: Array<Rule>;
  targetedActions: Array<Action>;
  /** 更新日時 */
  updatedAt: Scalars['DateTime'];
  /** 各ユーザーが任意につけられるかつUniqueなID */
  userId: Scalars['String'];
};

export type CreateRoomMutationVariables = Exact<{
  input: CreateRoomInput;
}>;


export type CreateRoomMutation = { __typename?: 'Mutation', createRoom?: { __typename?: 'Room', databaseId: string, name: string } | null };

export type GetActiveRoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActiveRoomsQuery = { __typename?: 'Query', getRooms?: Array<{ __typename?: 'Room', hasPassword: boolean, databaseId: string, name: string, isActive: boolean, users: Array<{ __typename?: 'UserData', databaseId: string, iconUrl?: string | null }> } | null> | null };

export type GetRoomByDatabaseIdQueryVariables = Exact<{
  input: GetRoomInput;
}>;


export type GetRoomByDatabaseIdQuery = { __typename?: 'Query', getRoom?: { __typename?: 'Room', hasPassword: boolean, databaseId: string, name: string, isActive: boolean, users: Array<{ __typename?: 'UserData', databaseId: string, iconUrl?: string | null }> } | null };

export type CreateUserDataMutationVariables = Exact<{
  input: CreateUserDataInput;
}>;


export type CreateUserDataMutation = { __typename?: 'Mutation', createUserData?: { __typename?: 'UserData', userId: string } | null };

export type GetLoginUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLoginUserQuery = { __typename?: 'Query', loginUser?: { __typename?: 'UserData', userId: string, name: string, bio?: string | null, email?: string | null, isAdmin: boolean, iconUrl?: string | null, isDarkTheme: boolean } | null };

export type GetUserDataQueryVariables = Exact<{
  input: GetUserDataInput;
}>;


export type GetUserDataQuery = { __typename?: 'Query', getUserData?: { __typename?: 'UserData', userId: string, name: string, bio?: string | null, email?: string | null, isAdmin: boolean, iconUrl?: string | null, isDarkTheme: boolean } | null };

export type SwitchDarkThemeMutationVariables = Exact<{ [key: string]: never; }>;


export type SwitchDarkThemeMutation = { __typename?: 'Mutation', switchDarkTheme?: { __typename?: 'UserData', isDarkTheme: boolean } | null };

export type UpdateUserDataMutationVariables = Exact<{
  input: UpdateUserDataInput;
}>;


export type UpdateUserDataMutation = { __typename?: 'Mutation', updateUserData?: { __typename?: 'UserData', userId: string, email?: string | null, name: string, bio?: string | null, iconUrl?: string | null, isDarkTheme: boolean } | null };


export const CreateRoomDocument = gql`
    mutation CreateRoom($input: CreateRoomInput!) {
  createRoom(input: $input) {
    databaseId
    name
  }
}
    `;
export type CreateRoomMutationFn = Apollo.MutationFunction<CreateRoomMutation, CreateRoomMutationVariables>;

/**
 * __useCreateRoomMutation__
 *
 * To run a mutation, you first call `useCreateRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoomMutation, { data, loading, error }] = useCreateRoomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRoomMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoomMutation, CreateRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(CreateRoomDocument, options);
      }
export type CreateRoomMutationHookResult = ReturnType<typeof useCreateRoomMutation>;
export type CreateRoomMutationResult = Apollo.MutationResult<CreateRoomMutation>;
export type CreateRoomMutationOptions = Apollo.BaseMutationOptions<CreateRoomMutation, CreateRoomMutationVariables>;
export const GetActiveRoomsDocument = gql`
    query GetActiveRooms {
  getRooms(input: {isActive: true}) {
    hasPassword
    databaseId
    name
    isActive
    users {
      databaseId
      iconUrl
    }
  }
}
    `;

/**
 * __useGetActiveRoomsQuery__
 *
 * To run a query within a React component, call `useGetActiveRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActiveRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActiveRoomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetActiveRoomsQuery(baseOptions?: Apollo.QueryHookOptions<GetActiveRoomsQuery, GetActiveRoomsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetActiveRoomsQuery, GetActiveRoomsQueryVariables>(GetActiveRoomsDocument, options);
      }
export function useGetActiveRoomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActiveRoomsQuery, GetActiveRoomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetActiveRoomsQuery, GetActiveRoomsQueryVariables>(GetActiveRoomsDocument, options);
        }
export type GetActiveRoomsQueryHookResult = ReturnType<typeof useGetActiveRoomsQuery>;
export type GetActiveRoomsLazyQueryHookResult = ReturnType<typeof useGetActiveRoomsLazyQuery>;
export type GetActiveRoomsQueryResult = Apollo.QueryResult<GetActiveRoomsQuery, GetActiveRoomsQueryVariables>;
export const GetRoomByDatabaseIdDocument = gql`
    query GetRoomByDatabaseId($input: GetRoomInput!) {
  getRoom(input: $input) {
    hasPassword
    databaseId
    name
    isActive
    users {
      databaseId
      iconUrl
    }
  }
}
    `;

/**
 * __useGetRoomByDatabaseIdQuery__
 *
 * To run a query within a React component, call `useGetRoomByDatabaseIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoomByDatabaseIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoomByDatabaseIdQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetRoomByDatabaseIdQuery(baseOptions: Apollo.QueryHookOptions<GetRoomByDatabaseIdQuery, GetRoomByDatabaseIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoomByDatabaseIdQuery, GetRoomByDatabaseIdQueryVariables>(GetRoomByDatabaseIdDocument, options);
      }
export function useGetRoomByDatabaseIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoomByDatabaseIdQuery, GetRoomByDatabaseIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoomByDatabaseIdQuery, GetRoomByDatabaseIdQueryVariables>(GetRoomByDatabaseIdDocument, options);
        }
export type GetRoomByDatabaseIdQueryHookResult = ReturnType<typeof useGetRoomByDatabaseIdQuery>;
export type GetRoomByDatabaseIdLazyQueryHookResult = ReturnType<typeof useGetRoomByDatabaseIdLazyQuery>;
export type GetRoomByDatabaseIdQueryResult = Apollo.QueryResult<GetRoomByDatabaseIdQuery, GetRoomByDatabaseIdQueryVariables>;
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
export const GetLoginUserDocument = gql`
    query getLoginUser {
  loginUser {
    userId
    name
    bio
    email
    isAdmin
    iconUrl
    isDarkTheme
  }
}
    `;

/**
 * __useGetLoginUserQuery__
 *
 * To run a query within a React component, call `useGetLoginUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoginUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoginUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLoginUserQuery(baseOptions?: Apollo.QueryHookOptions<GetLoginUserQuery, GetLoginUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLoginUserQuery, GetLoginUserQueryVariables>(GetLoginUserDocument, options);
      }
export function useGetLoginUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLoginUserQuery, GetLoginUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLoginUserQuery, GetLoginUserQueryVariables>(GetLoginUserDocument, options);
        }
export type GetLoginUserQueryHookResult = ReturnType<typeof useGetLoginUserQuery>;
export type GetLoginUserLazyQueryHookResult = ReturnType<typeof useGetLoginUserLazyQuery>;
export type GetLoginUserQueryResult = Apollo.QueryResult<GetLoginUserQuery, GetLoginUserQueryVariables>;
export const GetUserDataDocument = gql`
    query getUserData($input: GetUserDataInput!) {
  getUserData(input: $input) {
    userId
    name
    bio
    email
    isAdmin
    iconUrl
    isDarkTheme
  }
}
    `;

/**
 * __useGetUserDataQuery__
 *
 * To run a query within a React component, call `useGetUserDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserDataQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUserDataQuery(baseOptions: Apollo.QueryHookOptions<GetUserDataQuery, GetUserDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserDataQuery, GetUserDataQueryVariables>(GetUserDataDocument, options);
      }
export function useGetUserDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserDataQuery, GetUserDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserDataQuery, GetUserDataQueryVariables>(GetUserDataDocument, options);
        }
export type GetUserDataQueryHookResult = ReturnType<typeof useGetUserDataQuery>;
export type GetUserDataLazyQueryHookResult = ReturnType<typeof useGetUserDataLazyQuery>;
export type GetUserDataQueryResult = Apollo.QueryResult<GetUserDataQuery, GetUserDataQueryVariables>;
export const SwitchDarkThemeDocument = gql`
    mutation switchDarkTheme {
  switchDarkTheme {
    isDarkTheme
  }
}
    `;
export type SwitchDarkThemeMutationFn = Apollo.MutationFunction<SwitchDarkThemeMutation, SwitchDarkThemeMutationVariables>;

/**
 * __useSwitchDarkThemeMutation__
 *
 * To run a mutation, you first call `useSwitchDarkThemeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSwitchDarkThemeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [switchDarkThemeMutation, { data, loading, error }] = useSwitchDarkThemeMutation({
 *   variables: {
 *   },
 * });
 */
export function useSwitchDarkThemeMutation(baseOptions?: Apollo.MutationHookOptions<SwitchDarkThemeMutation, SwitchDarkThemeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SwitchDarkThemeMutation, SwitchDarkThemeMutationVariables>(SwitchDarkThemeDocument, options);
      }
export type SwitchDarkThemeMutationHookResult = ReturnType<typeof useSwitchDarkThemeMutation>;
export type SwitchDarkThemeMutationResult = Apollo.MutationResult<SwitchDarkThemeMutation>;
export type SwitchDarkThemeMutationOptions = Apollo.BaseMutationOptions<SwitchDarkThemeMutation, SwitchDarkThemeMutationVariables>;
export const UpdateUserDataDocument = gql`
    mutation updateUserData($input: UpdateUserDataInput!) {
  updateUserData(input: $input) {
    userId
    email
    name
    bio
    iconUrl
    isDarkTheme
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