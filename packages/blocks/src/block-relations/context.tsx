import { createContext, useMemo } from 'react';
import { BlocksRelationStore } from './store';
import { useDatabase } from '../database';
import { useBlockRefStore } from '../block-ref';

type BlockRelationsContextValue = {
  store: BlocksRelationStore;
};

type BlockRelationsProviderProps = {
  children: React.ReactNode;
};

const BlockRelationsContext = createContext<BlockRelationsContextValue | null>(
  null,
);

const BlockRelationsProvider: React.FC<BlockRelationsProviderProps> = ({
  children,
}) => {
  const database = useDatabase();
  const refs = useBlockRefStore();
  const store = useMemo(
    () => new BlocksRelationStore(database, refs),
    [database, refs],
  );

  const value = useMemo(() => ({ store }), [store]);

  return (
    <BlockRelationsContext.Provider value={value}>
      {children}
    </BlockRelationsContext.Provider>
  );
};

export { BlockRelationsProvider, BlockRelationsContext };
