import { Plugin } from '@morten-olsen/x-blocks';
import { FaGithub, FaCodeBranch } from 'react-icons/fa';

const plugins = [
  {
    name: 'GitHub',
    id: 'github',
    icon: <FaGithub />,
    renders: {
      pr: {
        name: 'Pull Request',
        icon: <FaCodeBranch />,
        views: {
          default: () => null,
        },
      },
    },
  },
] satisfies Plugin[];

export { plugins };
