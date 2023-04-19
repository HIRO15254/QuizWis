import {
  Table, Text, Button, Title, Group, Badge,
} from '@mantine/core';
import {
  IconDoorEnter, IconLock,
} from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import React from 'react';

import ScoreBoardRoomListMemberMenu from './ScoreBoardRoomListMemberMenu';
import ScoreBoardRoomListOwnerMenu from './ScoreBoardRoomListOwnerMenu';
import UserIcons from '../../../../../components/templates/userIcons';
import { ScoreBoardRoomRole } from '../../../../../graphql/generated/type';

export type RoomProps = {
  databaseId: string;
  name: string;
  hasPassword: boolean;
  users : {
    role: ScoreBoardRoomRole
    userData: {
      databaseId: string;
      userId: string;
      iconUrl?: string | null;
    }
  }[]
};

export type RoomListProps = {
  rooms: (RoomProps | null)[]
  onJoinButtonClick: (roomId: string, hasPassword: boolean) => void;
  onMoveButtonClick: (roomId: string) => void;
  onLeaveButtonClick: (roomId: string) => void;
  onDeleteButtonClick: (roomId: string) => void;
  onUpdateNameButtonClick: (roomId: string) => void;
};

export type RoomTableWithHeaderProps = {
  children: React.ReactNode;
};

export type RoomTableTrProps = {
  room: RoomProps;
  children: React.ReactNode;
  role?: ScoreBoardRoomRole | undefined;
};

export const isInRoom = (room: RoomProps, userId: string) => {
  const ret = room.users.find((user) => user.userData.userId === userId)?.role;
  return ret;
};

export const inAnyRoom = (rooms: (RoomProps | null)[], userId: string) => {
  const ret = rooms.find((room) => room && isInRoom(room, userId));
  return ret !== undefined;
};

const ScoreBoardRoomTableHeaderForPc = (props: RoomTableWithHeaderProps) => {
  const { children } = props;
  return (
    <Table styles={{ layout: 'fixed' }} w="100%" highlightOnHover mb="lg">
      <thead>
        <tr>
          <th>ルーム名</th>
          <th style={{ width: '200px' }}>参加者</th>
          <th style={{ width: '210px' }}>{}</th>
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </Table>
  );
};

const ScoreBoardRoomTableRowForPc = (props: RoomTableTrProps) => {
  const { room, children, role } = props;
  return (
    <tr key={room.databaseId}>
      <td>
        <Text>
          {room.name}
        </Text>
        {role && (
        <Badge color={role === ScoreBoardRoomRole.Owner ? 'red' : 'blue'}>
          {role.toString()}
        </Badge>
        )}
      </td>
      <td>
        <UserIcons users={room.users} />
      </td>
      <td>
        {children}
      </td>
    </tr>
  );
};

const ScoreBoardRoomListForPc = (props: RoomListProps) => {
  const {
    rooms,
    onJoinButtonClick,
    onMoveButtonClick,
    onLeaveButtonClick,
    onDeleteButtonClick,
    onUpdateNameButtonClick,
  } = props;
  const { data: session } = useSession();
  return (
    <>
      {inAnyRoom(rooms, session?.userData.userId ?? '') && (
      <>
        <Title order={4}>
          参加中のルーム
        </Title>
        <ScoreBoardRoomTableHeaderForPc>
          {rooms.map((room) => {
            if (!room || !isInRoom(room, session?.userData.userId ?? '')) return null;
            const userRole = room.users.find(
              (user) => user.userData.userId === session?.userData.userId,
            )?.role;
            return (
              <ScoreBoardRoomTableRowForPc room={room} key={room.databaseId} role={userRole}>
                <Group position="right">
                  <Button
                    size="sm"
                    variant="outline"
                    leftIcon={<IconDoorEnter size="1rem" />}
                    onClick={() => onMoveButtonClick(room.databaseId)}
                  >
                    移動
                  </Button>
                  {userRole === ScoreBoardRoomRole.Owner && (
                    <ScoreBoardRoomListOwnerMenu
                      databaseId={room.databaseId}
                      onLeaveButtonClick={onLeaveButtonClick}
                      onDeleteButtonClick={onDeleteButtonClick}
                      onUpdateNameButtonClick={onUpdateNameButtonClick}
                    />
                  )}
                  {userRole === ScoreBoardRoomRole.Member && (
                    <ScoreBoardRoomListMemberMenu
                      databaseId={room.databaseId}
                      onLeaveButtonClick={onLeaveButtonClick}
                    />
                  )}
                </Group>
              </ScoreBoardRoomTableRowForPc>
            );
          })}
        </ScoreBoardRoomTableHeaderForPc>
        <Title order={4}>
          進行中のルーム
        </Title>
      </>
      )}
      <ScoreBoardRoomTableHeaderForPc>
        {rooms.map((room) => {
          if (!room || isInRoom(room, session?.userData.userId ?? '')) return null;
          return (
            <ScoreBoardRoomTableRowForPc room={room} key={room.databaseId}>
              <Group position="right">
                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={room.hasPassword ? <IconLock size="1rem" /> : <IconDoorEnter size="1rem" />}
                  onClick={() => onJoinButtonClick(room.databaseId, room.hasPassword)}
                >
                  参加
                </Button>
              </Group>
            </ScoreBoardRoomTableRowForPc>
          );
        })}
      </ScoreBoardRoomTableHeaderForPc>
    </>
  );
};

export default ScoreBoardRoomListForPc;
