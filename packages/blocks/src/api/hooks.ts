import { useContext } from 'react';
import { ApiContext } from './context';

const useApiContext = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApiContext must be used within an ApiProvider');
  }

  return context;
};

const useEvents = () => {
  const { events } = useApiContext();
  return events;
};

const useOpen = () => {
  const { open } = useApiContext();
  return open;
};

export { useEvents, useOpen };
