import { MantineProvider, Global } from '@mantine/core';
import React, { ReactNode } from 'react';

import useDarkTheme from '../hooks/useDarkTheme';

type StyleProviderProps = {
  children: ReactNode;
};

const StyleProvider = (props: StyleProviderProps) => {
  const [darkTheme] = useDarkTheme();
  const { children } = props;
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: darkTheme ? 'dark' : 'light',
      }}
    >
      <Global
        styles={(theme) => ({
          body: {
            backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        })}
      />
      { children }
    </MantineProvider>
  );
};

export default StyleProvider;
