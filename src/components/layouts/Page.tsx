import {
  AppShell, Container,
} from '@mantine/core';
import React, { ReactNode } from 'react';

import CustomHeader from './CustomHeader';
import useAccessControl, { AccessControlType } from '../../hooks/useAccessControl';
import useLoginHandle from '../../hooks/useLoginHandle';

type PageProps = {
  children: ReactNode;
  accessControl: AccessControlType
};

/**
 * 見た目的なページのベース
 */
const Page = (props: PageProps) => {
  const { children, accessControl } = props;
  const [access, message] = useAccessControl(accessControl);
  useLoginHandle();
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {access && (
      <AppShell header={<CustomHeader />} padding="md" fixed={false}>
        <Container>
          {children}
        </Container>
      </AppShell>
      )}
      {!access && message}
    </div>
  );
};

export default Page;
