import {
  Group, Paper, Title, Button, ActionIcon, LoadingOverlay,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconReload } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import CreateRoomModal from './parts/CreateRoomModal';
import { useGetActiveRoomsLazyQuery } from '../../../../graphql/generated/type';
import RoomList from '../templates/RoomList';

const RoomListView = () => {
  const [getActiveRooms, { data: activeRooms, loading }] = useGetActiveRoomsLazyQuery();
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();

  useEffect(() => {
    getActiveRooms();
  }, []);

  const onRoomClick = (roomId: string) => {
    router.push(`/scoreboard/${roomId}`);
  };

  return (
    <Group position="center" pb="sm">
      <Paper w="100%" maw={800} p="md">
        <LoadingOverlay visible={loading} />
        <Group position="apart" pb="sm">
          <Title order={3}>
            ルーム一覧
          </Title>
          <Group>
            <ActionIcon onClick={() => getActiveRooms()} size="lg" variant="outline">
              <IconReload />
            </ActionIcon>
            <Button onClick={open}>
              ルームを作成
            </Button>
          </Group>
        </Group>
        <CreateRoomModal opened={opened} onClose={close} />
        <RoomList
          rooms={activeRooms?.getRooms ?? []}
          onRoomClick={onRoomClick}
        />
      </Paper>
    </Group>
  );
};

export default RoomListView;
