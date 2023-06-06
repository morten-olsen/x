import { createContext, useEffect, useContext, useState } from 'react';
import { Octokit } from 'octokit';
import { useAuth } from '@morten-olsen/x-blocks';

type GithubContextValue = {
  client: Octokit;
};

type GithubProviderProps = {
  children: React.ReactNode;
};

const GithubContext = createContext<GithubContextValue | null>(null);

const GithubProvider: React.FC<GithubProviderProps> = ({ children }) => {
  const auth = useAuth('github');
  const [client, setClient] = useState<Octokit | null>(null);

  useEffect(() => {
    if (!auth.data) {
      return;
    }
    const nextClient = new Octokit({
      auth: auth.data.pat,
    });
    setClient(nextClient);
  }, [auth.data]);

  if (client === null) {
    return <button onClick={auth.login}>Login</button>;
  }

  return (
    <GithubContext.Provider value={{ client }}>
      {children}
    </GithubContext.Provider>
  );
};

const withAuth =
  <T extends object>(Component: React.ComponentType<T>) =>
  (props: T) => {
    return (
      <GithubProvider>
        <Component {...props} />
      </GithubProvider>
    );
  };

const useOctokit = () => {
  const context = useContext(GithubContext);
  if (!context) {
    throw new Error('useOctokit must be used within a GithubProvider');
  }
  return context.client;
};

export { withAuth, useOctokit };
