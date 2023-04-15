import {
  MediaQuery,
} from '@mantine/core';
import React from 'react';

import ScoreBoardRoomListForPc, { RoomListProps } from './ScoreBoardRoomListForPc';
import ScoreBoardRoomListForPhone from './ScoreBoardRoomListForPhone';

const ScoreBoardRoomList = (props: RoomListProps) => (
  <>
    <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
      <div>
        <ScoreBoardRoomListForPc {...props} />
      </div>
    </MediaQuery>
    <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
      <div>
        <ScoreBoardRoomListForPhone {...props} />
      </div>
    </MediaQuery>
  </>
);

export default ScoreBoardRoomList;
