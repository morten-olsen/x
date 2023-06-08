import { Root } from '@morten-olsen/x-blocks';
import { BaseElement, Typography } from '@morten-olsen/x-ui';
import { memo } from 'react';

type SlackBlockEmoji = {
  type: 'emoji';
  name: string;
  unicode: string;
};

type SlackBlockLink = {
  url: string;
  type: 'link';
  text: string;
};
type SlackBlockText = {
  text: string;
  type: 'text';
};

type SlackBlockUser = {
  type: 'user';
  user_id: string;
};

type SlackBlockRichTextSection = {
  type: 'rich_text_section';
  elements: (
    | SlackBlockLink
    | SlackBlockText
    | SlackBlockEmoji
    | SlackBlockUser
  )[];
};

type SlackBlockRichText = {
  block_id: string;
  elements: SlackBlockRichTextSection[];
  type: 'rich_text';
};

type SlackBlockHeader = {
  text: {
    emoji: boolean;
    text: string;
    type: 'plain_text';
  };
  type: 'header';
};

type SlackBlockImage = {
  type: 'image';
  image_url: string;
  alt_text: string;
};

type SlackBlockContext = {
  type: 'context';
};

type Props = {
  block:
    | SlackBlockRichText
    | SlackBlockHeader
    | SlackBlockImage
    | SlackBlockContext;
};

const unicodeToEmoji = (unicode: string) => {
  const codePoints = unicode.split('-').map((u) => parseInt(u, 16));
  return String.fromCodePoint(...codePoints);
};

const SlackRichText = memo<Props>(({ block }) => {
  if (block.type === 'header') {
    return (
      <BaseElement $p="sm">
        <Typography variant="title">{block.text.text}</Typography>
      </BaseElement>
    );
  }
  if (block.type === 'rich_text') {
    return (
      <BaseElement $p="sm">
        {block.elements?.map((section, i) => (
          <Typography key={section.type + i}>
            {section.elements?.map((element, i) => {
              if (element.type === 'link') {
                return (
                  <a
                    key={element.url + i}
                    href={element.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {element.text || element.url}
                  </a>
                );
              }
              if (element.type === 'emoji') {
                return unicodeToEmoji(element.unicode);
              }
              if (element.type === 'text') {
                return element.text;
              }
              if (element.type === 'user') {
                return (
                  <Root
                    key={element.user_id + i}
                    block={{
                      id: `slack-user-${element.user_id}`,
                      plugin: 'slack',
                      type: 'user',
                      content: {
                        id: element.user_id,
                      },
                    }}
                  />
                );
              }
              return (
                <pre>
                  unknown:
                  {JSON.stringify(element, null, 2)}
                </pre>
              );
            })}
          </Typography>
        ))}
      </BaseElement>
    );
  }
  return (
    <pre>
      unknown:
      {JSON.stringify(block, null, 2)}
    </pre>
  );
});

export { SlackRichText };
