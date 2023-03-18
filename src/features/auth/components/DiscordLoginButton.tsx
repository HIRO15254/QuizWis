import { Button, ButtonProps } from '@mantine/core';
import { DiscordIcon } from '@mantine/ds';
import React from 'react';

import useLogin from '../hooks/useLogin';

type LoginButtonProps = ButtonProps & {
  callback: string;
};

/**
 * Discordアカウントを利用してのログインを行うボタン。
 * @param props mantine標準のButtonPropsを継承。callbackにはログイン後のリダイレクト先を指定する。
*/
const DiscordLoginButton = (props: LoginButtonProps) => {
  const { callback } = props;
  const { login } = useLogin('discord', callback);

  return (
    <Button
      leftIcon={<DiscordIcon size={16} color="#5865F2" />}
      variant="default"
      color="gray"
      onClick={login}
      {...props}
    />
  );
};

export default DiscordLoginButton;
