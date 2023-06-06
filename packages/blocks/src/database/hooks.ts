import { useCallback, useContext } from 'react';
import { DatabaseContext } from './context';
import { FindBlocksOptions } from './types';
import { useBlockRefStore } from '../block-ref';

const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context.database;
};

const useFindBlocks = () => {
  const database = useDatabase();
  const refs = useBlockRefStore();
  const fn = useCallback(
    (options: FindBlocksOptions) => {
      return database.findBlocks(options).then((blocks) => {
        return blocks.map((block) => {
          return refs.get(block);
        });
      });
    },
    [database, refs],
  );
  return fn;
};

export { useDatabase, useFindBlocks };
