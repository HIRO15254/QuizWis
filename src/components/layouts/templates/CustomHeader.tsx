import {
  Header, Button, Group, Title,
} from '@mantine/core';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import React from 'react';

/**
 * 画面上部に表示するヘッダー
 * TODO: ログイン時の表示をどうにかする
 */
const CustomHeader = () => {
  const { data: session } = useSession();
  return (
    <Header
      height="60px"
      px="md"
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <Link href="/" passHref>
        <Title order={3}>QuizWis</Title>
      </Link>
      <Group>
        {!session && (
          <Button variant="outline" color="blue" component="a" href="/auth/login">
            ログイン
          </Button>
        )}
        {session && (
          <Button variant="outline" color="blue" component="a" href="/user/mypage">
            マイページ
          </Button>
        )}
      </Group>
    </Header>
  );
};

export default CustomHeader;
