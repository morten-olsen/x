import { FiFileText } from 'react-icons/fi';
import { Plugin } from '@morten-olsen/x-blocks';
import { Text } from './renders/text';
import { TextInline } from './renders/inline';
import { Tools } from './renders/tools';

const plugin: Plugin = {
  name: 'Text',
  id: 'text',
  renders: {
    text: {
      name: 'Text',
      icon: <FiFileText />,
      views: {
        default: Text,
        inline: TextInline,
        tools: Tools,
      },
    },
  },
};

export default plugin;
