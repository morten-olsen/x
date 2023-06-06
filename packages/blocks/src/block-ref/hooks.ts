import { useContext } from 'react';
import { BlockRefData } from './types';
import { BlockRefContext } from './context';

const useBlockRefStore = () => {
  const context = useContext(BlockRefContext);
  if (!context) {
    throw new Error('Missing BlockRefContext');
  }
  return context.store;
};

const useBlockRef = (data: BlockRefData) => {
  const context = useContext(BlockRefContext);
  if (!context) {
    throw new Error('Missing BlockRefContext');
  }
  return context.store.get(data);
};

export { useBlockRef, useBlockRefStore };
