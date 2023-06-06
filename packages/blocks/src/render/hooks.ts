import { useContext, useMemo } from 'react';
import { useBlockType } from '../block';
import { usePlugin } from '../plugin';
import { RenderContext } from './context';

const useRender = () => {
  const plugin = usePlugin();
  const type = useBlockType();
  const render = useMemo(() => plugin.renders[type], [plugin, type]);

  return render;
};

const useIsReadOnly = () => {
  const context = useContext(RenderContext);
  if (!context) {
    throw new Error('useIsReadOnly must be used within a RenderContext');
  }
  return context.readOnly;
};

const useRenderParentId = () => {
  const context = useContext(RenderContext);
  if (!context) {
    throw new Error('useRenderParentId must be used within a RenderContext');
  }
  return context.parent;
};

export { useRender, useIsReadOnly, useRenderParentId };
