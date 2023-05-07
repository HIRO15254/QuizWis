import {
  MediaQuery,
} from '@mantine/core';
import React from 'react';

import RoomListForPc, { RoomListProps } from './RoomListForPc';
import RoomListForPhone from './RoomListForPhone';

const ScoreBoardRoomList = (props: RoomListProps) => (
  <>
    <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
      <div>
        <RoomListForPc {...props} />
      </div>
    </MediaQuery>
    <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
      <div>
        <RoomListForPhone {...props} />
      </div>
    </MediaQuery>
  </>
);

export default ScoreBoardRoomList;
