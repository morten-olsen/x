import { useCallback, useContext, useEffect, useState } from 'react';
import { NotificationsContext } from './context';
import { useBlockId } from '../block';
import { Notification } from './types';
import { BlockRef } from '../block-ref';

const useNotificationContext = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      'useNotificationContext must be used within a NotificationProvider',
    );
  }
  return context;
};

const useNotifications = () => {
  const { store } = useNotificationContext();
  const id = useBlockId();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const update = (ref: BlockRef) => {
      if (ref !== id) {
        return;
      }
      const nextNotifications = store.getByBlock(id);
      setNotifications(nextNotifications);
    };
    store.on('received', update);
    update(id);
    return () => {
      store.off('received', update);
    };
  }, [id, store]);

  return notifications;
};

const useAllNotifications = () => {
  const { store } = useNotificationContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const update = () => {
      const nextNotifications = store.getAll();
      setNotifications(nextNotifications);
    };
    store.on('received', update);
    update();
    return () => {
      store.off('received', update);
    };
  }, [store]);

  return notifications;
};

const useAddNotification = () => {
  const { store } = useNotificationContext();

  const fn = useCallback(
    (notification: Notification) => {
      store.add(notification);
    },
    [store],
  );

  return fn;
};

const useMarkNotificationsAsRead = () => {
  const { store } = useNotificationContext();
  const fn = useCallback(
    (ref: BlockRef) => {
      store.markNotificationsAsRead(ref);
    },
    [store],
  );

  return fn;
};

export {
  useNotifications,
  useAddNotification,
  useMarkNotificationsAsRead,
  useAllNotifications,
};
