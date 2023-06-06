import { createContext, useMemo } from 'react';
import { Plugin } from './types';

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

  const value = useMemo(() => ({ renders, plugins }), [renders, plugins]);

  return (
    <PluginsContext.Provider value={value}>{children}</PluginsContext.Provider>
  );
};

export type { PluginsContextValue };
export { PluginsContext, PluginsProvider };
