import { createContext, useCallback, useMemo, useState } from 'react';
import { AuthStore } from './store';
import { useDatabase } from '../database';
import { AuthClient } from './types';

type AuthContextValue = {
  login: (id: string) => Promise<void>;
  store: AuthStore;
};

type AuthProviderProps = {
  children: React.ReactNode;
  clients: AuthClient[];
  render: React.ComponentType<{ children: React.ReactNode }>;
};

const createResolvablePromise = <T extends any>() => {
  let resolve: (value: T) => void;
  let reject: (reason?: any) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve: resolve!, reject: reject! };
};

type ResolveablePromise<T extends any> = ReturnType<
  typeof createResolvablePromise<T>
>;

const AuthContext = createContext<AuthContextValue | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  clients,
  render: Render,
}) => {
  const database = useDatabase();
  const [requests, setRequests] = useState<
    Record<string, ResolveablePromise<any>>
  >({});
  const store = useMemo(() => new AuthStore(database), [database]);

  const login = useCallback(
    async (id: string) => {
      if (requests[id]) {
        return requests[id].promise;
      }
      const client = clients.find((currentClient) => currentClient.id === id);
      if (!client) {
        throw new Error(`Client ${id} not found`);
      }
      const resolveablePromise = createResolvablePromise();
      resolveablePromise.promise.then((result) => {
        store.setData(id, result);
        setRequests((currentRequests) => {
          const clone = { ...currentRequests };
          delete clone[id];
          return clone;
        });
      });
      setRequests((currentRequests) => ({
        ...currentRequests,
        [id]: resolveablePromise,
      }));
    },
    [store, clients, requests],
  );

  const value = useMemo(() => ({ login, store }), [login, store]);

  return (
    <AuthContext.Provider value={value}>
      {Object.entries(requests).map(([id, request]) => {
        const client = clients.find((currentClient) => currentClient.id === id);
        if (!client) {
          throw new Error(`Client ${id} not found`);
        }
        return (
          <Render key={id}>
            <client.login success={request.resolve} cancel={request.reject} />
          </Render>
        );
      })}
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
