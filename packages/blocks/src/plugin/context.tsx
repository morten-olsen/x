import { createContext, useMemo } from 'react';
import { usePlugins, Plugin } from '../plugins';

type PluginContextValue = {
  plugin: Plugin;
};

type PluginProviderProps = {
  id: string;
  children: React.ReactNode;
};

const PluginContext = createContext<PluginContextValue | undefined>(undefined);

const PluginProvider: React.FC<PluginProviderProps> = ({ id, children }) => {
  const plugins = usePlugins();
  const plugin = useMemo(() => {
    return plugins.find((currentPlugin) => currentPlugin.id === id);
  }, [id, plugins]);

  if (!plugin) {
    throw new Error(`Plugin ${id} not found`);
  }

  const value = useMemo(() => ({ plugin }), [plugin]);

  return (
    <PluginContext.Provider value={value}>{children}</PluginContext.Provider>
  );
};

export { PluginContext, PluginProvider };
