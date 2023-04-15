import {
  Button, Group, Modal, TextInput,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import React from 'react';

type UpdateScoreBoardRoomNameModalProps = {
  opened: boolean;
  initialName: string;
  onClose: () => void;
  onSubmit: (values: UpdateScoreBoardRoomNameFormType) => void;
};

export type UpdateScoreBoardRoomNameFormType = {
  name: string;
};

const UpdateScoreBoardRoomNameModal = (props: UpdateScoreBoardRoomNameModalProps) => {
  const {
    opened, onClose, onSubmit, initialName,
  } = props;

  const form = useForm({
    initialValues: {
      name: initialName || '',
    },
    validate: {
      name: isNotEmpty('ルーム名を入力してください'),
    },
    validateInputOnBlur: true,
  });

  return (
    <Modal opened={opened} onClose={onClose} title="ルーム名変更">
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          mb="sm"
          label="ルーム名"
          withAsterisk
          {...form.getInputProps('name')}
        />
        <Group position="right">
          <Button type="submit">
            変更
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default UpdateScoreBoardRoomNameModal;
