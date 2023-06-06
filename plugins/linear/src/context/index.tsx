import { createContext, useEffect, useContext, useState } from 'react';
import { useAuth } from '@morten-olsen/x-blocks';
import { LinearClient } from '@linear/sdk';

type LinearContextValue = {
  client: LinearClient;
};

type LinearProviderProps = {
  children: React.ReactNode;
};

const LinearContext = createContext<LinearContextValue | null>(null);

const LinearProvider: React.FC<LinearProviderProps> = ({ children }) => {
  const auth = useAuth('linear');
  const [client, setClient] = useState<LinearClient | null>(null);

  useEffect(() => {
    if (!auth.data || !auth.data.apiKey) {
      return;
    }
    const nextClient = new LinearClient({
      apiKey: auth.data.apiKey,
    });
    setClient(nextClient);
  }, [auth.data]);

  if (client === null) {
    return <button onClick={auth.login}>Login</button>;
  }

  return (
    <LinearContext.Provider value={{ client }}>
      {children}
    </LinearContext.Provider>
  );
};

const withAuth =
  <T extends object>(Component: React.ComponentType<T>) =>
  (props: T) => {
    return (
      <LinearProvider>
        <Component {...props} />
      </LinearProvider>
    );
  };

const useSdk = () => {
  const context = useContext(LinearContext);
  if (!context) {
    throw new Error('useSdk must be used within a LinearProvider');
  }
  return context.client;
};

export { withAuth, useSdk };
