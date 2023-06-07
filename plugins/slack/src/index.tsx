import { Plugin } from '@morten-olsen/x-blocks';
import { ChannelRender } from './renders/channel';
import { ChannelEditor } from './renders/channel/editor';
import { UserRender } from './renders/user';
import { ChannelsRender } from './renders/channels';
import { FaSlack } from 'react-icons/fa';

const plugin: Plugin = {
  name: 'Slack',
  id: 'slack',
  renders: {
    channel: {
      name: 'Channel',
      icon: <FaSlack />,
      views: {
        default: ChannelRender,
        editor: ChannelEditor,
      },
    },
    channels: {
      name: 'Channels',
      icon: <FaSlack />,
      views: {
        default: ChannelsRender,
      },
    },
    user: {
      name: 'User',
      icon: <FaSlack />,
      views: {
        default: UserRender,
      },
    },
  },
};

export default plugin;
