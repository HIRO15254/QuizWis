import { FetchResult } from '@apollo/client';
import { useSession } from 'next-auth/react';

import useNotification from './useNotification';
import { SwitchDarkThemeMutation, useSwitchDarkThemeMutation } from '../gql';

const useDarkTheme = (): [boolean, () => Promise<void | FetchResult<SwitchDarkThemeMutation>>] => {
  const [switchTheme] = useSwitchDarkThemeMutation();
  const { errorNotification } = useNotification();
  const { data: session } = useSession();

  const switchDarkTheme = async () => {
    const ret = await switchTheme().catch(() => {
      errorNotification({ message: 'ダークテーマの切り替えに失敗しました。' });
    });
    document.dispatchEvent(new Event('visibilitychange'));
    return ret;
  };

  const isDarkTheme = session?.isDarkTheme ?? false;
  return [isDarkTheme, switchDarkTheme];
};

export default useDarkTheme;
