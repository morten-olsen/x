import { Plugin } from '@morten-olsen/x-blocks';
import { Container } from './renders/container';
import { IoLayersOutline } from 'react-icons/io5';

const plugin = {
  name: 'Container',
  id: 'container',
  renders: {
    container: {
      name: 'Container',
      icon: <IoLayersOutline />,
      views: {
        default: Container,
      },
    },
  },
} satisfies Plugin;

export default plugin;
