import { NextPage } from 'next';

import { AccessControlType } from '../hooks/useAccessControl';

declare module 'next' {
  export type PageProps = {
    title: string
    accessControl: AccessControlType
  };
  // TODO: 型チェック通す
  // eslint-disable-next-line @typescript-eslint/ban-types
  export type PageFC<P = {}, IP = P & PageProps> = NextPage<P, IP>;
}
