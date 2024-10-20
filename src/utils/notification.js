import { notification } from 'antd';

export const Notification = (type, description, placement = 'bottomRight') => {
  const _notification = {
    success: {
      message: 'Success',
      description,
      placement,
    },
    error: {
      message: 'Error',
      description,
      placement,
    },
  };

  notification[type](_notification[type]);
};
