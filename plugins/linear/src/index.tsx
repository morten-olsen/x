import { Plugin } from '@morten-olsen/x-blocks';
import { SiLinear } from 'react-icons/si';
import { TicketRender } from './renders/pr';
import { TicketEditor } from './renders/pr/editor';
import { TicketInline } from './renders/pr/inline';

const plugin: Plugin = {
  name: 'Linear',
  id: 'linear',
  icon: <SiLinear />,
  renders: {
    pr: {
      name: 'Ticket',
      icon: <SiLinear />,
      views: {
        default: TicketRender,
        editor: TicketEditor,
        inline: TicketInline,
      },
    },
  },
};

export default plugin;
