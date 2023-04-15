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

export type CreateScoreBoardRoomInput = {
  name: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
};

export type CreateUserDataInput = {
  authUserId: Scalars['ID'];
  bio?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  userId: Scalars['String'];
};

export type GetScoreBoardRoomInput = {
  databaseId: Scalars['String'];
};

export type GetScoreBoardRoomsInput = {
  dummy?: InputMaybe<Scalars['String']>;
};

export type GetUserDataInput = {
  userId: Scalars['String'];
};

export type JoinScoreBoardRoomInput = {
  databaseId: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
};

export type LeaveScoreBoardRoomInput = {
  databaseId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** 得点表示ルームを作成しオーナーになる */
  createScoreBoardRoom?: Maybe<ScoreBoardRoom>;
  createUserData?: Maybe<UserData>;
  joinScoreBoardRoom?: Maybe<ScoreBoardRoom>;
  /** 得点表示ルームから退出する */
  leaveScoreBoardRoom?: Maybe<ScoreBoardRoom>;
  switchDarkTheme?: Maybe<UserData>;
  updateUserData?: Maybe<UserData>;
};


export type MutationCreateScoreBoardRoomArgs = {
  input: CreateScoreBoardRoomInput;
};


export type MutationCreateUserDataArgs = {
  input: CreateUserDataInput;
};


export type MutationJoinScoreBoardRoomArgs = {
  input: JoinScoreBoardRoomInput;
};


export type MutationLeaveScoreBoardRoomArgs = {
  input: LeaveScoreBoardRoomInput;
};


export type MutationUpdateUserDataArgs = {
  input: UpdateUserDataInput;
};

export type Node = {
  id?: Maybe<Scalars['ID']>;
};

export type Query = {
  __typename?: 'Query';
  getScoreBoardRoom?: Maybe<ScoreBoardRoom>;
  /** 得点表示ルーム一覧を取得する */
  getScoreBoardRooms?: Maybe<Array<Maybe<ScoreBoardRoom>>>;
  getUserData?: Maybe<UserData>;
  loginUser?: Maybe<UserData>;
  node?: Maybe<Node>;
};


export type QueryGetScoreBoardRoomArgs = {
  input: GetScoreBoardRoomInput;
};


export type QueryGetScoreBoardRoomsArgs = {
  input?: InputMaybe<GetScoreBoardRoomsInput>;
};


export type QueryGetUserDataArgs = {
  input: GetUserDataInput;
};


export type QueryNodeArgs = {
  id: Scalars['String'];
};

/** 現在開かれている得点表示ルームのデータ */
export type ScoreBoardRoom = Node & {
  __typename?: 'ScoreBoardRoom';
  /** 作成日時 */
  createdAt: Scalars['DateTime'];
  /** データベース上のID */
  databaseId: Scalars['ID'];
  /** パスワードがかかっているか */
  hasPassword: Scalars['Boolean'];
  /** 参加に必要なパスワード */
  hashedPassword?: Maybe<Scalars['String']>;
  /** relay仕様のID */
  id: Scalars['ID'];
  /** ルーム名 */
  name: Scalars['String'];
  /** 最終更新日時 */
  updatedAt: Scalars['DateTime'];
  /** 参加中のユーザー(との中間テーブル) */
  users: Array<User_ScoreBoardRoom>;
};

export enum ScoreBoardRoomRole {
  Member = 'MEMBER',
  Owner = 'OWNER'
}

export type UpdateUserDataInput = {
  bio?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  iconUrl?: InputMaybe<Scalars['String']>;
  isDarkTheme?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  newUserId?: InputMaybe<Scalars['String']>;
  userId: Scalars['String'];
};

/** ユーザーの情報 */
export type UserData = Node & {
  __typename?: 'UserData';
  /** 各ユーザーのプロフィールページの内容 */
  bio?: Maybe<Scalars['String']>;
  /** データベース上のID */
  databaseId: Scalars['ID'];
  /** 各ユーザーemailアドレス */
  email?: Maybe<Scalars['String']>;
  /** ユーザーのアイコン画像のURL */
  iconUrl?: Maybe<Scalars['String']>;
  /** relay仕様のID */
  id: Scalars['ID'];
  /** Admin権限の有無 (変更禁止) */
  isAdmin: Scalars['Boolean'];
  /** ダークテーマ設定 */
  isDarkTheme: Scalars['Boolean'];
  /** 各ユーザーの表示名 */
  name: Scalars['String'];
  /** 参加中のルーム情報 */
  scoreBoardRooms: Array<User_ScoreBoardRoom>;
  /** 各ユーザーが任意につけられるかつUniqueなID */
  userId: Scalars['String'];
};

/** ユーザーと得点表示ルームの中間テーブル */
export type User_ScoreBoardRoom = {
  __typename?: 'User_ScoreBoardRoom';
  /** ユーザーの得点表示ルーム内での権限 */
  role: ScoreBoardRoomRole;
  scoreBoardRoom: ScoreBoardRoom;
  scoreBoardRoomId: Scalars['String'];
  userData: UserData;
  userDataId: Scalars['String'];
};

export type CreateScoreBoardRoomMutationVariables = Exact<{
  input: CreateScoreBoardRoomInput;
}>;


export type CreateScoreBoardRoomMutation = { __typename?: 'Mutation', createScoreBoardRoom?: { __typename?: 'ScoreBoardRoom', id: string, databaseId: string, name: string } | null };

export type GetScoreBoardRoomsQueryVariables = Exact<{
  input?: InputMaybe<GetScoreBoardRoomsInput>;
}>;


export type GetScoreBoardRoomsQuery = { __typename?: 'Query', getScoreBoardRooms?: Array<{ __typename?: 'ScoreBoardRoom', id: string, databaseId: string, hasPassword: boolean, name: string, users: Array<{ __typename?: 'User_ScoreBoardRoom', role: ScoreBoardRoomRole, userData: { __typename?: 'UserData', id: string, iconUrl?: string | null, userId: string, databaseId: string } }> } | null> | null };

export type LeaveScoreBoardRoomMutationVariables = Exact<{
  input: LeaveScoreBoardRoomInput;
}>;


export type LeaveScoreBoardRoomMutation = { __typename?: 'Mutation', leaveScoreBoardRoom?: { __typename?: 'ScoreBoardRoom', id: string, databaseId: string } | null };

export type GetScoreBoardRoomHasPasswordQueryVariables = Exact<{
  input: GetScoreBoardRoomInput;
}>;


export type GetScoreBoardRoomHasPasswordQuery = { __typename?: 'Query', getScoreBoardRoom?: { __typename?: 'ScoreBoardRoom', id: string, databaseId: string, hasPassword: boolean } | null };

export type JoinScoreBoardRoomMutationVariables = Exact<{
  input: JoinScoreBoardRoomInput;
}>;


export type JoinScoreBoardRoomMutation = { __typename?: 'Mutation', joinScoreBoardRoom?: { __typename?: 'ScoreBoardRoom', id: string, databaseId: string } | null };

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


export const CreateScoreBoardRoomDocument = gql`
    mutation CreateScoreBoardRoom($input: CreateScoreBoardRoomInput!) {
  createScoreBoardRoom(input: $input) {
    id
    databaseId
    name
  }
}
    `;
export type CreateScoreBoardRoomMutationFn = Apollo.MutationFunction<CreateScoreBoardRoomMutation, CreateScoreBoardRoomMutationVariables>;

/**
 * __useCreateScoreBoardRoomMutation__
 *
 * To run a mutation, you first call `useCreateScoreBoardRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateScoreBoardRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createScoreBoardRoomMutation, { data, loading, error }] = useCreateScoreBoardRoomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateScoreBoardRoomMutation(baseOptions?: Apollo.MutationHookOptions<CreateScoreBoardRoomMutation, CreateScoreBoardRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateScoreBoardRoomMutation, CreateScoreBoardRoomMutationVariables>(CreateScoreBoardRoomDocument, options);
      }
export type CreateScoreBoardRoomMutationHookResult = ReturnType<typeof useCreateScoreBoardRoomMutation>;
export type CreateScoreBoardRoomMutationResult = Apollo.MutationResult<CreateScoreBoardRoomMutation>;
export type CreateScoreBoardRoomMutationOptions = Apollo.BaseMutationOptions<CreateScoreBoardRoomMutation, CreateScoreBoardRoomMutationVariables>;
export const GetScoreBoardRoomsDocument = gql`
    query GetScoreBoardRooms($input: GetScoreBoardRoomsInput) {
  getScoreBoardRooms(input: $input) {
    id
    databaseId
    hasPassword
    name
    users {
      role
      userData {
        id
        iconUrl
        userId
        databaseId
      }
    }
  }
}
    `;

/**
 * __useGetScoreBoardRoomsQuery__
 *
 * To run a query within a React component, call `useGetScoreBoardRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScoreBoardRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScoreBoardRoomsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetScoreBoardRoomsQuery(baseOptions?: Apollo.QueryHookOptions<GetScoreBoardRoomsQuery, GetScoreBoardRoomsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetScoreBoardRoomsQuery, GetScoreBoardRoomsQueryVariables>(GetScoreBoardRoomsDocument, options);
      }
export function useGetScoreBoardRoomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetScoreBoardRoomsQuery, GetScoreBoardRoomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetScoreBoardRoomsQuery, GetScoreBoardRoomsQueryVariables>(GetScoreBoardRoomsDocument, options);
        }
export type GetScoreBoardRoomsQueryHookResult = ReturnType<typeof useGetScoreBoardRoomsQuery>;
export type GetScoreBoardRoomsLazyQueryHookResult = ReturnType<typeof useGetScoreBoardRoomsLazyQuery>;
export type GetScoreBoardRoomsQueryResult = Apollo.QueryResult<GetScoreBoardRoomsQuery, GetScoreBoardRoomsQueryVariables>;
export const LeaveScoreBoardRoomDocument = gql`
    mutation LeaveScoreBoardRoom($input: LeaveScoreBoardRoomInput!) {
  leaveScoreBoardRoom(input: $input) {
    id
    databaseId
  }
}
    `;
export type LeaveScoreBoardRoomMutationFn = Apollo.MutationFunction<LeaveScoreBoardRoomMutation, LeaveScoreBoardRoomMutationVariables>;

/**
 * __useLeaveScoreBoardRoomMutation__
 *
 * To run a mutation, you first call `useLeaveScoreBoardRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveScoreBoardRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveScoreBoardRoomMutation, { data, loading, error }] = useLeaveScoreBoardRoomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLeaveScoreBoardRoomMutation(baseOptions?: Apollo.MutationHookOptions<LeaveScoreBoardRoomMutation, LeaveScoreBoardRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveScoreBoardRoomMutation, LeaveScoreBoardRoomMutationVariables>(LeaveScoreBoardRoomDocument, options);
      }
export type LeaveScoreBoardRoomMutationHookResult = ReturnType<typeof useLeaveScoreBoardRoomMutation>;
export type LeaveScoreBoardRoomMutationResult = Apollo.MutationResult<LeaveScoreBoardRoomMutation>;
export type LeaveScoreBoardRoomMutationOptions = Apollo.BaseMutationOptions<LeaveScoreBoardRoomMutation, LeaveScoreBoardRoomMutationVariables>;
export const GetScoreBoardRoomHasPasswordDocument = gql`
    query GetScoreBoardRoomHasPassword($input: GetScoreBoardRoomInput!) {
  getScoreBoardRoom(input: $input) {
    id
    databaseId
    hasPassword
  }
}
    `;

/**
 * __useGetScoreBoardRoomHasPasswordQuery__
 *
 * To run a query within a React component, call `useGetScoreBoardRoomHasPasswordQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScoreBoardRoomHasPasswordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScoreBoardRoomHasPasswordQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetScoreBoardRoomHasPasswordQuery(baseOptions: Apollo.QueryHookOptions<GetScoreBoardRoomHasPasswordQuery, GetScoreBoardRoomHasPasswordQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetScoreBoardRoomHasPasswordQuery, GetScoreBoardRoomHasPasswordQueryVariables>(GetScoreBoardRoomHasPasswordDocument, options);
      }
export function useGetScoreBoardRoomHasPasswordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetScoreBoardRoomHasPasswordQuery, GetScoreBoardRoomHasPasswordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetScoreBoardRoomHasPasswordQuery, GetScoreBoardRoomHasPasswordQueryVariables>(GetScoreBoardRoomHasPasswordDocument, options);
        }
export type GetScoreBoardRoomHasPasswordQueryHookResult = ReturnType<typeof useGetScoreBoardRoomHasPasswordQuery>;
export type GetScoreBoardRoomHasPasswordLazyQueryHookResult = ReturnType<typeof useGetScoreBoardRoomHasPasswordLazyQuery>;
export type GetScoreBoardRoomHasPasswordQueryResult = Apollo.QueryResult<GetScoreBoardRoomHasPasswordQuery, GetScoreBoardRoomHasPasswordQueryVariables>;
export const JoinScoreBoardRoomDocument = gql`
    mutation JoinScoreBoardRoom($input: JoinScoreBoardRoomInput!) {
  joinScoreBoardRoom(input: $input) {
    id
    databaseId
  }
}
    `;
export type JoinScoreBoardRoomMutationFn = Apollo.MutationFunction<JoinScoreBoardRoomMutation, JoinScoreBoardRoomMutationVariables>;

/**
 * __useJoinScoreBoardRoomMutation__
 *
 * To run a mutation, you first call `useJoinScoreBoardRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinScoreBoardRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinScoreBoardRoomMutation, { data, loading, error }] = useJoinScoreBoardRoomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useJoinScoreBoardRoomMutation(baseOptions?: Apollo.MutationHookOptions<JoinScoreBoardRoomMutation, JoinScoreBoardRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinScoreBoardRoomMutation, JoinScoreBoardRoomMutationVariables>(JoinScoreBoardRoomDocument, options);
      }
export type JoinScoreBoardRoomMutationHookResult = ReturnType<typeof useJoinScoreBoardRoomMutation>;
export type JoinScoreBoardRoomMutationResult = Apollo.MutationResult<JoinScoreBoardRoomMutation>;
export type JoinScoreBoardRoomMutationOptions = Apollo.BaseMutationOptions<JoinScoreBoardRoomMutation, JoinScoreBoardRoomMutationVariables>;
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