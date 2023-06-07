import { createContext, useMemo } from 'react';
import { NotificationStore } from './store';

type NotificationsContextValue = {
  store: NotificationStore;
};

type NotificationsProviderProps = {
  children: React.ReactNode;
};

const NotificationsContext = createContext<NotificationsContextValue | null>(
  null,
);

const NotificationsProvider: React.FC<NotificationsProviderProps> = ({
  children,
}) => {
  const store = useMemo(() => new NotificationStore(), []);

  const value = useMemo(
    () => ({ store } as NotificationsContextValue),
    [store],
  );

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};

export { NotificationsContext, NotificationsProvider };
