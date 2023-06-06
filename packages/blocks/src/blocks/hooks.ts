import { useContext, useEffect, useState } from 'react';
import { BlocksContext } from './context';
import { BlockStore } from './store/block';
import { BlockRef } from '../block-ref';

const useBlocsContext = () => {
  const context = useContext(BlocksContext);
  if (!context) {
    throw new Error('useBlocksContext must be used within a BlocksProvider');
  }
  return context;
};

const useBlock = <T extends object = object>(id?: BlockRef) => {
  const { store } = useBlocsContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any | undefined>(undefined);
  const [block, setBlock] = useState<BlockStore<T> | undefined>(undefined);

  useEffect(() => {
    if (!id) {
      return;
    }
    setLoading(true);
    setError(undefined);

    const load = async () => {
      try {
        const nextBlock = await store.get<T>(id);
        setBlock(nextBlock);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, store]);

  return { loading, error, block };
};

const useBlocksStore = () => {
  const { store } = useBlocsContext();
  return store;
};

const useGetBlockOrCreate = () => {
  const { store } = useBlocsContext();
  return store.getOrCreate;
};

export { useBlock, useGetBlockOrCreate, useBlocksStore };
