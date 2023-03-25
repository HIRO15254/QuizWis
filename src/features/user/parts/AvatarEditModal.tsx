import {
  Modal, Stack, Text, Slider, Group, Button,
} from '@mantine/core';
import React from 'react';
import AvatarEditor from 'react-avatar-editor';

export type OnImageSavePayload = {
  canvas: HTMLCanvasElement;
  image: HTMLCanvasElement;
};

type AvatarEditModalProps = {
  opened: boolean;
  close: () => void;
  image: File | null;
  onImageSave: (payload: OnImageSavePayload) => void;
};

const USER_ICON_SIZE = 240;

const AvatarEditModal = (props: AvatarEditModalProps) => {
  const {
    opened, close, image, onImageSave,
  } = props;
  const [scale, setScale] = React.useState(1.0);
  const editorRef = React.useRef<AvatarEditor>(null);

  const onSaveButtonClick = () => {
    if (editorRef.current) {
      onImageSave({
        canvas: editorRef.current.getImageScaledToCanvas(),
        image: editorRef.current.getImage(),
      });
      close();
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      size="auto"
      title="アイコンの編集"
    >
      <Stack>
        <AvatarEditor
          ref={editorRef}
          image={image ?? ''}
          scale={scale}
          width={USER_ICON_SIZE}
          height={USER_ICON_SIZE}
          borderRadius={USER_ICON_SIZE / 2}
          border={0}
        />
        <Text>拡大率</Text>
        <Slider
          min={1.0}
          max={3.0}
          step={0.01}
          label={null}
          defaultValue={scale}
          onChange={(value) => { setScale(value); }}
        />
        <Group position="right">
          <Button onClick={onSaveButtonClick}>
            更新
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default AvatarEditModal;
