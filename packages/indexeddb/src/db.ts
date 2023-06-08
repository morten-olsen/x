import {
  Block,
  BlockRef,
  BlockRefData,
  Database,
  FindBlocksOptions,
  stringifyRef,
} from '@morten-olsen/x-blocks';
import Dexie from 'dexie';
import Fuse from 'fuse.js';
import { Queue } from './queue';

type Relations = {
  fromId: string;
  fromPlugin: string;
  fromOwner?: string;
  toId: string;
  toPlugin: string;
  toOwner?: string;
};

type AuthSessions = {
  id: string;
  data: any;
};

type RefId = {
  ref: string;
};

class IndexedDBDatabase extends Dexie implements Database {
  public blocks!: Dexie.Table<Block & RefId, string>;
  public blockRelations!: Dexie.Table<Relations & RefId, string>;
  public authSessions!: Dexie.Table<AuthSessions, string>;
  #queue: Queue;

  constructor(name = 'x-block') {
    super(name);
    this.#queue = new Queue();
    this.version(1).stores({
      blocks: 'ref',
      blockRelations: '++_id, ref',
      authSessions: 'id',
    });
  }

  public findBlocks = async (
    options: FindBlocksOptions,
  ): Promise<BlockRefData[]> => {
    const query = this.blocks.filter((block) => {
      if (!options.text) {
        return true;
      }
      const searcher = new Fuse([block], {
        keys: ['name', 'id', 'plugin'],
      });
      const result = searcher.search(options.text);
      return result.length > 0;
    });
    if (options.limit) {
      query.limit(options.limit);
    }
    const blocks = await query.toArray();
    return blocks.map((block) => ({
      id: block.id,
      plugin: block.plugin,
      owner: block.owner,
    }));
  };

  public getBlock = async <T extends object>(
    ref: BlockRef,
  ): Promise<Block<T> | undefined> => {
    const block = await this.blocks.where({ ref: stringifyRef(ref) }).first();
    if (!block) {
      return undefined;
    }
    return block as unknown as Block<T>;
  };

  public saveBlock = (block: Block) =>
    this.#queue.add(async () => {
      await this.blocks.put({
        ...block,
        ref: stringifyRef(block),
      });
    });

  public getRelations = async (from: BlockRef): Promise<BlockRefData[]> => {
    const relations = await this.blockRelations
      .where({
        ref: stringifyRef(from),
      })
      .toArray();
    return relations.map((relation) => ({
      id: relation.toId,
      plugin: relation.toPlugin,
      owner: relation.toOwner,
    }));
  };

  public setRelations = (from: BlockRef, to: BlockRef[]) =>
    this.#queue.add(async () => {
      await this.blockRelations
        .where({
          ref: stringifyRef(from),
        })
        .delete();
      await this.blockRelations.bulkPut(
        to.map((toRef) => ({
          fromId: from.id,
          fromPlugin: from.plugin,
          fromOwner: from.owner,
          toId: toRef.id,
          toPlugin: toRef.plugin,
          toOwner: toRef.owner,
          ref: stringifyRef(from),
        })),
      );
    });

  public getAuth = async (id: string) => {
    const session = await this.authSessions.get(id);
    if (!session) {
      return undefined;
    }
    return session.data;
  };

  public setAuth = (id: string, data: any) =>
    this.#queue.add(async () => {
      await this.authSessions.put({ id, data });
    });
}

export { IndexedDBDatabase };
