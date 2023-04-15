import {
  Button, Group, Modal, Text,
} from '@mantine/core';
import React from 'react';

type LeaveScoreBoardRoomModalProps = {
  opened: boolean;
  onClose: () => void;
  onLeaveButtonClick: () => void;
};

const LeaveScoreBoardRoomModal = (props: LeaveScoreBoardRoomModalProps) => {
  const {
    opened, onClose, onLeaveButtonClick,
  } = props;

  return (
    <Modal opened={opened} onClose={onClose} title="ルーム退出">
      <Text mb="md">
        ルームを退出しますか？
        <br />
        入室しなおすためにはパスワードを再度入力する必要があります。
      </Text>
      <Group position="right">
        <Button onClick={onClose} color="gray">キャンセル</Button>
        <Button onClick={onLeaveButtonClick} variant="outline" color="red">退出</Button>
      </Group>
    </Modal>
  );
};

export default LeaveScoreBoardRoomModal;
