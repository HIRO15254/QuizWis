import {
  Avatar, Group, FileInput, Input,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconUpload } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import pica from 'pica';
import React from 'react';

import { useUpdateUserDataMutation } from '../../../graphql/generated/type';
import useNotification from '../../../hooks/useNotification';
import { supabase } from '../../../lib/supabase';
import AvatarEditModal, { OnImageSavePayload } from '../parts/AvatarEditModal';

const createImageID = () => {
  const c = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 8;
  return [...Array(length)].map(() => c[Math.floor(Math.random() * c.length)]).join('');
};

const IconUploader = () => {
  const { data: session } = useSession();
  const [opened, { open, close }] = useDisclosure(false);
  const [image, setImage] = React.useState<File | null>(null);
  const [updateUserDataMutation] = useUpdateUserDataMutation();
  const { errorNotification, successNotification } = useNotification();

  const onImageChange = (payload: File | null) => {
    setImage(payload);
    if (payload) {
      open();
    }
  };

  const onImageSave = async (payload: OnImageSavePayload) => {
    const { image: savedImage, canvas } = payload;
    const picaCanvas = await pica().resize(savedImage, canvas);
    picaCanvas.toBlob(async (blob) => {
      if (blob) {
        try {
          const avatarStorage = supabase.storage.from('avatar');
          const fileName = `${session?.userData.userId}_${createImageID()}.png`;
          const file = new File([blob], fileName, { type: 'image/png' });

          if (session?.userData.iconUrl) {
            const oldIconPath = session.userData.iconUrl.split('/').slice(-1)[0];
            await avatarStorage.remove([oldIconPath]).catch(() => {
              throw new Error('古いアイコンの削除に失敗しました。');
            });
          }

          await avatarStorage.upload(fileName, file).catch(() => {
            throw new Error('アイコンのアップロードに失敗しました。');
          });

          const newUrl = avatarStorage.getPublicUrl(fileName).data.publicUrl;
          await updateUserDataMutation({
            variables: {
              input: {
                userId: session?.userData.userId ?? '',
                iconUrl: newUrl,
              },
            },
          }).catch(() => {
            throw new Error('アイコンの更新に失敗しました。');
          });
          if (session?.userData) session.userData.iconUrl = newUrl;

          successNotification({ message: 'アイコンを更新しました。' });
          // 変更内容を全体に反映させる
          document.dispatchEvent(new Event('visibilitychange'));
        } catch (e) {
          if (e instanceof Error) {
            errorNotification({ message: e.message });
          }
        }
      }
    });
  };

  return (
    <Input.Wrapper
      label="アイコン"
      description="アップロードしたアイコンは240px四方にリサイズされます。"
    >
      <AvatarEditModal opened={opened} close={close} image={image} onImageSave={onImageSave} />
      <Group pt="sm">
        <Avatar src={session?.userData?.iconUrl} radius="xl" size="lg" />
        <FileInput
          placeholder="ファイルを選択…"
          accept="image/*"
          icon={<IconUpload />}
          onChange={onImageChange}
        />
      </Group>
    </Input.Wrapper>
  );
};

export default IconUploader;
