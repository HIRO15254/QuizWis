import {
  Table, Text, ActionIcon, Popover, Group, Button, Title, Badge,
} from '@mantine/core';
import { IconDoorEnter, IconDoorExit, IconLock } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import React from 'react';

import {
  RoomListProps, RoomTableTrProps, RoomTableWithHeaderProps, inAnyRoom, isInRoom,
} from './ScoreBoardRoomListForPc';
import ScoreBoardRoomListMemberMenu from './ScoreBoardRoomListMemberMenu';
import ScoreBoardRoomListOwnerMenu from './ScoreBoardRoomListOwnerMenu';
import UserIcons from '../../../../../components/templates/userIcons';
import { ScoreBoardRoomRole } from '../../../../../graphql/generated/type';

const ScoreBoardRoomTableHeaderForPhone = (props: RoomTableWithHeaderProps) => {
  const { children } = props;
  return (
    <Table styles={{ layout: 'fixed' }} w="100%" mb="lg">
      <thead>
        <tr>
          <th>ルーム名</th>
          <th style={{ width: '50px' }} align="center">人数</th>
          <th style={{ width: '110px' }}>{}</th>
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </Table>
  );
};

const ScoreBoardRoomTableRowForPhone = (props: RoomTableTrProps) => {
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
        <Popover>
          <Popover.Target>
            <Text align="center">
              {room.users.length}
            </Text>
          </Popover.Target>
          <Popover.Dropdown p={0}>
            <UserIcons users={room.users} size="sm" />
          </Popover.Dropdown>
        </Popover>
      </td>
      <td>
        {children}
      </td>
    </tr>
  );
};

const ScoreBoardRoomListForPhone = (props: RoomListProps) => {
  const { data: session } = useSession();
  const {
    rooms,
    onJoinButtonClick,
    onMoveButtonClick,
    onLeaveButtonClick,
    onDeleteButtonClick,
    onUpdateNameButtonClick,
  } = props;
  return (
    <>
      {inAnyRoom(rooms, session?.userData.userId ?? '') && (
        <>
          <Title order={4}>
            参加中のルーム
          </Title>
          <ScoreBoardRoomTableHeaderForPhone>
            {rooms.map((room) => {
              if (!room || !isInRoom(room, session?.userData.userId ?? '')) return null;
              const userRole = room.users.find(
                (user) => user.userData.userId === session?.userData.userId,
              )?.role;
              return (
                <ScoreBoardRoomTableRowForPhone room={room} key={room.databaseId} role={userRole}>
                  <Group position="left">
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => onMoveButtonClick(room.databaseId)}
                      mr={-10}
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
                </ScoreBoardRoomTableRowForPhone>
              );
            })}
          </ScoreBoardRoomTableHeaderForPhone>
          <Title order={4}>
            進行中のルーム
          </Title>
        </>
      )}
      <ScoreBoardRoomTableHeaderForPhone>
        {rooms.map((room) => {
          if (!room || isInRoom(room, session?.userData.userId ?? '')) return null;
          return (
            <ScoreBoardRoomTableRowForPhone room={room} key={room.databaseId}>
              <Group position="left">
                <Button
                  leftIcon={room.hasPassword ? <IconLock size="1rem" /> : null}
                  onClick={() => onJoinButtonClick(room.databaseId, room.hasPassword)}
                  variant="outline"
                  size="xs"
                >
                  参加
                </Button>
              </Group>
            </ScoreBoardRoomTableRowForPhone>
          );
        })}
      </ScoreBoardRoomTableHeaderForPhone>
    </>
  );
};

export default ScoreBoardRoomListForPhone;
