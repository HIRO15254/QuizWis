import {
  Navbar, ScrollArea, createStyles, rem,
} from '@mantine/core';
import {
  IconHexagonLetterQ,
  IconLayoutKanban,
  IconCheck,
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import React from 'react';

import useDarkTheme from '../../../../hooks/useDarkThemeChange';
import LinksGroup from '../../templates/LinksGroup';
import UserButton from '../../templates/UserButton';
import UserMenu, { UserMenuContentsType } from '../../templates/UserMenu';

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
    paddingTop: theme.spacing.sm,
    paddingRight: theme.spacing.md,
    paddingLeft: theme.spacing.md,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

type CustomNavbarProps = {
  opened: boolean;
};

/**
 * 画面左側に表示するナビゲーションバー
 */
const CustomNavbar = (props: CustomNavbarProps) => {
  const { opened } = props;

  const { classes } = useStyles();

  const router = useRouter();
  const { data: session } = useSession();

  const navbarData = [
    {
      label: '作問',
      icon: IconHexagonLetterQ,
      initiallyOpened: true,
      links: [
        { label: '問題セット', link: '/' },
        { label: 'ジャンル', link: '/' },
      ],
    },
    {
      label: '得点表示',
      icon: IconLayoutKanban,
      initiallyOpened: true,
      links: [
        { label: 'ルーム一覧', link: '/scoreboard' },
      ],
    },
  ];
  const links = navbarData.map((item) => <LinksGroup {...item} key={item.label} />);

  const [isDarkTheme, switchDarkTheme] = useDarkTheme();
  const userMenuContents: UserMenuContentsType = [
    { itemType: 'item', label: 'プロフィール', onClick: () => router.push('/user/profile') },
    { itemType: 'item', label: '設定', onClick: () => router.push('/user/settings') },
    { itemType: 'divider' },
    {
      itemType: 'item', label: 'ダークモード', icon: isDarkTheme ? <IconCheck size="1rem" /> : undefined, onClick: () => switchDarkTheme(),
    },
    { itemType: 'divider' },
    {
      itemType: 'item', label: 'ログアウト', color: 'red', onClick: () => signOut({ callbackUrl: '/auth/login' }),
    },
  ];

  return (
    <Navbar hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, md: 300 }} className={classes.navbar}>
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div>{links}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UserMenu contents={userMenuContents}>
          <UserButton
            name={session?.name ?? ''}
            userId={session?.userId ?? ''}
            image={session?.iconUrl}
          />
        </UserMenu>
      </Navbar.Section>
    </Navbar>
  );
};

export default CustomNavbar;
