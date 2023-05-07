import {
  ActionIcon, Divider, Group, Paper, SimpleGrid, Space, Tabs, Title, Text, Center, Button, Stack,
} from '@mantine/core';
import { useFullscreen } from '@mantine/hooks';
import { IconArrowsDiagonal } from '@tabler/icons-react';
import React from 'react';

import ScoreBoardRoomUserList from './ScoreBoardRoomUserList';
import { useGetScoreBoardRoomDataQuery } from '../../../../gql';
import useCreateRound from '../../hooks/useCreateRound';

type ScoreBoardRoomViewProps = {
  databaseId: string;
};

const ScoreBoardRoomView = (props: ScoreBoardRoomViewProps) => {
  const { databaseId } = props;
  const { ref, toggle } = useFullscreen();
  const [CreateRoundModal, { open: createRound }] = useCreateRound();

  const { data: queryData } = useGetScoreBoardRoomDataQuery({
    variables: {
      input: {
        databaseId,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const data = queryData?.getScoreBoardRoom;

  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <Paper w="100%" p="lg" h="100%" ref={ref}>
      <CreateRoundModal />
      <Title order={2}>
        {data.name}
      </Title>
      <Tabs defaultValue="scoreBoard" mt={-20} h="100%">
        <Tabs.List position="right">
          <Tabs.Tab value="scoreBoard">得点状況</Tabs.Tab>
          <Tabs.Tab value="userList">参加者一覧</Tabs.Tab>
          {data.isOwner && (
            <Tabs.Tab value="settings">設定</Tabs.Tab>
          )}
          <Space w="sm" />
          <ActionIcon>
            <IconArrowsDiagonal onClick={toggle} />
          </ActionIcon>
        </Tabs.List>

        <Tabs.Panel value="scoreBoard" w="100%">
          {!data.round && (
            <Center p="md">
              <Stack align="center" spacing="xs">
                <Text>
                  現在進行中のラウンドはありません
                </Text>
                <Button onClick={createRound}>
                  ラウンドを開始する
                </Button>
              </Stack>
            </Center>
          )}
          {data.round && (
            <>
              <Group position="apart" p="md">
                <Title order={2}>
                  Rule_Name
                </Title>
                <Title order={2}>
                  ima_1問目
                </Title>
              </Group>
              <Divider />
              <SimpleGrid cols={2} spacing="sm">
                <Paper p="sm">
                  <Title order={3}>
                    1問目
                  </Title>
                </Paper>
              </SimpleGrid>
            </>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="userList">
          <ScoreBoardRoomUserList users={data.users ?? []} />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
};

export default ScoreBoardRoomView;
