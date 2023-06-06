import { BlockRef, BlockRefData } from './types';

const stringifyRef = (ref: BlockRef | BlockRefData) => {
  return JSON.stringify({
    id: ref.id,

    plugin: ref.plugin,
    owner: ref.owner,
  });
};

export { stringifyRef };
