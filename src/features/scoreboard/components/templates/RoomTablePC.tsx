import {
  Table, Text, Button,
} from '@mantine/core';
import { IconDoorEnter, IconLock } from '@tabler/icons-react';
import React from 'react';

import UserIcons from '../../../../components/templates/userIcons';

type RoomProps = {
  databaseId: string;
  name: string;
  hasPassword: boolean;
  users : {
    databaseId: string;
    iconUrl?: string | null;
  }[]
};

export type RoomListProps = {
  rooms: (RoomProps | null)[]
  onRoomClick: (roomId: string) => void;
};

const RoomTablePC = (props: RoomListProps) => {
  const { rooms, onRoomClick } = props;
  return (
    <Table styles={{ layout: 'fixed' }} w="100%" highlightOnHover>
      <thead>
        <tr>
          <th>ルーム名</th>
          <th style={{ width: '220px' }}>参加者</th>
          <th style={{ width: '80px' }}>{}</th>
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
                <UserIcons users={room.users} />
              </td>
              <td>
                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={room.hasPassword ? <IconLock size="1.0rem" /> : <IconDoorEnter size="1rem" />}
                  onClick={() => onRoomClick(room.databaseId)}
                >
                  参加
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default RoomTablePC;
