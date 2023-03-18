import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { useCreateUserDataMutation } from '../graphql/generated/type';

const createUserID = () => {
  const c = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const length = 8;
  return [...Array(length)].map(() => c[Math.floor(Math.random() * c.length)]).join('');
};

/**
 * ログイン時、ユーザーデータが存在しない場合は作成するhook
 */
const useLoginHandle = () => {
  const [createUserData] = useCreateUserDataMutation();
  const { data: session, status } = useSession();
  useEffect(() => {
    (async () => {
      if (status === 'authenticated') {
        if (!session?.user.userDataLinked) {
          await createUserData({
            variables: {
              input: {
                userId: createUserID(),
                name: session?.user.name || '',
                authUserId: session?.user.id || '',
              },
            },
          });
        }
      }
    })();
  }, [status]);
};

export default useLoginHandle;
