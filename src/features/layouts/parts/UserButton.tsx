import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
  Menu,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import React from 'react';

import DarkThemeItem from './DarkThemeItem';

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  },
}));

interface UserButtonProps extends UnstyledButtonProps {
  image?: string;
  name: string;
  userId: string;
}

const logout = () => {
  signOut({ callbackUrl: '/auth/login' });
};

const UserButton = ({
  image, name, userId, ...others
}: UserButtonProps) => {
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <Menu position="right-end" width={200}>
      <Menu.Target>
        <UnstyledButton className={classes.user} {...others}>
          <Group>
            <Avatar src={image} radius="xl" />

            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {name}
              </Text>

              <Text color="dimmed" size="xs">
                {`@${userId}`}
              </Text>
            </div>

            <IconChevronRight size="0.9rem" stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => {}}>Profile</Menu.Item>
        <Menu.Item onClick={() => { router.push('/user/settings'); }}>Settings</Menu.Item>
        <Menu.Divider />
        <DarkThemeItem />
        <Menu.Divider />
        <Menu.Item onClick={logout} color="red">Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserButton;
