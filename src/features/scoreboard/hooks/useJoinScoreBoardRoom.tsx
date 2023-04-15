import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { useGetScoreBoardRoomHasPasswordLazyQuery, useJoinScoreBoardRoomMutation } from '../../../graphql/generated/type';
import useNotification from '../../../hooks/useNotification';
import JoinScoreBoardRoomModal from '../components/views/parts/JoinScoreBoardRoomModal';

type UseJoinScoreBoardRoomProps = {
  onOpen?(): void;
  onClose?(): void;
};

const emptyInput: UseJoinScoreBoardRoomProps = {
  onOpen: () => {},
  onClose: () => {},
};

type UseJoinScoreBoardRoomReturn = [
  () => JSX.Element,
  {
    open(databaseId: string): void;
  },
];

/**
 * 得点表示ルームに参加するめのhook
 * @param input モーダル開閉時のコールバック関数
 * @returns [モーダルコンポーネント, { open: モーダルを開く関数 }]
 */
const useJoinScoreBoardRoom = (
  input: UseJoinScoreBoardRoomProps = emptyInput,
): UseJoinScoreBoardRoomReturn => {
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
  const [joinScoreBoardRoom] = useJoinScoreBoardRoomMutation();
  const [getScoreBoardRoomHasPassword] = useGetScoreBoardRoomHasPasswordLazyQuery();
  // UI表示用hook
  const { errorNotification } = useNotification();

  /**
   * 実際に得点表示ルームへの参加
   * @param databaseId 退出する得点表示ルームのID
   * @param password 退出する得点表示ルームのパスワード(ある場合)
   */
  const join = async (databaseId: string, password?: string) => {
    await joinScoreBoardRoom({
      variables: {
        input: {
          databaseId,
          password,
        },
      },
    }).catch((e) => {
      errorNotification({ message: e.message });
    }).then((ret) => {
      if (ret && !ret.errors) {
        router.push(`/scoreboard/${databaseId}`);
      }
    });
  };

  /**
   * 得点表示ルームに参加するための関数(パスワードが必要な場合はモーダルを開く)
   * @param databaseId 参加しようとしている得点表示ルームのID
   */
  const open = async (databaseId: string) => {
    setRoomDatabaseId(databaseId);
    await getScoreBoardRoomHasPassword({
      variables: {
        input: {
          databaseId,
        },
      },
    }).catch((e) => {
      errorNotification({ message: e.message });
    }).then((ret) => {
      if (ret && !ret.error) {
        const hasPassword = ret.data?.getScoreBoardRoom?.hasPassword;
        if (hasPassword) {
          openModal();
        } else {
          join(databaseId);
        }
      }
    });
  };

  /**
   * パスワードが必要な得点表示ルームに参加するためのモーダル
   */
  const JoinScoreBoardRoomModalWithLogic = () => (
    <JoinScoreBoardRoomModal
      opened={opened}
      onClose={closeModal}
      onJoinButtonClick={() => join(roomDatabaseId)}
    />
  );

  return [JoinScoreBoardRoomModalWithLogic, { open }];
};

export default useJoinScoreBoardRoom;
