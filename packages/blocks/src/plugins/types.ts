import { useGetBlockOrCreate } from '../blocks/hooks';
import { useGetBlockRef } from '../block-ref';
import { useAddNotification } from '../notifications';

type BackgroundTaskApi = {
  signal: AbortSignal;
  getRef: ReturnType<typeof useGetBlockRef>;
  getAuth: (id: string) => Promise<any | undefined>;
  createBlock: ReturnType<typeof useGetBlockOrCreate>;
  addNotification: ReturnType<typeof useAddNotification>;
};

type Plugin = {
  name: string;
  id: string;
  icon?: React.ReactNode;
  backgroundTask?: (api: BackgroundTaskApi) => void;
  renders: {
    [render: string]: {
      name: string;
      icon?: React.ReactNode;
      views: {
        [name: string]: React.FC;
      } & {
        default: React.FC;
      };
    };
  };
};

export type { Plugin, BackgroundTaskApi };
