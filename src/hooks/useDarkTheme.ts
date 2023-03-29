import { useEffect, useState } from 'react';

import useNotification from './useNotification';
import { useUpdateUserDataMutation, useGetLoginUserQuery } from '../graphql/generated/type';

/**
 * ダークテーマやその切り替えを扱うhook
 */
const useDarkTheme = (): [boolean, () => Promise<boolean>] => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [updateUserData] = useUpdateUserDataMutation();
  const { errorNotification } = useNotification();

  const { data: loginUserData, loading } = useGetLoginUserQuery();

  useEffect(() => {
    if (!loading) {
      if (loginUserData?.loginUser) {
        setDarkTheme(loginUserData.loginUser.isDarkTheme);
      } else {
        errorNotification({ message: 'ダークテーマ情報の取得に失敗しました。' });
      }
    }
  }, [loading]);

  /**
   * ダークテーマの切り替え
   */
  const switchDarkTheme = async () => {
    await updateUserData({
      variables: {
        input: {
          userId: loginUserData?.loginUser?.userId || '',
          isDarkTheme: !darkTheme,
        },
      },
    }).catch(() => {
      errorNotification({ message: 'ダークテーマの切り替えに失敗しました。' });
    });
    setDarkTheme(!darkTheme);
    // ダークテーマの切り替えを反映させる
    document.dispatchEvent(new Event('visibilitychange'));
    return darkTheme;
  };

  return [darkTheme, switchDarkTheme];
};

export default useDarkTheme;
