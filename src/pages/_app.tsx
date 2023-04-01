import 'src/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import { Notifications } from '@mantine/notifications';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

import StyleProvider from './_style';
import Page from '../components/layouts/views/Page';
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
    <SessionProvider session={session}>
      <StyleProvider>
        <Notifications />
        <Head>
          <title>{pageProps.title}</title>
        </Head>
        <Page
          accessControl={pageProps.accessControl}
          navbar={pageProps.navbar ?? true}
          header={pageProps.header ?? true}
        >
          <Component {...pageProps} />
        </Page>
      </StyleProvider>
    </SessionProvider>
  </ApolloProvider>
);

export default MyApp;
