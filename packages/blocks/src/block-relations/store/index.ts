import { BlockRef, BlockRefStore } from '../../block-ref';
import { Database } from '../../database';
import { BlockRelationStore } from './block';

class BlocksRelationStore {
  #blocks: {
    [id: string]: Promise<BlockRelationStore>;
  };
  #database: Database;
  #refs: BlockRefStore;

  constructor(database: Database, refs: BlockRefStore) {
    this.#blocks = {};
    this.#database = database;
    this.#refs = refs;
  }

  #idToString = (id: BlockRef) => {
    return JSON.stringify(id);
  };

  public set = async (from: BlockRef, to: BlockRef[]) => {
    const fromStorePromise = this.#blocks[this.#idToString(from)];
    if (fromStorePromise) {
      const store = await fromStorePromise;
      store.setRelationFrom(to);
    }
    await this.#database.setRelations(from, to);
  };

  public get = async (id: BlockRef) => {
    const key = this.#idToString(id);
    if (key in this.#blocks) {
      return this.#blocks[key];
    }
    this.#blocks[key] = this.#database.getRelations(id).then((relations) => {
      const refs = relations.map((relation) => this.#refs.get(relation));
      const store = new BlockRelationStore(refs);
      return store;
    });

    return this.#blocks[key];
  };
}

export { BlocksRelationStore };
