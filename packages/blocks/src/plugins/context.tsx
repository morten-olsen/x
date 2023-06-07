import { createContext, useEffect, useMemo, useRef } from 'react';
import { Plugin } from './types';
import { useGetBlockOrCreate } from '../blocks/hooks';
import { useAddNotification } from '../notifications';
import { useGetBlockRef } from '../block-ref';

type PluginsContextValue = {
  plugins: Plugin[];
  renders: (Plugin['renders'][string] & {
    plugin: Plugin;
    type: string;
  })[];
};

type PluginsProviderProps = {
  plugins: Plugin[];
  children: React.ReactNode;
};

const PluginsContext = createContext<PluginsContextValue | null>(null);

const PluginsProvider: React.FC<PluginsProviderProps> = ({
  plugins,
  children,
}) => {
  const getOrCreateBlock = useGetBlockOrCreate();
  const addNotification = useAddNotification();
  const getRef = useGetBlockRef();
  const setupCache = useRef<string[]>([]);

  const renders = useMemo(() => {
    const nextRenders = plugins.flatMap((plugin) =>
      Object.entries(plugin.renders).map(([type, render]) => ({
        ...render,
        type,
        plugin,
      })),
    );
    return nextRenders;
  }, [plugins]);
  useEffect(() => {
    plugins.forEach((plugin) => {
      if (plugin.backgroundTask && !setupCache.current.includes(plugin.id)) {
        plugin.backgroundTask({
          signal: new AbortController().signal,
          createBlock: getOrCreateBlock,
          addNotification,
          getRef,
          getAuth: async () => undefined,
        });
      }
    });
    setupCache.current = [
      ...setupCache.current,
      ...plugins.map((plugin) => plugin.id),
    ];
  }, [plugins, getOrCreateBlock, addNotification, getRef]);

  const value = useMemo(() => ({ renders, plugins }), [renders, plugins]);

  return (
    <PluginsContext.Provider value={value}>{children}</PluginsContext.Provider>
  );
};

export type { PluginsContextValue };
export { PluginsContext, PluginsProvider };
