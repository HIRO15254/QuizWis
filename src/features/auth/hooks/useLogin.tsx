import { showNotification } from '@mantine/notifications';
import { signIn } from 'next-auth/react';
import { useCallback } from 'react';

/**
 * NextAuthを使って、リダイレクトによりログインを行うためのhook
 * @param provider ログインに使用するプロバイダー文字列
 * @param callback ログイン後のリダイレクト先(相対パス)
 * @returns ログインを行う関数
 */
const useLogin = (provider: string, callback: string) => {
  const login = useCallback(async () => {
    try {
      await signIn(provider, { callbackUrl: callback });
    } catch (error: unknown) {
      showNotification({
        color: 'red',
        title: 'ログイン失敗',
        message: 'ログインに失敗しました。',
      });
    }
  }, [provider, callback]);

  return { login };
};

export default useLogin;
