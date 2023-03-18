import { Text } from '@mantine/core';
import { PageFC } from 'next';
import React from 'react';
/**
 * メインページ
 */
const Home: PageFC = () => (
  <Text>
    Hello World
  </Text>
);

Home.getInitialProps = async () => ({
  title: 'QuizWis',
  accessControl: 'public',
});

export default Home;
