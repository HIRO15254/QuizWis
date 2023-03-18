import { showNotification } from '@mantine/notifications';
import Router, { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export type AccessControlType = 'public' | 'authenticated';

/**
 * 設定したページにアクセスコントロールを掛けるhook
 */
const useAccessControl = (accessControlType: AccessControlType) => {
  const { status } = useSession();
  const { asPath } = useRouter();
  const [message, setMessage] = useState('Loading...');
  const [access, setAccess] = useState(false);

  useEffect(() => {
    setAccess(true);
    if (status === 'loading') {
      setMessage('Loading...');
      setAccess(false);
    }
    if (accessControlType === 'authenticated') {
      if (status === 'unauthenticated') {
        showNotification(
          {
            color: 'red',
            title: 'ログインが必要なページです',
            message: 'このページにアクセスするためにはログインが必要です。',
          },
        );
        setMessage('Redirecting...');
        setAccess(false);
        Router.push(`/auth/login/?callbackurl=${asPath}`);
      }
    }
  }, [status]);

  return [access, message];
};

export default useAccessControl;
