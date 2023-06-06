import { BlockRef, BlockRefStore, Render } from '@morten-olsen/x-blocks';

const renderWithBlocks = (refStore: BlockRefStore, text: string) => {
  const result: React.ReactNode[] = [];
  let current = text;
  let blockIndex = 0;
  while (current.length > 0) {
    const index = current.indexOf('[block:');
    if (index === -1) {
      result.push(current);
      break;
    }
    if (index > 0) {
      result.push(current.slice(0, index));
      current = current.slice(index);
    } else if (
      index === 0 &&
      current.match(/^\[[block:[a-z0-9]+:[a-z0-9]+\]/)
    ) {
      const endIndex = current.indexOf(']');
      const [blockId, plugin] = current.slice(7, endIndex).split(':');
      const id = refStore.get({ id: blockId, plugin });
      result.push(<Render key={'b_' + blockIndex++} id={id} view="inline" />);
      current = current.slice(endIndex + 1);
    } else {
      result.push(current);
      current = '';
    }
  }
  return result.flatMap((node) => {
    if (typeof node === 'string') {
      return node.split('\n').flatMap((line, index) => {
        return index === 0 ? line : [<br key={index} />, line];
      });
    }
    return node;
  });
};

const getBlocks = (refStore: BlockRefStore, input: string) => {
  let current = input;
  const result: BlockRef[] = [];

  while (current.length > 0) {
    const index = current.indexOf('[block:');
    if (index === -1) {
      break;
    }
    if (index > 0) {
      current = current.slice(index);
    }
    if (index === 0 && current.match(/^\[block:[a-z0-9-]+:[a-z0-9-]+\]/)) {
      const endIndex = current.indexOf(']');
      const [blockId, plugin] = current.slice(7, endIndex).split(':');
      result.push(
        refStore.get({
          id: blockId,
          plugin,
        }),
      );
      current = current.slice(endIndex + 1);
    }
  }

  return result;
};

export { renderWithBlocks, getBlocks };
