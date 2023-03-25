import { Group, Paper, Tabs } from '@mantine/core';
import { PageFC } from 'next';
import React from 'react';

import BasicUserSettingForm from '../../features/user/components/BasicUserSettingForm';
import IconUploader from '../../features/user/components/IconUploader';

/**
 * ログインページ
 */
const MyPage: PageFC = () => (
  <Group position="center">
    <Paper p="md" maw={600} w="80%">
      <Tabs defaultValue="basic">
        <Tabs.List>
          <Tabs.Tab value="basic">基本設定</Tabs.Tab>
          <Tabs.Tab value="icon">アイコン設定</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="basic" pt="xs">
          <BasicUserSettingForm />
        </Tabs.Panel>

        <Tabs.Panel value="icon" pt="xs">
          <IconUploader />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  </Group>
);

MyPage.getInitialProps = async () => ({
  title: 'ユーザー設定 - QuizWis',
  accessControl: 'authenticated',
});

export default MyPage;
