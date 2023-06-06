import { Database } from './types';
import { Block } from '../blocks';
import { BlockRef } from '../block-ref';

class MemoryDB implements Database {
  #relations: Record<string, BlockRef[]> = {};
  #blocks: Record<string, Block<any>> = {};
  #auth: Record<string, any> = {};

  constructor() {
    const raw = localStorage.getItem('db');
    if (raw) {
      const db = JSON.parse(raw);
      this.#relations = db.relations || {};
      this.#blocks = db.blocks || {};
      this.#auth = db.auth || {};
    }
    (window as any).db = {
      relations: this.#relations,
      blocks: this.#blocks,
    };
  }

  #save = () => {
    localStorage.setItem(
      'db',
      JSON.stringify({
        relations: this.#relations,
        blocks: this.#blocks,
        auth: this.#auth,
      }),
    );
  };

  public getBlock = async <T extends object>(block: BlockRef) => {
    const id = JSON.stringify({
      id: block.id,
      plugin: block.plugin,
      owner: block.owner,
    });
    return this.#blocks[id] as Block<T>;
  };

  public saveBlock = async (block: Block<any>) => {
    const id = JSON.stringify({
      id: block.id,
      plugin: block.plugin,
      owner: block.owner,
    });
    this.#blocks[id] = block;
    this.#save();
  };

  public findBlocks = async (options: { text?: string; limit?: number }) => {
    let blocks = Object.values(this.#blocks);
    const { text } = options;
    if (text) {
      blocks = blocks.filter(
        (block) =>
          block.name?.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
          block.id?.toLocaleLowerCase().includes(text.toLocaleLowerCase()),
      );
    }
    return blocks.map((block) => ({
      id: block.id,
      plugin: block.plugin,
    }));
  };

  public getRelations = async (block: BlockRef) => {
    const id = JSON.stringify({
      id: block.id,
      plugin: block.plugin,
      owner: block.owner,
    });
    return this.#relations[id] || [];
  };

  public setRelations = async (block: BlockRef, relations: BlockRef[]) => {
    const id = JSON.stringify({
      id: block.id,
      plugin: block.plugin,
      owner: block.owner,
    });
    this.#relations[id] = relations;
    this.#save();
  };

  public getAuth = async (client: string) => {
    return this.#auth[client];
  };

  public setAuth = async (client: string, data: any) => {
    this.#auth[client] = data;
    this.#save();
  };
}

export { MemoryDB };
