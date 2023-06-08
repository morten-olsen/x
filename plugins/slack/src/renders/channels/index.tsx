import { BaseElement, Typography } from '@morten-olsen/x-ui';
import { withAuth } from '../../context';
import styled from 'styled-components';
import Fuse from 'fuse.js';
import { useFetchAction } from '../../hooks';
import { useBlockContent, useOpenOrCreate } from '@morten-olsen/x-blocks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IoMdRefreshCircle } from 'react-icons/io';

// https://api.slack.com/methods

type ChannelContent = {
  channels: any;
};

const ChannelWrapper = styled(BaseElement)`
  cursor: default;
  border-radius: 5px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.bg.highlight100};
  }
`;

const ChannelsRender = withAuth(() => {
  const [value, setValue] = useBlockContent<ChannelContent>();
  const channels = useFetchAction<any>(async (o) => {
    try {
      const result: any[] = [];
      let cursor: string | undefined;
      while (true) {
        const response = await o('conversations.list', {
          types: 'public_channel,private_channel',
          limit: 1000,
          exclude_archived: true,
          ...(cursor ? { cursor } : {}),
        });
        result.push(...response.channels);
        cursor = response.response_metadata?.next_cursor;
        if (!cursor) {
          break;
        }
      }
      return result;
    } catch (e) {
      console.error(e);
      return [];
    }
  }, []);
  const openOrCreate = useOpenOrCreate();
  const searcher = useMemo(
    () =>
      new Fuse(value.channels || [], {
        keys: [
          { name: 'id', weight: 0.3 },
          { name: 'name', weight: 1 },
          { name: 'purpose', weight: 0.3 },
          { name: 'topic', weight: 0.3 },
        ],
      }),
    [value.channels],
  );
  const [search, setSearch] = useState('');
  const searchResult = useMemo(() => {
    if (!value.channels) {
      return [];
    }
    if (!search) {
      return value.channels;
    }
    const result = searcher.search(search);
    return result.map((r) => r.item);
  }, [search, searcher, value.channels]);

  useEffect(() => {
    if (!value.channels && !channels.loading) {
      channels.update(null).then((data) => {
        setValue({ channels: data });
      });
    }
  }, [value.channels, channels, setValue]);

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
    <BaseElement>
      <BaseElement $fr $p="md" $items="center" $gap="md">
        <IoMdRefreshCircle onClick={update} />
        <BaseElement
          $u
          as="input"
          $f={1}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />
      </BaseElement>
      <BaseElement>
        {searchResult.map((channel: any) => (
          <ChannelWrapper
            key={channel.id}
            onClick={() => openChannel(channel.id)}
            $p="md"
          >
            <Typography>{channel.name}</Typography>
            <Typography variant="tiny">
              {channel.purpose?.value || channel.topic?.value}
            </Typography>
          </ChannelWrapper>
        ))}
      </BaseElement>
    </BaseElement>
  );
});

export { ChannelsRender };
