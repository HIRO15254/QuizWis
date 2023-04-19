import {
  Group, Paper, Title, Button, ActionIcon, LoadingOverlay,
} from '@mantine/core';
import { IconReload } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useGetScoreBoardRoomsLazyQuery } from '../../../../graphql/generated/type';
import useNotification from '../../../../hooks/useNotification';
import useCreateScoreBoardRoom from '../../hooks/useCreateScoreBoardRoom';
import useDeleteScoreBoardRoom from '../../hooks/useDeleteScoreBoardRoom';
import useJoinScoreBoardRoom from '../../hooks/useJoinScoreBoardRoom';
import useLeaveScoreBoardRoom from '../../hooks/useLeaveScoreBoardRoom';
import useUpdateScoreBoardRoomName from '../../hooks/useUpdateScoreBoardRoomName';
import ScoreBoardRoomList from '../templates/scoreBoardRoomList/ScoreBoardRoomList';

const ScoreBoardRoomListView = () => {
  const [getActiveRooms, { data: activeRooms, loading }] = useGetScoreBoardRoomsLazyQuery({ fetchPolicy: 'cache-and-network' });
  const [CreateScoreBoardRoomModal, { open: createScoreBoardRoom }] = useCreateScoreBoardRoom();
  const [JoinRoomWithPasswordModal, { open: joinScoreBoardRoom }] = useJoinScoreBoardRoom();
  const [
    UpdateScoreBoardRoomNameModal, { open: updateScoreBoardRoomName },
  ] = useUpdateScoreBoardRoomName({ onClose: getActiveRooms });
  const [
    DeleteScoreBoardRoomModal, { open: deleteScoreBoardRoom },
  ] = useDeleteScoreBoardRoom({ onClose: getActiveRooms });
  const [
    LeaveScoreBoardRoomModal, { open: leaveScoreBoardRoom },
  ] = useLeaveScoreBoardRoom({ onClose: getActiveRooms });

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
        <DeleteScoreBoardRoomModal />
        <UpdateScoreBoardRoomNameModal />
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
        <ScoreBoardRoomList
          rooms={activeRooms?.getScoreBoardRooms ?? []}
          onJoinButtonClick={(roomId) => joinScoreBoardRoom(roomId)}
          onMoveButtonClick={onMoveButtonClick}
          onLeaveButtonClick={(roomId) => leaveScoreBoardRoom(roomId)}
          onDeleteButtonClick={(roomId) => deleteScoreBoardRoom(roomId)}
          onUpdateNameButtonClick={(roomId) => updateScoreBoardRoomName(roomId)}
        />
      </Paper>
    </Group>
  );
};

export default ScoreBoardRoomListView;
