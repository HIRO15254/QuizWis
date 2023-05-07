import {
  Button, Group, Modal, TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useEffect } from 'react';

type JoinScoreBoardRoomModalProps = {
  opened: boolean;
  onClose: () => void;
  onJoinButtonClick: () => void;
};

const JoinScoreBoardRoomModal = (props: JoinScoreBoardRoomModalProps) => {
  const { opened, onClose, onJoinButtonClick } = props;

  const form = useForm({
    initialValues: {
      password: '',
    },
  });

  useEffect(() => {
    form.reset();
  }, [opened]);

  return (
    <Modal opened={opened} onClose={onClose} title="ルームに参加する">
      <form onSubmit={form.onSubmit(onJoinButtonClick)}>
        <TextInput
          mb="sm"
          label="パスワード"
          {...form.getInputProps('password')}
        />
        <Group position="right">
          <Button type="submit">
            参加
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default JoinScoreBoardRoomModal;
