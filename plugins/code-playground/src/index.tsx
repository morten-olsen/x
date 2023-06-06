import { Plugin } from '@morten-olsen/x-blocks';
import { CodeRender } from './renders/code';
import { BiCodeCurly } from 'react-icons/bi';

const playground: Plugin = {
  name: 'Code Playground',
  id: 'code-playground',
  renders: {
    code: {
      name: 'Code Playground',
      icon: <BiCodeCurly />,
      views: {
        default: CodeRender,
      },
    },
  },
};

export { playground };
