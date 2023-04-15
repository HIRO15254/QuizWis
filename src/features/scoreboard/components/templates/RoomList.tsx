import {
  MediaQuery,
} from '@mantine/core';
import React from 'react';

import RoomListPC, { RoomListProps } from './RoomListPC';
import RoomListPhone from './RoomListPhone';

const RoomList = (props: RoomListProps) => (
  <>
    <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
      <div>
        <RoomListPC {...props} />
      </div>
    </MediaQuery>
    <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
      <div>
        <RoomListPhone {...props} />
      </div>
    </MediaQuery>
  </>
);

export default RoomList;
