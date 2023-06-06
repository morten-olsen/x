import { useEffect, useState } from 'react';
import { useGetBlockOrCreate } from '../blocks/hooks';
import { Block } from '../blocks/types';
import { Render } from '../render';
import { BlockRef } from '../block-ref';

type RootProps = {
  block: Omit<Block<any>, 'updated'>;
};
const Root: React.FC<RootProps> = ({ block }) => {
  const getOrCreate = useGetBlockOrCreate();
  const [blockId, setBlockId] = useState<BlockRef>();

  useEffect(() => {
    const run = async () => {
      const nextBlock = await getOrCreate(block);
      if (!nextBlock) {
        throw new Error('Could not create block');
      }
      setBlockId(nextBlock.id);
    };
    run();
  }, [block, setBlockId, getOrCreate]);

  if (!blockId) {
    return null;
  }

  return <Render id={blockId} />;
};

export { Root };
