import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import {
  useBlockChildren,
  useBlockContent,
  useBlockRefStore,
  useIsReadOnly,
} from '@morten-olsen/x-blocks';
import { BaseElement } from '@morten-olsen/x-ui';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getBlocks, renderWithBlocks } from '../utils/render';

type TextContent = {
  text: string;
};

const TextInput = styled(TextareaAutosize)`
  width: 100%;
  all: unset;
`;

const Wrapper = styled(BaseElement)<{ readOnly: boolean }>`
  ${({ readOnly, theme }) =>
    readOnly
      ? ``
      : `
      &:hover {
        background-color: ${theme.colors.bg.base100};
        cursor: default;
        border-radius: 5px;
      }
    `}
`;

const Text: React.FC = () => {
  const readOnly = useIsReadOnly();
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [, setChildren] = useBlockChildren();
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useBlockContent<TextContent>();
  const [editor, setEditor] = useState(content.text || '');
  const refStore = useBlockRefStore();
  const renderes = renderWithBlocks(refStore, content.text || '');

  useEffect(() => {
    setEditor(content.text || '');
  }, [content.text]);

  const update = useCallback(() => {
    setEditing(false);
    setContent({ text: editor });
    setChildren(getBlocks(refStore, editor));
  }, [editor, refStore, setContent, setChildren]);

  useEffect(() => {
    if (editing && editorRef.current) {
      editorRef.current.focus();
    }
  }, [editing]);

  return (
    <BaseElement>
      <BaseElement $fc>
        {editing && !readOnly ? (
          <TextInput
            ref={editorRef}
            value={editor}
            onBlur={update}
            placeholder="... Type something awesome"
            onChange={(e) => setEditor(e.target.value)}
          />
        ) : (
          <Wrapper
            readOnly={readOnly}
            onClick={() => {
              setEditing(true);
            }}
          >
            {content.text ? <>{renderes}</> : <>Click to edit</>}
          </Wrapper>
        )}
      </BaseElement>
    </BaseElement>
  );
};

export { Text };
