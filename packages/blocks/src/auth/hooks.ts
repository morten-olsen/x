import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './context';

const useAuth = (client: string) => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  const { store, login: contextLogin } = context;
  const [data, setData] = useState<any>();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const update = (id: string) => {
      if (id !== client) {
        return;
      }
      store.getData(client).then((nextData) => {
        setData(nextData);
        setAuthenticated(!!nextData);
      });
    };
    store.on('update', update);
    update(client);
    return () => {
      store.off('update', update);
    };
  }, [client, store]);

  const login = useCallback(() => {
    contextLogin(client);
  }, [client, contextLogin]);

  const value = useMemo(
    () => ({ data, authenticated, login }),
    [data, authenticated, login],
  );

  return value;
};

export { useAuth };
