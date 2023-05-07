import { showNotification } from '@mantine/notifications';

type NotificationData = {
  title?: string;
  message: string;
};

const useNotification = () => {
  const successNotification = (data: NotificationData) => {
    showNotification({
      color: 'teal',
      title: data.title ?? '成功',
      message: data.message,
    });
  };
  const errorNotification = (data: NotificationData) => {
    showNotification({
      color: 'red',
      title: data.title ?? 'エラー',
      message: data.message,
    });
  };
  return { successNotification, errorNotification };
};

export default useNotification;
