import 'src/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import { Global, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

import Page from '../components/layouts/Page';
import apolloClient from '../lib/apollo';

import type { AppProps } from 'next/app';

/**
 * 全てのページの共通要素
 * 機能関係はここに書く
 */
const MyApp: React.FC<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <ApolloProvider client={apolloClient}>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: 'light',
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
      <Notifications />
      <Head>
        <title>{pageProps.title}</title>
      </Head>
      <SessionProvider session={session}>
        <Page
          accessControl={pageProps.accessControl}
          navbar={pageProps.navbar ?? true}
          header={pageProps.header ?? true}
        >
          <Component {...pageProps} />
        </Page>
      </SessionProvider>
    </MantineProvider>
  </ApolloProvider>
);

export default MyApp;
