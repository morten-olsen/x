import { createContext, useMemo } from 'react';
import { BlocksStore } from './store';
import { useDatabase } from '../database';
import { useBlockRefStore } from '../block-ref';

type BlocksContextValue = {
  store: BlocksStore;
};

type BlocksProviderProps = {
  children: React.ReactNode;
};

const BlocksContext = createContext<BlocksContextValue | null>(null);

const BlocksProvider = ({ children }: BlocksProviderProps) => {
  const database = useDatabase();
  const refs = useBlockRefStore();
  const store = useMemo(
    () => new BlocksStore(database, refs),
    [database, refs],
  );

  const value = useMemo(() => ({ store }), [store]);

  return (
    <BlocksContext.Provider value={value}>{children}</BlocksContext.Provider>
  );
};

export { BlocksContext, BlocksProvider };
