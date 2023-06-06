import { useCallback, useContext, useEffect, useState } from 'react';
import { PartialDeep } from 'type-fest';
import { BlockContext } from './context';
import { useGetBlockOrCreate as useGetOrCreate } from '../blocks/hooks';
import { BlockCreate } from '../blocks/types';
import { useBlockChildren } from '../block-relations';
import { useOpen as useApiOpen } from '../api';
import { BlockRef } from '../block-ref';

const useBlockContext = () => {
  const context = useContext(BlockContext);
  if (!context) {
    throw new Error('useBlockContext must be used within a BlockProvider');
  }
  return context;
};

const useBlockId = () => {
  const { block } = useBlockContext();
  return block.id;
};

const useBlockType = () => {
  const { block } = useBlockContext();
  return block.type;
};

const useBlockRoot = () => {
  const { block } = useBlockContext();
  const [value, setValue] = useState(!!block.root);
  useEffect(() => {
    const update = () => setValue(!!block.root);
    block.on('updated', update);
    return () => {
      block.off('updated', update);
    };
  }, [block]);

  const set = useCallback(
    (root: boolean) => {
      block.root = root;
    },
    [block],
  );

  return [value, set] as const;
};

const useBlockName = () => {
  const { block } = useBlockContext();
  const [value, setValue] = useState(block.name);
  useEffect(() => {
    const update = () => setValue(block.name);
    block.on('updated', update);
    return () => {
      block.off('updated', update);
    };
  }, [block]);

  const set = useCallback(
    (name: string) => {
      block.name = name;
    },
    [block],
  );

  return [value, set] as const;
};

const useBlockContent = <T extends object>() => {
  const { block } = useBlockContext();
  const [value, setValue] = useState<PartialDeep<T>>(block.content as any);
  useEffect(() => {
    const update = () => setValue(block.content as any);
    block.on('updated', update);
    return () => {
      block.off('updated', update);
    };
  }, [block]);

  const set = useCallback(
    (
      content: PartialDeep<T> | ((current: PartialDeep<T>) => PartialDeep<T>),
    ) => {
      const value =
        typeof content === 'function' ? content(block.content as any) : content;
      block.content = {
        ...(block.content || {}),
        ...value,
      };
    },
    [block],
  );

  return [value, set] as const;
};

const useGetBlockOrCreate = () => {
  const getOrCreate = useGetOrCreate();
  const [, setChildren] = useBlockChildren();
  const fn = useCallback(
    async (input: BlockCreate) => {
      const block = await getOrCreate(input);
      if (!block) {
        throw new Error('Block not found');
      }
      setChildren((current) => [...current, block.id]);
      return block.id;
    },
    [getOrCreate, setChildren],
  );
  return fn;
};

const useOpen = () => {
  const apiOpen = useApiOpen();
  const id = useBlockId();
  const open = useCallback(
    (block: BlockRef) => {
      apiOpen(block, id);
    },
    [apiOpen, id],
  );
  return open;
};

const useOpenOrCreate = () => {
  const open = useOpen();
  const getOrCreate = useGetBlockOrCreate();
  const fn = useCallback(
    async (input: BlockCreate) => {
      const id = await getOrCreate(input);
      open(id);
    },
    [getOrCreate, open],
  );
  return fn;
};

export {
  useBlockId,
  useBlockType,
  useBlockRoot,
  useBlockName,
  useBlockContent,
  useGetBlockOrCreate,
  useOpen,
  useOpenOrCreate,
};
