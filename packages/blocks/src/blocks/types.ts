import { PartialDeep } from 'type-fest';
import { BlockRefData } from '../block-ref';

type BlockBase = {
  updated: number;
};

type Block<T extends object = object> = BlockRefData &
  BlockBase & {
    type: string;
    name?: string;
    root?: boolean;
    content: PartialDeep<T>;
  };

type BlockCreate<T extends object = object> = Omit<
  Block<T>,
  keyof BlockBase | 'id'
> & {
  id?: BlockRefData['id'];
};

export type { Block, BlockCreate };
