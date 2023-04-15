import {
  Table, Text, ActionIcon, Popover, Group, Button, Title,
} from '@mantine/core';
import { IconDoorEnter, IconDoorExit, IconLock } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import React from 'react';

import {
  RoomListProps, RoomTableTrProps, RoomTableWithHeaderProps, inAnyRoom, isInRoom,
} from './RoomListPC';
import UserIcons from '../../../../components/templates/userIcons';

const RoomTablePhoneWithHeader = (props: RoomTableWithHeaderProps) => {
  const { children } = props;
  return (
    <Table styles={{ layout: 'fixed' }} w="100%" mb="lg">
      <thead>
        <tr>
          <th>ルーム名</th>
          <th style={{ width: '50px' }} align="center">人数</th>
          <th style={{ width: '100px' }}>{}</th>
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </Table>
  );
};

const RoomTablePhoneTr = (props: RoomTableTrProps) => {
  const { room, children } = props;
  return (
    <tr key={room.databaseId}>
      <td>
        <Text>
          {room.name}
        </Text>
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

const RoomListPhone = (props: RoomListProps) => {
  const { data: session } = useSession();
  const {
    rooms, onJoinButtonClick, onMoveButtonClick, onLeaveButtonClick,
  } = props;
  return (
    <>
      {inAnyRoom(rooms, session?.userData.userId ?? '') && (
        <>
          <Title order={4}>
            参加中のルーム
          </Title>
          <RoomTablePhoneWithHeader>
            {rooms.map((room) => {
              if (!room) return null;
              if (!isInRoom(room, session?.userData.userId ?? '')) return null;
              return (
                <RoomTablePhoneTr room={room} key={room.databaseId}>
                  <Group position="left">
                    <ActionIcon
                      variant="outline"
                      color="blue"
                      onClick={() => onMoveButtonClick(room.databaseId)}
                    >
                      <IconDoorEnter size="1rem" />
                    </ActionIcon>
                    <ActionIcon
                      variant="outline"
                      color="red"
                      onClick={() => onLeaveButtonClick(room.databaseId)}
                    >
                      <IconDoorExit size="1rem" />
                    </ActionIcon>
                  </Group>
                </RoomTablePhoneTr>
              );
            })}
          </RoomTablePhoneWithHeader>
          <Title order={4}>
            進行中のルーム
          </Title>
        </>
      )}
      <RoomTablePhoneWithHeader>
        {rooms.map((room) => {
          if (!room) return null;
          if (isInRoom(room, session?.userData.userId ?? '')) return null;
          return (
            <RoomTablePhoneTr room={room} key={room.databaseId}>
              <Group position="left">
                <Button
                  leftIcon={room.hasPassword ? <IconLock size="1rem" /> : <IconDoorEnter size="1rem" />}
                  onClick={() => onJoinButtonClick(room.databaseId, room.hasPassword)}
                  variant="outline"
                  size="xs"
                >
                  参加
                </Button>
              </Group>
            </RoomTablePhoneTr>
          );
        })}
      </RoomTablePhoneWithHeader>
    </>
  );
};

export default RoomListPhone;
