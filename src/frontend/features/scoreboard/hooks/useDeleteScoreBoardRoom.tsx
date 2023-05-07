import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { useDeleteScoreBoardRoomMutation } from '../../../graphql/generated/type';
import useNotification from '../../../hooks/useNotification';
import DeleteScoreBoardRoomModal from '../components/templates/modals/DeleteScoreBoardRoomModal';

type UseDeleteScoreBoardRoomProps = {
  onOpen?(): void;
  onClose?(): void;
};

const emptyInput: UseDeleteScoreBoardRoomProps = {
  onOpen: () => {},
  onClose: () => {},
};

type UseDeleteScoreBoardRoomReturn = [
  () => JSX.Element,
  {
    open(databaseId: string): void;
  },
];

/**
 * 得点表示ルームからの退出を利用するためのhook
 * @param input モーダル開閉時のコールバック関数
 * @returns [モーダルコンポーネント, { open: モーダルを開く関数 }]
 */
const useDeleteScoreBoardRoom = (
  input: UseDeleteScoreBoardRoomProps = emptyInput,
): UseDeleteScoreBoardRoomReturn => {
  // 引数の展開
  const { onOpen, onClose } = input;
  // nextの機能
  const router = useRouter();
  // 状態管理用hook
  const [
    opened, { open: openModal, close: closeModal },
  ] = useDisclosure(false, { onOpen, onClose });
  const [roomDatabaseId, setRoomDatabaseId] = useState<string>('');
  // API通信用hook
  const [deleteScoreBoardRoomMutation] = useDeleteScoreBoardRoomMutation();
  // UI表示用hook
  const { errorNotification, successNotification } = useNotification();

  /**
   * 実際に得点表示ルームの退出を行う関数
   * @param databaseId 退出する得点表示ルームのID
   */
  const deleteHandle = async (databaseId: string) => {
    await deleteScoreBoardRoomMutation({
      variables: {
        input: {
          databaseId,
        },
      },
    }).catch((e) => {
      errorNotification({ message: e.message });
    }).then((ret) => {
      if (ret && !ret.errors) {
        successNotification({ message: 'ルームを削除しました' });
        router.push('/scoreboard');
      }
    });
  };

  /**
   * 退出確認のモーダルを開く関数
   * @param databaseId 退出しようとしている得点表示ルームのID
   */
  const open = (databaseId: string) => {
    setRoomDatabaseId(databaseId);
    openModal();
  };

  /**
   * 退出確認用のモーダルコンポーネント
   */
  const DeleteScoreBoardRoomModalWithLogic = () => (
    <DeleteScoreBoardRoomModal
      opened={opened}
      onClose={closeModal}
      onDeleteButtonClick={() => deleteHandle(roomDatabaseId)}
    />
  );

  return [DeleteScoreBoardRoomModalWithLogic, { open }];
};

export default useDeleteScoreBoardRoom;
