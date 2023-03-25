import { Menu } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import React from 'react';

import { useUpdateUserDataMutation } from '../../../graphql/generated/type';

const DarkThemeItem = () => {
  const { data: session } = useSession();
  const [updateUserData] = useUpdateUserDataMutation();

  const handleClick = async () => {
    await updateUserData({
      variables: {
        input: {
          userId: session?.userData?.userId ?? '',
          isDarkTheme: !session?.userData?.isDarkTheme,
        },
      },
    });
    document.dispatchEvent(new Event('visibilitychange'));
  };
  return (
    <Menu.Item
      icon={session?.userData?.isDarkTheme ? <IconCheck size="1rem" /> : undefined}
      onClick={handleClick}
    >
      ダークテーマ
    </Menu.Item>
  );
};

export default DarkThemeItem;
