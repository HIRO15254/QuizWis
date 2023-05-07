import {
  Table, Text, Popover, Group, Button, Title, Badge,
} from '@mantine/core';
import { IconLock } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import React from 'react';

import {
  RoomListProps, RoomTableTrProps, RoomTableWithHeaderProps, inAnyRoom, isInRoom,
} from './RoomListForPc';
import RoomListMemberMenu from './RoomListMemberMenu';
import RoomListOwnerMenu from './RoomListOwnerMenu';
import UserIcons from '../../../../../components/templates/userIcons';
import { RoomRole } from '../../../../../gql';

const RoomTableHeaderForPhone = (props: RoomTableWithHeaderProps) => {
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

const RoomTableRowForPhone = (props: RoomTableTrProps) => {
  const { room, children, role } = props;
  return (
    <tr key={room.databaseId}>
      <td>
        <Text>
          {room.name}
        </Text>
        {role && (
          <Badge color={role === RoomRole.Owner ? 'red' : 'blue'}>
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

const RoomListForPhone = (props: RoomListProps) => {
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
      {inAnyRoom(rooms, session?.userId ?? '') && (
        <>
          <Title order={4}>
            参加中のルーム
          </Title>
          <RoomTableHeaderForPhone>
            {rooms.map((room) => {
              if (!room || !isInRoom(room, session?.userId ?? '')) return null;
              const userRole = room.users.find(
                (user) => user.userData.userId === session?.userId,
              )?.role;
              return (
                <RoomTableRowForPhone room={room} key={room.databaseId} role={userRole}>
                  <Group position="left">
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => onMoveButtonClick(room.databaseId)}
                      mr={-10}
                    >
                      移動
                    </Button>
                    {userRole === RoomRole.Owner && (
                      <RoomListOwnerMenu
                        databaseId={room.databaseId}
                        onLeaveButtonClick={onLeaveButtonClick}
                        onDeleteButtonClick={onDeleteButtonClick}
                        onUpdateNameButtonClick={onUpdateNameButtonClick}
                      />
                    )}
                    {userRole === RoomRole.Member && (
                      <RoomListMemberMenu
                        databaseId={room.databaseId}
                        onLeaveButtonClick={onLeaveButtonClick}
                      />
                    )}
                  </Group>
                </RoomTableRowForPhone>
              );
            })}
          </RoomTableHeaderForPhone>
          <Title order={4}>
            進行中のルーム
          </Title>
        </>
      )}
      <RoomTableHeaderForPhone>
        {rooms.map((room) => {
          if (!room || isInRoom(room, session?.userId ?? '')) return null;
          return (
            <RoomTableRowForPhone room={room} key={room.databaseId}>
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
            </RoomTableRowForPhone>
          );
        })}
      </RoomTableHeaderForPhone>
    </>
  );
};

export default RoomListForPhone;
