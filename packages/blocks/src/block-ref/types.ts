const refCheck = Symbol('refCheck');

type BlockRefData = {
  id: string;
  plugin: string;
  owner?: string;
};

type BlockRef = BlockRefData & {
  [refCheck]: true;
};

export type { BlockRefData, BlockRef };
export { refCheck };
