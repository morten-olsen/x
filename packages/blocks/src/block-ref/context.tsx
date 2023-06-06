import { createContext, useMemo } from 'react';
import { BlockRefStore } from './store';

type BlockRefContextValue = {
  store: BlockRefStore;
};

type BlockRefProviderProps = {
  children: React.ReactNode;
};

const BlockRefContext = createContext<BlockRefContextValue | null>(null);

const BlockRefProvider: React.FC<BlockRefProviderProps> = (props) => {
  const { children } = props;
  const store = useMemo(() => new BlockRefStore(), []);
  const value = useMemo(() => ({ store }), [store]);

  return (
    <BlockRefContext.Provider value={value}>
      {children}
    </BlockRefContext.Provider>
  );
};

export { BlockRefContext, BlockRefProvider };
