import { useContext } from 'react';
import { PluginsContext } from './context';

const usePluginsContext = () => {
  const context = useContext(PluginsContext);
  if (!context) {
    throw new Error('usePluginsContext must be used within a PluginsProvider');
  }
  return context;
};

const usePluginsRenders = () => {
  const { renders } = usePluginsContext();
  return renders;
};

const usePlugins = () => {
  const { plugins } = usePluginsContext();
  return plugins;
};

export { usePluginsRenders, usePlugins };
