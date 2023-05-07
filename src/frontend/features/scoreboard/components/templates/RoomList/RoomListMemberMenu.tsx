import { Menu, ActionIcon } from '@mantine/core';
import {
  IconDotsVertical,
} from '@tabler/icons-react';
import React from 'react';

type ScoreBoardRoomListMemberMenuProps = {
  databaseId: string;
  onLeaveButtonClick: (databaseId: string) => void;
};

const RoomListMemberMenu = (props: ScoreBoardRoomListMemberMenuProps) => {
  const {
    databaseId,
    onLeaveButtonClick,
  } = props;
  return (
    <Menu shadow="md" position="bottom" withArrow>
      <Menu.Target>
        <ActionIcon>
          <IconDotsVertical size="1rem" />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() => onLeaveButtonClick(databaseId)}
          color="red"
        >
          退出
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default RoomListMemberMenu;
