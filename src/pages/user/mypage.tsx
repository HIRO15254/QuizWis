import { Text } from '@mantine/core';
import { PageFC } from 'next';
import { useSession } from 'next-auth/react';
import React from 'react';

/**
 * ログインページ
 */
const MyPage: PageFC = () => {
  const { data: session } = useSession();

  return (
    <div>
      <Text>
        { session?.user?.name }
      </Text>
    </div>
  );
};

MyPage.getInitialProps = async () => ({
  title: 'マイページ - QuizWis',
  accessControl: 'authenticated',
});

export default MyPage;
