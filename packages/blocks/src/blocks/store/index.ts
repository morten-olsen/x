import { BlockRef, BlockRefStore, stringifyRef } from '../../block-ref';
import { Database } from '../../database';
import { BlockCreate } from '../types';
import { BlockStore } from './block';

class BlocksStore {
  #database: Database;
  #refs: BlockRefStore;
  #activeBlocks: Record<string, Promise<BlockStore<any> | undefined>>;

  constructor(database: Database, refs: BlockRefStore) {
    this.#database = database;
    this.#refs = refs;
    this.#activeBlocks = {};
  }

  #getById = (id: BlockRef) => {
    const key = stringifyRef(id);
    return this.#activeBlocks[key];
  };

  #setup = (store: BlockStore<any>) => {
    store.on('updated', async () => {
      await this.#database.saveBlock({
        id: store.id.id,
        plugin: store.id.plugin,
        name: store.name,
        owner: store.id.owner,
        content: store.content,
        type: store.type,
        updated: Date.now(),
      });
    });
  };

  #register = <T extends object>(
    id: BlockRef,
    fn: () => Promise<BlockStore<T> | undefined>,
  ) => {
    let current = this.#getById(id);
    if (!current) {
      current = fn();
      Promise.resolve(current).then((store) => {
        if (!store) {
          return;
        }
        this.#setup(store);
      });
      this.#activeBlocks[stringifyRef(id)] = current;
    }
    return current;
  };

  public get = <T extends object>(id: BlockRef) =>
    this.#register(id, async () => {
      const block = await this.#database.getBlock<T>(id);
      if (!block) {
        return undefined;
      }
      return new BlockStore<T>(block, this.#refs);
    });

  public getOrCreate = async <T extends object>(block: BlockCreate<T>) => {
    const updatedBlock = {
      id: Math.random().toString(36).substring(2, 9),
      ...block,
    };
    const ref = this.#refs.get({
      id: updatedBlock.id,
      plugin: updatedBlock.plugin,
      owner: updatedBlock.owner,
    });
    return this.#register(ref, async () => {
      let current = await this.#database.getBlock<T>(ref);
      if (!current) {
        await this.#database.saveBlock({
          ...updatedBlock,
          updated: Date.now(),
        });
        current = updatedBlock as any;
      }
      if (!current) {
        throw new Error('Failed to create block');
      }
      return new BlockStore<T>(current, this.#refs);
    });
  };
}

export { BlocksStore };
