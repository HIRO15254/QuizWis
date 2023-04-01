import {
  Title,
  Paper,
  Stack,
} from '@mantine/core';
import { PageFC } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import DiscordLoginButton from '../../features/auth/components/DiscordLoginButton';
import GoogleLoginButton from '../../features/auth/components/GoogleLoginButton';

/**
 * ログインページ
 */
const LoginPage: PageFC = () => {
  const router = useRouter();
  const { callbackurl } = router.query;
  return (
    <Paper radius="md" shadow="sm" p="lg" m="auto" withBorder style={{ maxWidth: '480px' }}>
      <Title order={2} pt="sm">
        ログイン
      </Title>
      <Stack mb="md" mt="md">
        <GoogleLoginButton callback={callbackurl?.toString() ?? '/user/mypage'}>Google</GoogleLoginButton>
        <DiscordLoginButton callback={callbackurl?.toString() ?? '/user/mypage'}>Discord</DiscordLoginButton>
      </Stack>
    </Paper>
  );
};

LoginPage.getInitialProps = async () => ({
  title: 'ログイン - QuizWis',
  accessControl: 'public',
});

export default LoginPage;
