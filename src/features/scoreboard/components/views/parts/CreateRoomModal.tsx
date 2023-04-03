import {
  Button, Group, Modal, TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import React from 'react';

import { useCreateRoomMutation } from '../../../../../graphql/generated/type';

type CreateRoomModalProps = {
  opened: boolean;
  onClose: () => void;
};

type CreateRoomFormValueType = {
  name: string;
  password: string;
};

const CreateRoomModal = (props: CreateRoomModalProps) => {
  const { opened, onClose } = props;
  const router = useRouter();
  const [createRoom] = useCreateRoomMutation();

  const form = useForm({
    initialValues: {
      name: '',
      password: '',
    },
  });

  const handleSubmit = async (values: CreateRoomFormValueType) => {
    const ret = await createRoom({
      variables: {
        input: values,
      },
    });
    router.push(`/scoreboard/${ret.data?.createRoom?.databaseId}`);
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="新規ルーム作成">
      <form onSubmit={form.onSubmit(handleSubmit)}>
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

export default CreateRoomModal;
