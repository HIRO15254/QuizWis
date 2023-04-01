import { useRouter } from 'next/router';
import React from 'react';

const ScoreBoardPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>{`Scoreboard ${id}`}</h1>
    </div>
  );
};

export default ScoreBoardPage;
