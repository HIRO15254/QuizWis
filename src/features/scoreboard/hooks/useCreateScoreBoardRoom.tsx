import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/router';
import React from 'react';

import { useCreateScoreBoardRoomMutation } from '../../../graphql/generated/type';
import useNotification from '../../../hooks/useNotification';
import CreateScoreBoardRoomModal, { CreateScoreBoardRoomFormType } from '../components/templates/modals/CreateScoreBoardRoomModal';

type UseCreateScoreBoardRoomProps = {
  onOpen?(): void;
  onClose?(): void;
};

const emptyInput: UseCreateScoreBoardRoomProps = {
  onOpen: () => {},
  onClose: () => {},
};

type UseCreateScoreBoardRoomReturn = [
  () => JSX.Element,
  {
    open(): void;
  },
];

/**
 * 得点表示ルームからの退出を利用するためのhook
 * @param input モーダル開閉時のコールバック関数
 * @returns [モーダルコンポーネント, { open: モーダルを開く関数 }]
 */
const useCreateScoreBoardRoom = (
  input: UseCreateScoreBoardRoomProps = emptyInput,
): UseCreateScoreBoardRoomReturn => {
  // 引数の展開
  const { onOpen, onClose } = input;
  // nextの機能
  const router = useRouter();
  // 状態管理用hook
  const [
    opened, { open: openModal, close: closeModal },
  ] = useDisclosure(false, { onOpen, onClose });
  // API通信用hook
  const [createScoreBoardRoom] = useCreateScoreBoardRoomMutation();
  // UI表示用hook
  const { errorNotification } = useNotification();

  /**
   * 実際に得点表示ルームの退出を行う関数
   * @param databaseId 退出する得点表示ルームのID
   */
  const create = async (value: CreateScoreBoardRoomFormType) => {
    const { name, password } = value;
    await createScoreBoardRoom({
      variables: {
        input: {
          name,
          password,
        },
      },
    }).catch((e) => {
      errorNotification({ message: e.message });
    }).then((ret) => {
      if (ret && !ret.errors) {
        router.push(`/scoreboard/${ret.data?.createScoreBoardRoom?.databaseId}`);
      }
    });
  };

  /**
   * 退出確認のモーダルを開く関数
   * @param databaseId 退出しようとしている得点表示ルームのID
   */
  const open = () => {
    openModal();
  };

  /**
   * 退出確認用のモーダルコンポーネント
   */
  const CreateScoreBoardRoomModalWithLogic = () => (
    <CreateScoreBoardRoomModal
      opened={opened}
      onClose={closeModal}
      onSubmit={create}
    />
  );

  return [CreateScoreBoardRoomModalWithLogic, { open }];
};

export default useCreateScoreBoardRoom;
