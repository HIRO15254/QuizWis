import {
  TextInput, Tooltip, Button, Group, LoadingOverlay, Box,
} from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconAlertCircle, IconAt } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

import { useUpdateUserDataMutation, useGetLoginUserQuery } from '../../../graphql/generated/type';
import useCheckUserIdLazyQuery from '../hooks/useCheckIdLazyQuery';

/**
 * ユーザーの情報を変更するフォーム。
 * @param props mantine標準のButtonPropsを継承。callbackにはログイン後のリダイレクト先を指定する。
*/
const BasicUserSettingForm = () => {
  const { data: session } = useSession();
  const [checkUserId] = useCheckUserIdLazyQuery();
  const { data: userData, loading } = useGetLoginUserQuery();
  const [updateUserData] = useUpdateUserDataMutation();

  /**
   * ユーザーIDのバリデーションを行う
   * @param value 入力されたユーザーID
   * @returns エラーメッセージまたはnull(エラーなし)
   */
  const userIdValidator = (value: string) => {
    if (!value) {
      return 'ユーザーIDを入力してください';
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
      return '使用できない文字が含まれています';
    }
    if (value.length < 6 || value.length > 20) {
      return '6文字以上20文字以下で入力してください';
    }
    checkUserId(value).then((result) => {
      if (
        result && value !== session?.userData?.userId
      ) {
        // BAD: この関数内でformを参照している
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return form.setFieldError('userId', 'このユーザーIDは既に使用されています');
      }
      return null;
    });
    return null;
  };

  const emailValidator = (value: string) => {
    if (value && !isEmail(value)) {
      return 'メールアドレスの形式が正しくありません';
    }
    return null;
  };

  const form = useForm({
    initialValues: {
      userId: '',
      name: '',
      email: '',
    },
    validate: {
      userId: userIdValidator,
      name: isNotEmpty('ユーザー名を入力してください'),
      email: emailValidator,
    },
    validateInputOnChange: true,
  });

  useEffect(() => {
    if (!loading) {
      form.setValues({
        userId: userData?.loginUser?.userId,
        name: userData?.loginUser?.name,
        email: userData?.loginUser?.email ?? '',
      });
    }
  }, [loading]);

  const handleSubmit = (values: { userId: string; name: string; email: string; }) => {
    updateUserData({
      variables: {
        input: {
          userId: session?.userData.userId ?? '',
          newUserId: values.userId,
          name: values.name,
          email: values.email,
        },
      },
    }).then(() => {
      showNotification({
        color: 'teal',
        title: '更新成功',
        message: 'ユーザー情報を更新しました',
      });
      document.dispatchEvent(new Event('visibilitychange'));
    }).catch(() => {
      showNotification({
        color: 'red',
        title: '更新失敗',
        message: 'ユーザー情報の更新に失敗しました',
      });
    });
  };

  const publicTooltip = (
    <Tooltip label="一般に公開されます" position="top-end" withArrow>
      <div>
        <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
      </div>
    </Tooltip>
  );

  return (
    <Box pos="relative">
      <LoadingOverlay visible={loading} overlayBlur={2} />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="ユーザーID"
          description="半角英数字とハイフン、アンダーバーのみ使用可能です"
          icon={<IconAt size="1.2rem" />}
          rightSection={publicTooltip}
          {...form.getInputProps('userId')}
          pb="md"
        />
        <TextInput
          withAsterisk
          label="ユーザーネーム"
          rightSection={publicTooltip}
          {...form.getInputProps('name')}
          pb="md"
        />
        <TextInput
          label="メールアドレス"
          rightSection={publicTooltip}
          {...form.getInputProps('email')}
          pb="md"
        />
        <Group position="right">
          <Button type="submit" color="blue">
            更新
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default BasicUserSettingForm;
