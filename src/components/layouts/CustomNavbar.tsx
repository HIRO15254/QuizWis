import {
  Navbar, ScrollArea, createStyles, rem,
} from '@mantine/core';
import {
  IconHexagonLetterQ,
  IconLayoutKanban,
} from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import React from 'react';

import LinksGroup from '../parts/LinksGroup';
import UserButton from '../parts/UserButton';

// サイドバーに表示するデータ
const mockData = [
  {
    label: '作問',
    icon: IconHexagonLetterQ,
    initiallyOpened: true,
    links: [
      { label: '問題セット', link: '/' },
      { label: 'ジャンル', link: '/' },
    ],
  },
  { label: '得点表示', icon: IconLayoutKanban, link: '/' },
];

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

const CustomNavbar = () => {
  const { classes } = useStyles();
  const { data: session } = useSession();
  const links = mockData.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <Navbar width={{ sm: 300 }} className={classes.navbar}>
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div>{links}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UserButton
          name={session?.userData?.name ?? 'Undefined User'}
          userId={session?.userData?.userId ?? 'undefined'}
          image={session?.userData?.iconUrl}
        />
      </Navbar.Section>
    </Navbar>
  );
};

export default CustomNavbar;
