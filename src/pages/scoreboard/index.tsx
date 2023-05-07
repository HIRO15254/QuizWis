import { PageFC } from 'next';
import React from 'react';

import ScoreBoardRoomListView from '../../frontend/features/scoreboard/components/views/ScoreBoardRoomListView';

/**
 * 得点表示ページ
 */
const ScoreBoardListPage: PageFC = () => (
  <ScoreBoardRoomListView />
);

ScoreBoardListPage.getInitialProps = async () => ({
  title: '得点表示 - QuizWis',
  accessControl: 'authenticated',
});

export default ScoreBoardListPage;
