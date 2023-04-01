import {
  MediaQuery,
} from '@mantine/core';
import React from 'react';

import RoomTablePC, { RoomListProps } from './RoomTablePC';
import RoomTablePhone from './RoomTablePhone';

const RoomList = (props: RoomListProps) => (
  <>
    <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
      <div>
        <RoomTablePC {...props} />
      </div>
    </MediaQuery>
    <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
      <div>
        <RoomTablePhone {...props} />
      </div>
    </MediaQuery>
  </>
);

export default RoomList;
