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
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type CreateRoomInput = {
  name: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
};

export type CreateUserDataInput = {
  authUserId: Scalars['String'];
  name: Scalars['String'];
  userId: Scalars['String'];
};

export type DeleteRoomInput = {
  databaseId: Scalars['String'];
};

export type JoinRoomInput = {
  password?: InputMaybe<Scalars['String']>;
  roomId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateRoom: Room;
  createUserData: UserData;
  deleteRoom: Room;
  joinRoom: Room;
  switchDarkTheme: UserData;
};


export type MutationCreateRoomArgs = {
  input: CreateRoomInput;
};


export type MutationCreateUserDataArgs = {
  input: CreateUserDataInput;
};


export type MutationDeleteRoomArgs = {
  input: DeleteRoomInput;
};


export type MutationJoinRoomArgs = {
  input: JoinRoomInput;
};


export type MutationSwitchDarkThemeArgs = {
  input?: InputMaybe<SwitchDarkThemeInput>;
};

export type Node = {
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  Me: UserData;
  Rooms: Array<Room>;
  UserData: UserData;
  node?: Maybe<Node>;
  nodes: Array<Maybe<Node>>;
  room: Room;
};


export type QueryRoomsArgs = {
  input?: InputMaybe<RoomsInput>;
};


export type QueryUserDataArgs = {
  input?: InputMaybe<UserDataInput>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryRoomArgs = {
  input: RoomInput;
};

/** 現在開かれている得点表示のデータ */
export type Room = Node & {
  __typename?: 'Room';
  createdAt: Scalars['DateTime'];
  /** データベース上のID */
  databaseId: Scalars['String'];
  id: Scalars['ID'];
  /** ルーム名 */
  name: Scalars['String'];
  /** 現在行われているラウンド */
  round: Round;
  updatedAt: Scalars['DateTime'];
  /** 参加中のユーザー(との中間テーブル) */
  users: Array<User_Room>;
};

export type RoomInput = {
  databaseId: Scalars['String'];
};

export enum RoomRole {
  Member = 'MEMBER',
  Owner = 'OWNER'
}

export type RoomsInput = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

/** 現在行われているラウンドのデータ */
export type Round = Node & {
  __typename?: 'Round';
  createdAt: Scalars['DateTime'];
  /** データベース上のID */
  databaseId: Scalars['String'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  /** このラウンドが行われているルーム */
  room: Room;
  updatedAt: Scalars['DateTime'];
  /** 参加したユーザー(との中間テーブル) */
  users: Array<User_Round>;
};

export enum RoundRole {
  Admin = 'ADMIN',
  Player = 'PLAYER'
}

export type SwitchDarkThemeInput = {
  databaseId?: InputMaybe<Scalars['String']>;
};

/** ユーザーの情報 */
export type UserData = Node & {
  __typename?: 'UserData';
  /** 各ユーザーのプロフィールページの内容 */
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  /** データベース上のID */
  databaseId: Scalars['String'];
  /** 各ユーザーemailアドレス */
  email?: Maybe<Scalars['String']>;
  /** ユーザーのアイコン画像のURL */
  iconUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Admin権限の有無 (変更禁止) */
  isAdmin: Scalars['Boolean'];
  /** ダークテーマ設定 */
  isDarkTheme: Scalars['Boolean'];
  /** 各ユーザーの表示名 */
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  /** 各ユーザーが任意につけられるかつUniqueなID */
  userId: Scalars['String'];
};

export type UserDataInput = {
  databaseId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

/** ユーザーと得点表示ルームの中間テーブル */
export type User_Room = Node & {
  __typename?: 'User_Room';
  UserData: UserData;
  databaseId: Scalars['String'];
  id: Scalars['ID'];
  role: RoomRole;
  room: Room;
};

/** ユーザーと現在のラウンドの中間テーブル */
export type User_Round = Node & {
  __typename?: 'User_Round';
  databaseId: Scalars['String'];
  id: Scalars['ID'];
  role: RoundRole;
  round: Round;
  userData: UserData;
};

export type SwitchDarkThemeMutationVariables = Exact<{
  input?: InputMaybe<SwitchDarkThemeInput>;
}>;


export type SwitchDarkThemeMutation = { __typename?: 'Mutation', switchDarkTheme: { __typename?: 'UserData', id: string, databaseId: string, isDarkTheme: boolean } };


export const SwitchDarkThemeDocument = gql`
    mutation SwitchDarkTheme($input: SwitchDarkThemeInput) {
  switchDarkTheme(input: $input) {
    id
    databaseId
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
 *      input: // value for 'input'
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