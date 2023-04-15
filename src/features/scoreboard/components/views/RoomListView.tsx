import {
  Group, Paper, Title, Button, ActionIcon, LoadingOverlay,
} from '@mantine/core';
import { IconReload } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useGetScoreBoardRoomsLazyQuery } from '../../../../graphql/generated/type';
import useNotification from '../../../../hooks/useNotification';
import useCreateScoreBoardRoom from '../../hooks/useCreateScoreBoardRoom';
import useJoinScoreBoardRoom from '../../hooks/useJoinScoreBoardRoom';
import useLeaveScoreBoardRoom from '../../hooks/useLeaveScoreBoardRoom';
import RoomList from '../templates/RoomList';

const RoomListView = () => {
  const [getActiveRooms, { data: activeRooms, loading }] = useGetScoreBoardRoomsLazyQuery({ fetchPolicy: 'cache-and-network' });
  const [
    CreateScoreBoardRoomModal, { open: createScoreBoardRoom },
  ] = useCreateScoreBoardRoom();
  const [
    LeaveScoreBoardRoomModal, { open: leaveScoreBoardRoom },
  ] = useLeaveScoreBoardRoom({ onClose: getActiveRooms });
  const [
    JoinRoomWithPasswordModal, { open: joinScoreBoardRoom },
  ] = useJoinScoreBoardRoom();

  const { errorNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    getActiveRooms().catch((e) => {
      errorNotification(e);
    });
  }, []);

  const onMoveButtonClick = (roomId: string) => {
    router.push(`/scoreboard/${roomId}`);
  };

  return (
    <Group position="center" pb="sm">
      <Paper w="100%" maw={800} p="md">
        <LoadingOverlay visible={loading} />
        <CreateScoreBoardRoomModal />
        <LeaveScoreBoardRoomModal />
        <JoinRoomWithPasswordModal />
        <Group position="apart" pb="sm">
          <Title order={3}>
            ルーム一覧
          </Title>
          <Group>
            <ActionIcon onClick={() => getActiveRooms()} size="lg" variant="outline">
              <IconReload />
            </ActionIcon>
            <Button onClick={createScoreBoardRoom}>
              ルームを作成
            </Button>
          </Group>
        </Group>
        <RoomList
          rooms={activeRooms?.getScoreBoardRooms ?? []}
          onJoinButtonClick={(roomId) => joinScoreBoardRoom(roomId)}
          onMoveButtonClick={onMoveButtonClick}
          onLeaveButtonClick={(roomId) => leaveScoreBoardRoom(roomId)}
        />
      </Paper>
    </Group>
  );
};

export default RoomListView;
