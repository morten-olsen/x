type Plugin = {
  name: string;
  id: string;
  icon?: React.ReactNode;
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

export type { Plugin };
