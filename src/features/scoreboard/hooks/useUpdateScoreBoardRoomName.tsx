import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';

import { useGetScoreBoardRoomNameLazyQuery, useUpdateScoreBoardRoomMutation } from '../../../graphql/generated/type';
import useNotification from '../../../hooks/useNotification';
import UpdateScoreBoardRoomNameModal, { UpdateScoreBoardRoomNameFormType } from '../components/views/parts/UpdateScoreBoardRoomNameModal';

type UseUpdateScoreBoardRoomNameProps = {
  onOpen?(): void;
  onClose?(): void;
};

const emptyInput: UseUpdateScoreBoardRoomNameProps = {
  onOpen: () => {},
  onClose: () => {},
};

type UseUpdateScoreBoardRoomNameReturn = [
  () => JSX.Element,
  {
    open(databaseId: string): void;
  },
];

/**
 * 得点表示ルームの名称変更モーダルを利用するためのhook
 * @param input モーダル開閉時のコールバック関数
 * @returns [モーダルコンポーネント, { open: モーダルを開く関数 }]
 */
const useUpdateScoreBoardRoomName = (
  input: UseUpdateScoreBoardRoomNameProps = emptyInput,
): UseUpdateScoreBoardRoomNameReturn => {
  // 引数の展開
  const { onOpen, onClose } = input;
  // 状態管理用hook
  const [
    opened, { open: openModal, close: closeModal },
  ] = useDisclosure(false, { onOpen, onClose });
  const [roomDatabaseId, setRoomDatabaseId] = useState<string>('');
  const [roomName, setRoomName] = useState<string>('');
  // API通信用hook
  const [updateScoreBoardRoom] = useUpdateScoreBoardRoomMutation();
  const [getScoreBoardRoomName] = useGetScoreBoardRoomNameLazyQuery();
  // UI表示用hook
  const { errorNotification, successNotification } = useNotification();

  /**
   * 実際に名称の更新を行う関数
   * @param databaseId 退出する得点表示ルームのID
   */
  const update = async (value: UpdateScoreBoardRoomNameFormType) => {
    const { name } = value;
    await updateScoreBoardRoom({
      variables: {
        input: {
          databaseId: roomDatabaseId,
          name,
        },
      },
    }).catch((e) => {
      errorNotification({ message: e.message });
    }).then((ret) => {
      if (ret && !ret.errors) {
        successNotification({ message: 'ルーム名を変更しました' });
        closeModal();
      }
    });
  };

  /**
   * 名称変更のモーダルを開く関数
   * @param databaseId 退出しようとしている得点表示ルームのID
   */
  const open = (databaseId: string) => {
    setRoomDatabaseId(databaseId);
    getScoreBoardRoomName({
      variables: {
        input: {
          databaseId,
        },
      },
    }).then((ret) => {
      if (ret && !ret.error) {
        setRoomName(ret.data?.getScoreBoardRoom?.name || '');
        openModal();
      }
    });
  };

  /**
   * 名称変更用のモーダルコンポーネント
   */
  const UpdateScoreBoardRoomNameModalWithLogic = () => (
    <UpdateScoreBoardRoomNameModal
      opened={opened}
      onClose={closeModal}
      onSubmit={update}
      initialName={roomName}
    />
  );

  return [UpdateScoreBoardRoomNameModalWithLogic, { open }];
};

export default useUpdateScoreBoardRoomName;
