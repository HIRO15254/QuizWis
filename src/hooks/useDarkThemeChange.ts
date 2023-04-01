import { useSession } from 'next-auth/react';

import useNotification from './useNotification';
import { useSwitchDarkThemeMutation } from '../graphql/generated/type';

const useDarkTheme = () => {
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

  const isDarkTheme = session?.userData?.isDarkTheme;
  return [isDarkTheme, switchDarkTheme];
};

export default useDarkTheme;
