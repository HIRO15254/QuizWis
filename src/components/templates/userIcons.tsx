import { Avatar } from '@mantine/core';
import React from 'react';

export interface UserIconsProps {
  users: {
    databaseId: string;
    iconUrl?: string | null;
  }[];
  size?: 'sm' | 'md' | 'lg' | 'xl';
  max?: number;
}

const UserIcons = (props: UserIconsProps) => {
  const { users, size, max = 5 } = props;
  return (
    <Avatar.Group spacing="sm">
      {users.map((user, index) => {
        if (index < max) {
          return <Avatar key={user.databaseId} src={user.iconUrl} size={size} />;
        } if (index === max) {
          const rest = `+${users.length - max}`;
          return (
            <Avatar key="more" size={size}>{rest}</Avatar>
          );
        }
        return null;
      })}
    </Avatar.Group>
  );
};

export default UserIcons;
