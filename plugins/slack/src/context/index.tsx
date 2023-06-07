import { createContext, useEffect, useContext, useState } from 'react';
import { useAuth } from '@morten-olsen/x-blocks';

type Client<T = any> = (
  url: string,
  options?: Record<string, any>,
) => Promise<T>;

type SlackContextValue = {
  client: Client;
};

type SlackProviderProps = {
  children: React.ReactNode;
};

const SlackContext = createContext<SlackContextValue | null>(null);

const SlackProvider: React.FC<SlackProviderProps> = ({ children }) => {
  const auth = useAuth('slack');
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    if (!auth.data || !auth.data.token) {
      return;
    }
    const nextClient = async (
      url: string,
      options: Record<string, any> = {},
    ) => {
      const form = new FormData();
      form.append('token', auth.data.token);
      Object.keys(options).forEach((key) => {
        form.append(key, options[key]);
      });

      const response = await fetch(`https://slack.com/api/${url}`, {
        mode: 'cors',
        method: 'POST',
        body: form,
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText} ${url}`);
      }
      return response.json();
    };

    setClient(() => nextClient);
  }, [auth.data]);

  if (client === null) {
    return <button onClick={auth.login}>Login</button>;
  }

  return (
    <SlackContext.Provider value={{ client }}>{children}</SlackContext.Provider>
  );
};

const withAuth =
  <T extends object>(Component: React.ComponentType<T>) =>
  (props: T) => {
    return (
      <SlackProvider>
        <Component {...props} />
      </SlackProvider>
    );
  };

const useFetch = () => {
  const context = useContext(SlackContext);
  if (!context) {
    throw new Error('useFetch must be used within a SlackProvider');
  }
  return context.client;
};

export type { Client };
export { withAuth, useFetch };
