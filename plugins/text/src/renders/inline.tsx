import styled from 'styled-components';
import {
  useBlockContent,
  useBlockId,
  useBlockRefStore,
  useIsReadOnly,
  useOpen,
} from '@morten-olsen/x-blocks';
import { BaseElement } from '@morten-olsen/x-ui';
import { renderWithBlocks } from '../utils/render';

type TextContent = {
  text: string;
};

const Wrapper = styled(BaseElement)<{ readOnly: boolean }>`
  padding: 0 5px;
  border-radius: 5px;
  background-color: ${({ readOnly, theme }) =>
    !readOnly ? theme.colors.bg.base100 : 'transparent'};
  cursor: pointer;
  display: inline;
`;

const TextInline: React.FC = () => {
  const readOnly = useIsReadOnly();
  const [content] = useBlockContent<TextContent>();
  const refStore = useBlockRefStore();
  const renderes = renderWithBlocks(refStore, content.text || '');
  const id = useBlockId();
  const open = useOpen();

  return (
    <Wrapper
      readOnly={readOnly}
      onClick={() => {
        open(id);
      }}
    >
      {content.text && <>{renderes}</>}
    </Wrapper>
  );
};

export { TextInline };
