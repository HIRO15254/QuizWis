import {
  Header, Button, Group, Title, Text,
} from '@mantine/core';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import React from 'react';

/**
 * デフォルトのヘッダー
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
          <Text component="a" href="/user/mypage">
            {session.user?.name}
          </Text>
        )}
      </Group>
    </Header>
  );
};

export default CustomHeader;
