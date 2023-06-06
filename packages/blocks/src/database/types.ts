import { BlockRef, BlockRefData } from '../block-ref';
import { Block } from '../blocks';

type FindBlocksOptions = {
  text?: string;
  limit?: number;
};

type Database = {
  getBlock: <T extends object>(id: BlockRef) => Promise<Block<T> | undefined>;
  saveBlock: (block: Block) => Promise<void>;
  findBlocks: (options: FindBlocksOptions) => Promise<BlockRefData[]>;
  setRelations: (from: BlockRef, to: BlockRef[]) => Promise<void>;
  getRelations: (from: BlockRef) => Promise<BlockRefData[]>;
  setAuth: (client: string, data: any) => Promise<void>;
  getAuth: (client: string) => Promise<any>;
};

export type { Database, FindBlocksOptions };
