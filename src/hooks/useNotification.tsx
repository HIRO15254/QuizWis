import { showNotification } from '@mantine/notifications';

type NotificationCategory = 'success' | 'error' | 'warning' | 'info';

type NotificationData = {
  category: NotificationCategory;
  title: string;
  message: string;
};

const categoryColor = {
  success: 'teal',
  error: 'red',
  warning: 'yellow',
  info: 'blue',
};

const useNotification = () => {
  const notification = (data: NotificationData) => {
    showNotification({
      color: categoryColor[data.category],
      title: data.title,
      message: data.message,
    });
  };
  return [notification];
};

export default useNotification;
