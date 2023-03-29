import { signIn } from 'next-auth/react';
import { useCallback } from 'react';

import useNotification from '../../../hooks/useNotification';

/**
 * NextAuthを使って、リダイレクトによりログインを行うためのhook
 * @param provider ログインに使用するプロバイダー文字列
 * @param callback ログイン後のリダイレクト先
 * @returns ログインを行う関数
 */
const useLogin = (provider: string, callback: string) => {
  const { errorNotification } = useNotification();

  const login = useCallback(async () => {
    try {
      await signIn(provider, { callbackUrl: callback });
    } catch (error: unknown) {
      errorNotification({ message: 'ログインに失敗しました。' });
    }
  }, [provider, callback]);

  return { login };
};

export default useLogin;
