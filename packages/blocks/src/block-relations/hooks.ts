import { useCallback, useContext, useEffect, useState } from 'react';
import { useBlockId } from '../block/hooks';
import { BlockRelationsContext } from './context';
import { BlockRelationStore } from './store/block';
import { BlockRef } from '../block-ref';

const useBlockRelationsContext = () => {
  const context = useContext(BlockRelationsContext);
  if (!context) {
    throw new Error('BlocksRelationContext is not provided');
  }
  return context;
};

const useBlockChildren = () => {
  const blockId = useBlockId();
  const { store } = useBlockRelationsContext();
  const [relations, setRelations] = useState<BlockRelationStore>();
  const [children, setChildren] = useState<BlockRef[]>([]);
  useEffect(() => {
    const run = async () => {
      setRelations(await store.get(blockId));
    };
    run();
  }, [blockId, store]);

  useEffect(() => {
    if (!relations) {
      return;
    }
    const updateChildren = () => {
      setChildren([...relations.from]);
    };
    relations.on('updatedFrom', updateChildren);
    updateChildren();
    return () => {
      relations.off('updatedFrom', updateChildren);
    };
  }, [relations]);

  const set = useCallback(
    (value: BlockRef[] | ((current: BlockRef[]) => BlockRef[])) => {
      if (!relations) {
        return;
      }
      const next = typeof value === 'function' ? value(relations?.from) : value;
      store.set(blockId, next);
      setChildren([...next]);
    },
    [relations, blockId, store],
  );

  return [children, set] as const;
};

export { useBlockChildren };
