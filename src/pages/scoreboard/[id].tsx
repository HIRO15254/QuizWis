import { PageFC } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import ScoreBoardRoomView from '../../features/scoreboard/components/views/ScoreBoardRoomView';

const ScoreBoardPage: PageFC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <ScoreBoardRoomView databaseId={id as string} />
  );
};

ScoreBoardPage.getInitialProps = async () => ({
  title: '得点表示 - QuizWis',
  accessControl: 'authenticated',
});

export default ScoreBoardPage;
