import {
  Button, Group, Modal, TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';

type CreateScoreBoardRoomModalProps = {
  opened: boolean;
  onClose: () => void;
  onSubmit: (values: CreateScoreBoardRoomFormType) => void;
};

export type CreateScoreBoardRoomFormType = {
  name: string;
  password: string;
};

const CreateScoreBoardRoomModal = (props: CreateScoreBoardRoomModalProps) => {
  const { opened, onClose, onSubmit } = props;

  const form = useForm({
    initialValues: {
      name: '',
      password: '',
    },
  });

  return (
    <Modal opened={opened} onClose={onClose} title="新規ルーム作成">
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          mb="sm"
          label="ルーム名"
          withAsterisk
          {...form.getInputProps('name')}
        />
        <TextInput
          mb="sm"
          label="パスワード"
          description="パスワードを設定するとルームに入室する際に必要になります。"
          {...form.getInputProps('password')}
        />
        <Group position="right">
          <Button type="submit">
            作成
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default CreateScoreBoardRoomModal;
