import { Menu, ActionIcon } from '@mantine/core';
import {
  IconDotsVertical,
} from '@tabler/icons-react';
import React from 'react';

type ScoreBoardRoomListOwnerMenuProps = {
  databaseId: string;
  onLeaveButtonClick: (databaseId: string) => void;
  onDeleteButtonClick: (databaseId: string) => void;
  onUpdateNameButtonClick: (databaseId: string) => void;
};

const ScoreBoardRoomListOwnerMenu = (props: ScoreBoardRoomListOwnerMenuProps) => {
  const {
    databaseId,
    onLeaveButtonClick,
    onDeleteButtonClick,
    onUpdateNameButtonClick,
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
          onClick={() => onUpdateNameButtonClick(databaseId)}
        >
          ルーム名変更
        </Menu.Item>
        <Menu.Item
          onClick={() => onLeaveButtonClick(databaseId)}
          color="red"
        >
          退出
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          onClick={() => onDeleteButtonClick(databaseId)}
          color="red"
        >
          削除
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ScoreBoardRoomListOwnerMenu;
