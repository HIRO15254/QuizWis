import { ApolloError } from '@apollo/client';
import { useState } from 'react';

import { useGetUserDataLazyQuery } from '../../../graphql/generated/type';

const useCheckUserIdLazyQuery = (): [
  (userId: string) => Promise<boolean>,
  {
    isUnique: boolean | undefined;
    loading: boolean;
    error: ApolloError | undefined;
  },
] => {
  const [getUserData, { loading, error }] = useGetUserDataLazyQuery();
  const [isUnique, setIsUnique] = useState<boolean | undefined>(undefined);

  const checkUserId = async (userId: string) => {
    const ret = await getUserData({ variables: { input: { userId } } });
    setIsUnique(!!ret.data?.getUserData);
    return !!ret.data?.getUserData;
  };

  return [checkUserId, { isUnique, loading, error }];
};

export default useCheckUserIdLazyQuery;
