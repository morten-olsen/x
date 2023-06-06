import { Plugin } from '@morten-olsen/x-blocks';
import { Sidebar } from './renders/sidebar';
import { Folder } from './renders/folder';
import { UI } from './renders/ui';
import { Workspace } from './renders/workspace';
import {
  IoGridOutline,
  IoHomeOutline,
  IoFolderOutline,
  IoWaterOutline,
} from 'react-icons/io5';

const plugin: Plugin = {
  name: 'Interface',
  id: 'ui',
  renders: {
    workspace: {
      name: 'Workspace',
      icon: <IoGridOutline />,
      views: {
        default: Workspace,
      },
    },
    ui: {
      name: 'UI',
      icon: <IoHomeOutline />,
      views: {
        default: UI,
      },
    },
    sidebar: {
      name: 'Sidebar',
      icon: <IoWaterOutline />,
      views: {
        default: Sidebar,
      },
    },
    folder: {
      name: 'Folder',
      icon: <IoFolderOutline />,
      views: {
        default: Folder,
      },
    },
  },
};

export default plugin;
