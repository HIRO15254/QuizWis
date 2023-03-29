import { Menu } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import React from 'react';

import useDarkTheme from '../../../hooks/useDarkTheme';

const DarkThemeItem = () => {
  const [darkTheme, switchDarkTheme] = useDarkTheme();

  return (
    <Menu.Item
      icon={darkTheme ? <IconCheck size="1rem" /> : undefined}
      onClick={switchDarkTheme}
    >
      ダークテーマ
    </Menu.Item>
  );
};

export default DarkThemeItem;
