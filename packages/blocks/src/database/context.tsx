import { createContext, useMemo } from 'react';
import { Database } from './types';

type DatabaseContextValue = {
  database: Database;
};

type DatabaseProviderProps = {
  children: React.ReactNode;
  database: Database;
};

const DatabaseContext = createContext<DatabaseContextValue | null>(null);

const DatabaseProvider: React.FC<DatabaseProviderProps> = ({
  children,
  database,
}) => {
  const value = useMemo(() => ({ database }), [database]);

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
};

export { DatabaseContext, DatabaseProvider };
