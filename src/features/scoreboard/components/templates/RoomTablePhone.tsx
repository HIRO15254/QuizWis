import {
  Table, Text, ActionIcon, Popover,
} from '@mantine/core';
import { IconDoorEnter, IconLock } from '@tabler/icons-react';
import React from 'react';

import { RoomListProps } from './RoomTablePC';
import UserIcons from '../../../../components/templates/userIcons';

const RoomTablePhone = (props: RoomListProps) => {
  const { rooms, onRoomClick } = props;
  return (
    <Table styles={{ layout: 'fixed' }} w="100%">
      <thead>
        <tr>
          <th>ルーム名</th>
          <th style={{ width: '50px' }}>人数</th>
          <th style={{ width: '40px' }}>{}</th>
        </tr>
      </thead>
      <tbody>
        {rooms.map((room) => {
          if (!room) return null;
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
                    <Text>
                      {room.users.length}
                    </Text>
                  </Popover.Target>
                  <Popover.Dropdown p={0}>
                    <UserIcons users={room.users} size="sm" />
                  </Popover.Dropdown>
                </Popover>
              </td>
              <td>
                <ActionIcon
                  variant="outline"
                  color="blue"
                  onClick={() => onRoomClick(room.databaseId)}
                >
                  {room.hasPassword ? <IconLock size="1rem" /> : <IconDoorEnter size="1rem" />}
                </ActionIcon>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default RoomTablePhone;
