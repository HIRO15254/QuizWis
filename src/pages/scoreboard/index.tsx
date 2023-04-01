import {
  Button, Text, Paper, Group, Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { PageFC } from 'next';
import Router from 'next/router';
import { useSession } from 'next-auth/react';
import React from 'react';

import RoomList from '../../features/scoreboard/components/templates/RoomList';
import CreateRoomModal from '../../features/scoreboard/components/views/CreateRoomModal';
import { useGetActiveRoomsLazyQuery } from '../../graphql/generated/type';

/**
 * 得点表示ページ
 */
const ScoreBoardListPage: PageFC = () => {
  const { data: session } = useSession();
  const [getActiveRooms, { data: activeRooms, loading }] = useGetActiveRoomsLazyQuery();
  const [opened, { open, close }] = useDisclosure(false);

  React.useEffect(() => {
    getActiveRooms();
  }, []);

  const onRoomClick = (roomId: string) => {
    Router.push(`/scoreboard/${roomId}`);
  };

  if (!activeRooms?.getRooms) {
    return (
      <Text>
        読み込み中...
      </Text>
    );
  }

  return (
    <Group position="center" pb="sm">
      <Paper w="100%" maw={800} p="md">
        <Group position="apart" pb="sm">
          <Title order={3}>
            ルーム一覧
          </Title>
          <Button onClick={open}>
            ルームを作成
          </Button>
        </Group>
        <CreateRoomModal opened={opened} onClose={close} />
        <RoomList
          rooms={activeRooms?.getRooms}
          onRoomClick={onRoomClick}
        />
      </Paper>
    </Group>
  );
};

ScoreBoardListPage.getInitialProps = async () => ({
  title: '得点表示 - QuizWis',
  accessControl: 'authenticated',
});

export default ScoreBoardListPage;
