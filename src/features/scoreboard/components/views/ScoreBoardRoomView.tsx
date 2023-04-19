import {
  ActionIcon, Divider, Group, Paper, SimpleGrid, Space, Tabs, Title,
} from '@mantine/core';
import { useFullscreen } from '@mantine/hooks';
import { IconArrowsDiagonal } from '@tabler/icons-react';
import React from 'react';

import ScoreBoardRoomUserList from './ScoreBoardRoomUserList';
import { useGetScoreBoardRoomDataQuery } from '../../../../graphql/generated/type';

type ScoreBoardRoomViewProps = {
  databaseId: string;
};

const ScoreBoardRoomView = (props: ScoreBoardRoomViewProps) => {
  const { databaseId } = props;
  const { ref, toggle } = useFullscreen();

  const { data } = useGetScoreBoardRoomDataQuery({
    variables: {
      input: {
        databaseId,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  return (
    <Paper w="100%" p="lg" h="100%" ref={ref}>
      <Title order={4}>
        Room:
        {' '}
        {databaseId}
      </Title>
      <Tabs defaultValue="scoreBoard" mt={-20}>
        <Tabs.List position="right">
          <Tabs.Tab value="scoreBoard">得点状況</Tabs.Tab>
          <Tabs.Tab value="userList">参加者一覧</Tabs.Tab>
          <Space w="sm" />
          <ActionIcon>
            <IconArrowsDiagonal onClick={toggle} />
          </ActionIcon>
        </Tabs.List>

        <Tabs.Panel value="scoreBoard">
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
        </Tabs.Panel>

        <Tabs.Panel value="userList">
          <ScoreBoardRoomUserList users={data?.getScoreBoardRoom?.users ?? []} />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
};

export default ScoreBoardRoomView;
