import { Button, ButtonProps } from '@mantine/core';
import React from 'react';

import GoogleIcon from './GoogleIcon';
import useLogin from '../hooks/useLogin';

type LoginButtonProps = ButtonProps & {
  callback: string;
};

/**
 * Googleアカウントを利用してのログインを行うボタン。
 * @param props mantine標準のButtonPropsを継承。callbackにはログイン後のリダイレクト先を指定する。
*/
const GoogleLoginButton = (props : LoginButtonProps) => {
  const { callback } = props;
  const { login } = useLogin('google', callback);

  return (
    <Button
      leftIcon={<GoogleIcon />}
      variant="default"
      color="gray"
      onClick={login}
      {...props}
    />
  );
};

export default GoogleLoginButton;
