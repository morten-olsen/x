import { EventEmitter } from 'eventemitter3';
import type { PartialDeep } from 'type-fest';
import type { Block } from '../types';
import { BlockRef, BlockRefStore } from '../../block-ref';

type BlockEvents = {
  updated: () => void;
};

class BlockStore<T extends object> extends EventEmitter<BlockEvents> {
  #block: Block<T>;
  #id: BlockRef;

  constructor(block: Block<T>, refs: BlockRefStore) {
    super();
    this.#block = block;
    this.#id = refs.get(block);
  }

  public get id() {
    return this.#id;
  }

  public get name() {
    return this.#block.name;
  }

  public set name(name: string | undefined) {
    this.#block.name = name;
    this.emit('updated');
  }

  public get type() {
    return this.#block.type;
  }

  public get root() {
    return this.#block.root;
  }

  public set root(root: boolean | undefined) {
    this.#block.root = root;
    this.emit('updated');
  }

  public get content() {
    return this.#block.content;
  }

  public set content(data: PartialDeep<T>) {
    this.#block.content = data;
    this.emit('updated');
  }
}

export { BlockStore };
