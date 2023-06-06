import { useMemo } from 'react';
import { useBlockType } from '../block';
import { usePlugin } from '../plugin';
import { useRender } from './hooks';

type RenderContentProps = {
  view?: string;
};

const RenderContent: React.FC<RenderContentProps> = ({ view = 'default' }) => {
  const plugin = usePlugin();
  const type = useBlockType();
  const render = useRender();
  const renderView = useMemo(() => {
    const availableViews = Object.keys(plugin.renders[type].views);
    return availableViews.includes(view) ? view : 'default';
  }, [plugin.renders, type, view]);
  const RenderComponent = useMemo(
    () => render.views[renderView],
    [render, renderView],
  );

  return <RenderComponent />;
};

export { RenderContent };
