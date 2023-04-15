import {
  Button, Group, Modal, Text,
} from '@mantine/core';
import React from 'react';

type DeleteScoreBoardRoomModalProps = {
  opened: boolean;
  onClose: () => void;
  onDeleteButtonClick: () => Promise<void>;
};

const DeleteScoreBoardRoomModal = (props: DeleteScoreBoardRoomModalProps) => {
  const {
    opened, onClose, onDeleteButtonClick,
  } = props;

  const deleteButtonHandle = async () => {
    await onDeleteButtonClick();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="ルーム削除">
      <Text mb="md">
        ルームを削除しますか？
        <br />
        現在行われているラウンドがある場合は強制的に終了され、ルーム内のすべてのユーザーも退出します。
      </Text>
      <Group position="right">
        <Button onClick={onClose} color="gray">キャンセル</Button>
        <Button onClick={deleteButtonHandle} variant="outline" color="red">削除</Button>
      </Group>
    </Modal>
  );
};

export default DeleteScoreBoardRoomModal;
