import { BaseElement, Typography } from '@morten-olsen/x-ui';
import { withAuth } from '../../context';
import { useFetchAction } from '../../hooks';
import {
  Root,
  useBlockContent,
  useBlockName,
  useOpenOrCreate,
} from '@morten-olsen/x-blocks';
import { ChannelEditor } from './editor';
import { useCallback, useEffect } from 'react';
import { IoMdRefreshCircle } from 'react-icons/io';
import { SlackRichText } from '../../components/slack-block';

// https://api.slack.com/methods

type ChannelContent = {
  id: string;
  ts?: string;
  info: any;
  history: {
    messages: any[];
  };
};

const ChannelRender = withAuth(() => {
  const [name, setName] = useBlockName();
  const [value, setValue] = useBlockContent<ChannelContent>();
  const history = useFetchAction<any>(
    async (o) => {
      const response = await o(
        !value.ts ? 'conversations.history' : 'conversations.replies',
        { channel: value.id, ts: value.ts },
      );
      return {
        messages: response.messages || [],
      };
    },
    [value.id, value.ts],
  );
  const openOrCreate = useOpenOrCreate();
  const info = useFetchAction<any>(
    (o) => o('conversations.info', { channel: value.id }),
    [value.id],
  );

  useEffect(() => {
    if (!value.id) {
      return;
    }
    if (!value.history) {
      history.update(null).then((data) => {
        setValue({ history: data });
      });
    }
  }, [value.id, setValue, history.update, value.history, history]);

  useEffect(() => {
    if (!value.id) {
      return;
    }
    if (!value.info) {
      info.update(null).then((data) => {
        setValue({ info: data });
        setName(name || data.channel.name);
      });
    }
  }, [value.id, setValue, info.update, value.info, info, setName, name]);

  const openThread = useCallback(
    (ts: string) => {
      openOrCreate({
        id: `slack-replies-${value.id}-${value.id}`,
        plugin: 'slack',
        type: 'channel',
        name: `Slack replies ${value.id}-${ts}`,
        content: {
          id: value.id,
          ts,
        },
      });
    },
    [openOrCreate, value.id],
  );

  const update = useCallback(() => {
    setValue({ history: undefined, info: null });
  }, [setValue]);

  if (!value.id) {
    return <ChannelEditor />;
  }

  if (history.loading) {
    return <div>Loading...</div>;
  }

  console.log(value);

  return (
    <BaseElement>
      <h1>
        {value.info?.channel?.name} <IoMdRefreshCircle onClick={update} />
      </h1>
      <Typography variant="tiny">
        {info.data?.channel?.topic?.value || info.data?.channel?.purpose?.value}
      </Typography>
      {value.history?.messages?.map((message: any) => (
        <BaseElement key={message.ts} $p="sm">
          <BaseElement>
            <Typography $bg="base100" $p="md" $br $mb="sm">
              {message.files && message.files.length > 0 && (
                <BaseElement $mb="sm">
                  {message.files.map((file: any) => (
                    <BaseElement key={file.id}>
                      <a href={file.url_private_download}>
                        <img src={file.thumb_360} />
                        {file.name} ({file.size})
                      </a>
                    </BaseElement>
                  ))}
                </BaseElement>
              )}
              {message.blocks && message.blocks.length > 0 ? (
                <>
                  {message.blocks.map((block: any, index: number) => (
                    <SlackRichText key={index} block={block} />
                  ))}
                </>
              ) : (
                <>{message.text}</>
              )}
              <BaseElement $fc $gap="sm">
                {message.reply_count > 0 && (
                  <BaseElement
                    $bg="highlight100"
                    $p="sm"
                    $mt="sm"
                    $br
                    onClick={() => openThread(message.thread_ts)}
                  >
                    {message.reply_count} replies (
                    {message.reply_users.join(', ')})
                  </BaseElement>
                )}
                <BaseElement $fr $gap="sm">
                  {message.reactions?.map((reaction: any) => (
                    <BaseElement
                      key={reaction.name}
                      $bg="highlight100"
                      $p="sm"
                      $br
                    >
                      {reaction.name} ({reaction.count})
                    </BaseElement>
                  ))}
                </BaseElement>
              </BaseElement>
            </Typography>
            {message.user && (
              <Root
                block={{
                  id: `slack-user-${message.user || message.bot_id}`,
                  plugin: 'slack',
                  type: 'user',
                  content: {
                    id: message.user || message.bot_id,
                  },
                }}
              />
            )}
          </BaseElement>
        </BaseElement>
      ))}
    </BaseElement>
  );
});

export { ChannelRender };
