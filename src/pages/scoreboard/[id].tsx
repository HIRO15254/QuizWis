import { PageFC } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const ScoreBoardPage: PageFC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>{`Scoreboard ${id}`}</h1>
    </div>
  );
};

ScoreBoardPage.getInitialProps = async () => ({
  title: '得点表示 - QuizWis',
  accessControl: 'authenticated',
});

export default ScoreBoardPage;
