import {
  Header, Button, Group, Title, Burger, MediaQuery,
} from '@mantine/core';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import React from 'react';

type CustomHeaderProps = {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  isPublicPage: boolean;
};

/**
 * 画面上部に表示するヘッダー
 * TODO: ログイン時の表示をどうにかする
 */
const CustomHeader = (props: CustomHeaderProps) => {
  const { opened, setOpened, isPublicPage } = props;
  const { data: session } = useSession();
  return (
    <Header
      height="60px"
      px="md"
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <Group>
        {!isPublicPage && (
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            mr="xl"
          />
        </MediaQuery>
        )}
        <Link href="/" passHref>
          <Title order={3}>QuizWis</Title>
        </Link>
      </Group>
      <Group>
        {(isPublicPage && !session) && (
        <Button color="blue" component="a" href="/auth/login">
          ログイン
        </Button>
        )}
        {(isPublicPage && session) && (
        <Button variant="outline" color="blue" component="a" href="/user/mypage">
          マイページ
        </Button>
        )}
      </Group>
    </Header>
  );
};

export default CustomHeader;
