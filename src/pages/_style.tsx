import { MantineProvider, Global } from '@mantine/core';
import { useSession } from 'next-auth/react';
import React, { ReactNode } from 'react';

type StyleProviderProps = {
  children: ReactNode;
};

const StyleProvider = (props: StyleProviderProps) => {
  const { data: session } = useSession();
  const { children } = props;
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: session?.isDarkTheme ? 'dark' : 'light',
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
