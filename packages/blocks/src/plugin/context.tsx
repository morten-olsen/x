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

  const value = useMemo(() => ({ plugin }), [plugin]);

  if (!value.plugin) {
    return null;
  }

  return (
    <PluginContext.Provider value={value as any}>
      {children}
    </PluginContext.Provider>
  );
};

export { PluginContext, PluginProvider };
