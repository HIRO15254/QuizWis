import { Avatar } from '@mantine/core';
import React from 'react';

import { ScoreBoardRoomRole } from '../../graphql/generated/type';

export interface UserIconsProps {
  users: {
    role: ScoreBoardRoomRole
    userData: {
      databaseId: string;
      iconUrl?: string | null;
    }
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
          return <Avatar key={user.userData.databaseId} src={user.userData.iconUrl} size={size} />;
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
