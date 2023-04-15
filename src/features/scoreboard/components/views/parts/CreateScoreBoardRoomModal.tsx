import {
  Button, Group, Modal, PasswordInput, TextInput,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
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

  const ScoreBoardRoomPassWordValidator = (value: string) => {
    const { length } = value;
    if (length === 0) {
      return null;
    }
    if (length < 6 || length > 128) {
      return 'パスワードは6文字以上128文字以内で入力してください。';
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
      return 'パスワードに使用できない文字が含まれています。';
    }
    return null;
  };

  const form = useForm({
    initialValues: {
      name: '',
      password: '',
    },
    validate: {
      name: isNotEmpty('ルーム名を入力してください'),
      password: ScoreBoardRoomPassWordValidator,
    },
    validateInputOnBlur: true,
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
        <PasswordInput
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
