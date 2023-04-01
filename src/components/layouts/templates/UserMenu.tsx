import {
  Menu, MediaQuery, MenuItemProps,
} from '@mantine/core';
import React from 'react';

interface UserMenuItemType extends MenuItemProps {
  itemType: 'item';
  label: string;
  onClick?: () => void;
}

type UserMenuDividerType = {
  itemType: 'divider';
};

export type UserMenuContentsType = (UserMenuItemType | UserMenuDividerType)[];

interface UserMenuProps {
  children?: React.ReactNode;
  contents: UserMenuContentsType;
}

const UserMenu = (props: UserMenuProps) => {
  const { children, contents } = props;

  const InnerElement = (
    <>
      <Menu.Target>
        <div>
          {children}
        </div>
      </Menu.Target>
      <Menu.Dropdown mb="sm">
        {contents.map((item, index) => {
          if (item.itemType === 'item') {
            return (
              <Menu.Item key={item.label} {...item}>
                {item.label}
              </Menu.Item>
            );
          }
          if (item.itemType === 'divider') {
            // eslint-disable-next-line react/no-array-index-key
            return <Menu.Divider key={`${item.itemType}_${index}`} />;
          }
          return null;
        })}
      </Menu.Dropdown>
    </>
  );

  return (
    <>
      <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        <Menu position="top-end" width={200}>
          {InnerElement}
        </Menu>
      </MediaQuery>
      <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
        <Menu position="right-end" width={200}>
          {InnerElement}
        </Menu>
      </MediaQuery>
    </>
  );
};

export default UserMenu;
