import { useCallback, useState } from 'react';

export type NotificationStatus = 'idle' | 'loading' | 'success' | 'error';

interface Notification {
  status: NotificationStatus;
  message?: string;
}

interface UseNotificationResult {
  notification: Notification;
  showNotification: (status: NotificationStatus, message?: string, duration?: number) => void;
  clearNotification: () => void;
}

const useNotification = (): UseNotificationResult => {
  const [notification, setNotification] = useState<Notification>({ status: 'idle' });

  const showNotification = useCallback(
    (status: NotificationStatus, message?: string, duration: number = 3000) => {
      setNotification({ status, message });

      if (duration > 0 && status !== 'loading') {
        setTimeout(() => {
          setNotification({ status: 'idle' });
        }, duration);
      }
    },
    [],
  );

  const clearNotification = useCallback(() => {
    setNotification({ status: 'idle' });
  }, []);

  return {
    notification,
    showNotification,
    clearNotification,
  };
};

export default useNotification;
