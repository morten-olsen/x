import { EventEmitter } from 'eventemitter3';
import { BlockRef } from '../../block-ref';

type BlockRelationEvents = {
  updatedFrom: () => void;
};

class BlockRelationStore extends EventEmitter<BlockRelationEvents> {
  #from: BlockRef[];

  constructor(from: BlockRef[]) {
    super();
    this.#from = from;
  }

  public get from(): BlockRef[] {
    return this.#from;
  }

  public setRelationFrom = (ids: BlockRef[]): void => {
    this.#from = ids;
    this.emit('updatedFrom');
  };
}

export { BlockRelationStore };
