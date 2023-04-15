import {
  Table, Text, Button, Title, Group, Badge,
} from '@mantine/core';
import {
  IconTrash, IconDoorEnter, IconDoorExit, IconLock,
} from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import React from 'react';

import UserIcons from '../../../../components/templates/userIcons';
import { ScoreBoardRoomRole } from '../../../../graphql/generated/type';

type RoomProps = {
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

const RoomTablePCWithHeader = (props: RoomTableWithHeaderProps) => {
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

const RoomTablePCTr = (props: RoomTableTrProps) => {
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

const RoomListPC = (props: RoomListProps) => {
  const {
    rooms, onJoinButtonClick, onMoveButtonClick, onLeaveButtonClick,
  } = props;
  const { data: session } = useSession();
  return (
    <>
      {inAnyRoom(rooms, session?.userData.userId ?? '') && (
      <>
        <Title order={4}>
          参加中のルーム
        </Title>
        <RoomTablePCWithHeader>
          {rooms.map((room) => {
            if (!room) return null;
            if (!isInRoom(room, session?.userData.userId ?? '')) return null;
            const userRole = room.users.find(
              (user) => user.userData.userId === session?.userData.userId,
            )?.role;
            return (
              <RoomTablePCTr room={room} key={room.databaseId} role={userRole}>
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
                  <Button
                    size="sm"
                    variant="outline"
                    leftIcon={<IconTrash size="1rem" />}
                    onClick={() => onLeaveButtonClick(room.databaseId)}
                    color="red"
                  >
                    削除
                  </Button>
                  )}
                  {userRole !== ScoreBoardRoomRole.Owner && (
                  <Button
                    size="sm"
                    variant="outline"
                    leftIcon={<IconDoorExit size="1rem" />}
                    onClick={() => onLeaveButtonClick(room.databaseId)}
                    color="red"
                  >
                    退出
                  </Button>
                  )}
                </Group>
              </RoomTablePCTr>
            );
          })}
        </RoomTablePCWithHeader>
        <Title order={4}>
          進行中のルーム
        </Title>
      </>
      )}
      <RoomTablePCWithHeader>
        {rooms.map((room) => {
          if (!room) return null;
          if (isInRoom(room, session?.userData.userId ?? '')) return null;
          return (
            <RoomTablePCTr room={room} key={room.databaseId}>
              <Group position="right">
                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={room.hasPassword ? <IconLock size="1.0rem" /> : <IconDoorEnter size="1rem" />}
                  onClick={() => onJoinButtonClick(room.databaseId, room.hasPassword)}
                >
                  参加
                </Button>
              </Group>
            </RoomTablePCTr>
          );
        })}
      </RoomTablePCWithHeader>
    </>
  );
};

export default RoomListPC;
