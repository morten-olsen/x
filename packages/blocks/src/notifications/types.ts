import { BlockRef } from '../block-ref';

type Notification = {
  ref: BlockRef;
  id?: string;
  title: string;
  data?: any;
};

export type { Notification };
