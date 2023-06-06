import React, { createContext } from 'react';
import { useBlock } from '../blocks';
import { PluginProvider } from '../plugin';
import { BlockRef } from '../block-ref';

type BlockContextValue = {
  block: Exclude<ReturnType<typeof useBlock>['block'], undefined>;
};

type BlockProviderProps = {
  id: BlockRef;
  children: React.ReactNode;
  loader?: React.ReactNode;
};

const BlockContext = createContext<BlockContextValue | null>(null);

const BlockProvider: React.FC<BlockProviderProps> = ({
  id,
  children,
  loader,
}) => {
  const { block, loading } = useBlock(id);

  if (loading) {
    return <>{loader}</>;
  }

  if (!block) {
    return null;
  }

  return (
    <BlockContext.Provider value={{ block }}>
      <PluginProvider id={block.id.plugin}>{children}</PluginProvider>
    </BlockContext.Provider>
  );
};

export { BlockContext, BlockProvider };
