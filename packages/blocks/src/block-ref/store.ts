import { BlockRef, BlockRefData, refCheck } from './types';
import { stringifyRef } from './utils';

class BlockRefStore {
  #refs: Record<string, BlockRef> = {};

  public get = (data: BlockRefData) => {
    const str = stringifyRef(data);
    if (!this.#refs[str]) {
      this.#refs[str] = {
        id: data.id,
        plugin: data.plugin,
        owner: data.owner,
        [refCheck]: true,
      };
    }
    return this.#refs[str];
  };
}

export { BlockRefStore };
