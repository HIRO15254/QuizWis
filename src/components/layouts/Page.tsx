import {
  AppShell, Container,
} from '@mantine/core';
import React, { ReactNode } from 'react';

import CustomHeader from './CustomHeader';
import CustomNavbar from './CustomNavbar';
import useAccessControl, { AccessControlType } from '../../hooks/useAccessControl';
import useLoginHandle from '../../hooks/useLoginHandle';

type PageProps = {
  children: ReactNode;
  accessControl: AccessControlType
  header: boolean
  navbar: boolean
};

/**
 * 見た目的なページのベース
 */
const Page = (props: PageProps) => {
  const {
    children, accessControl, header, navbar,
  } = props;
  const [access, message] = useAccessControl(accessControl);
  useLoginHandle();
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {access && (
      <AppShell
        header={header ? <CustomHeader /> : undefined}
        navbar={navbar ? <CustomNavbar /> : undefined}
        padding="md"
        fixed={false}
      >
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
