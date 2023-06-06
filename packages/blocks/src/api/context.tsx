import { EventEmitter } from 'eventemitter3';
import { createContext, useCallback, useMemo } from 'react';
import { BlockRef } from '../block-ref';

type ApiEvents = {
  open: (block: BlockRef, actor?: BlockRef) => void;
};

type ApiContextValue = {
  events: EventEmitter<ApiEvents>;
  open: (block: BlockRef, actor?: BlockRef) => void;
};

type ApiProviderProps = {
  children: React.ReactNode;
};

const ApiContext = createContext<ApiContextValue | null>(null);

const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const events = useMemo(() => new EventEmitter<ApiEvents>(), []);
  const open = useCallback(
    (block: BlockRef, actor?: BlockRef) => {
      events.emit('open', block, actor);
    },
    [events],
  );

  const value = useMemo(() => ({ events, open }), [events, open]);

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export { ApiContext, ApiProvider };
