import { PageFC } from 'next';
import React from 'react';

import RoomListView from '../../features/scoreboard/components/views/RoomListView';

/**
 * 得点表示ページ
 */
const ScoreBoardListPage: PageFC = () => (
  <RoomListView />
);

ScoreBoardListPage.getInitialProps = async () => ({
  title: '得点表示 - QuizWis',
  accessControl: 'authenticated',
});

export default ScoreBoardListPage;
