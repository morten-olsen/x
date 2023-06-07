import { BaseElement, Row } from '@morten-olsen/x-ui';
import { withAuth } from '../../context';
import { useFetchAction } from '../../hooks';
import { useBlockContent, useOpenOrCreate } from '@morten-olsen/x-blocks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IoMdRefreshCircle } from 'react-icons/io';

// https://api.slack.com/methods

type ChannelContent = {
  channels: any;
};

const ChannelsRender = withAuth(() => {
  const [value, setValue] = useBlockContent<ChannelContent>();
  const channels = useFetchAction<any>(
    (o) => o('conversations.list', { types: 'public_channel,private_channel' }),
    [],
  );
  const openOrCreate = useOpenOrCreate();
  const [search, setSearch] = useState('');
  const searchResult = useMemo(() => {
    if (!value.channels?.channels) {
      return [];
    }
    return value.channels.channels.filter((channel: any) =>
      channel.name.includes(search),
    );
  }, [value.channels, search]);

  useEffect(() => {
    if (!value.channels) {
      channels.update(null).then((data) => {
        setValue({ channels: data });
      });
    }
  }, [setValue, channels.update, value.channels, channels]);

  const openChannel = useCallback(
    (id: string) => {
      openOrCreate({
        id: `slack-channel-${id}`,
        plugin: 'slack',
        type: 'channel',
        content: {
          id,
        },
      });
    },
    [openOrCreate],
  );

  const update = useCallback(() => {
    setValue({ channels: undefined });
  }, [setValue]);

  if (channels.loading) {
    return <div>Loading...</div>;
  }

  return (
    <BaseElement $fc $items="center" $justify="center">
      <BaseElement>
        <IoMdRefreshCircle onClick={update} />
      </BaseElement>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
      />
      <BaseElement>
        {searchResult.map((channel: any) => (
          <Row
            key={channel.id}
            onPress={() => openChannel(channel.id)}
            title={channel.name}
            description={channel.purpose?.value || channel.topic?.value}
          />
        ))}
      </BaseElement>
    </BaseElement>
  );
});

export { ChannelsRender };
