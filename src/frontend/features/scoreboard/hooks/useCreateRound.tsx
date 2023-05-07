import { useDisclosure } from '@mantine/hooks';
import React from 'react';

import useNotification from '../../../hooks/useNotification';
import CreateRoundModal, { CreateRoundFormType } from '../components/templates/modals/CreateRoundModal';

type UseCreateRoundProps = {
  onOpen?(): void;
  onClose?(): void;
};

const emptyInput: UseCreateRoundProps = {
  onOpen: () => {},
  onClose: () => {},
};

type UseCreateRoundReturn = [
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
const useCreateRound = (
  input: UseCreateRoundProps = emptyInput,
): UseCreateRoundReturn => {
  // 引数の展開
  const { onOpen, onClose } = input;
  // 状態管理用hook
  const [
    opened, { open: openModal, close: closeModal },
  ] = useDisclosure(false, { onOpen, onClose });
  // API通信用hook
  // UI表示用hook
  const { errorNotification } = useNotification();

  /**
   * 実際に得点表示ルームの退出を行う関数
   * @param databaseId 退出する得点表示ルームのID
   */
  const create = async (value: CreateRoundFormType) => null;

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
  const CreateRoundModalWithLogic = () => (
    <CreateRoundModal
      opened={opened}
      onClose={closeModal}
      onSubmit={create}
    />
  );

  return [CreateRoundModalWithLogic, { open }];
};

export default useCreateRound;
