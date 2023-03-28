import { useEffect, useState } from 'react';

import useNotification from './useNotification';
import { useUpdateUserDataMutation, useGetMeQuery } from '../graphql/generated/type';

const useDarkTheme = (): [boolean, () => Promise<void>] => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [updateUserData] = useUpdateUserDataMutation();
  const [showNotification] = useNotification();

  const { data: loginUser, loading } = useGetMeQuery();

  useEffect(() => {
    if (!loading) {
      if (loginUser?.me) {
        setDarkTheme(loginUser.me.isDarkTheme);
      } else {
        showNotification({
          category: 'error',
          title: 'エラー',
          message: 'ダークテーマ情報の取得に失敗しました。',
        });
      }
    }
  }, [loading]);

  const switchDarkTheme = async () => {
    await updateUserData({
      variables: {
        input: {
          userId: loginUser?.me?.userId || '',
          isDarkTheme: !darkTheme,
        },
      },
    }).catch(() => {
      showNotification({
        category: 'error',
        title: 'エラー',
        message: 'ダークテーマの切り替えに失敗しました。',
      });
    });
    setDarkTheme(!darkTheme);
    // ダークテーマの切り替えを反映させる
    document.dispatchEvent(new Event('visibilitychange'));
  };

  return [darkTheme, switchDarkTheme];
};

export default useDarkTheme;
