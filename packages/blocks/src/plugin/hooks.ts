import { useContext } from 'react';
import { PluginContext } from './context';

const usePluginContext = () => {
  const context = useContext(PluginContext);
  if (!context) {
    throw new Error('usePluginContext must be used within a PluginProvider');
  }
  return context;
};

const usePlugin = () => {
  const { plugin } = usePluginContext();
  return plugin;
};

export { usePlugin };
