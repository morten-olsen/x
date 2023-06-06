import { Root } from '@morten-olsen/x-blocks';
import { useMemo } from 'react';

const Sidebar: React.FC = () => {
  const rootId = useMemo(
    () => ({
      id: 'root-folder',
      type: 'folder',
      plugin: 'ui',
      name: '.',
      content: {},
    }),
    [],
  );

  return <Root block={rootId} />;
};

export { Sidebar };
