import { AppShell } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { ReactNode, useState, useEffect } from 'react';

import CustomHeader from './parts/CustomHeader';
import CustomNavbar from './parts/CustomNavbar';
import useAccessControl, { AccessControlType } from '../../../hooks/useAccessControl';

type PageProps = {
  children: ReactNode;
  accessControl: AccessControlType
};

/**
 * 見た目的なページのベース
 */
const Page = (props: PageProps) => {
  const { children, accessControl } = props;
  const isPublicPage = accessControl === 'public';
  const [access, message] = useAccessControl(accessControl);
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setOpened(false);
  }, [router.pathname]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {access && (
      <AppShell
        navbarOffsetBreakpoint="sm"
        header={(
          <CustomHeader
            opened={opened}
            setOpened={setOpened}
            isPublicPage={isPublicPage}
          />
        )}
        navbar={
          (!isPublicPage)
            ? <CustomNavbar opened={opened} />
            : undefined
        }
        padding="sm"
      >
        {children}
      </AppShell>
      )}
      {!access && message}
    </div>
  );
};

export default Page;
