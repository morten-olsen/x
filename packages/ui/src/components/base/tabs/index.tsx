import * as TabsPrimities from '@radix-ui/react-tabs';
import { FiX } from 'react-icons/fi';
import styled from 'styled-components';

const Root = styled(TabsPrimities.Root)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const List = styled(TabsPrimities.List)`
  flex-shrink: 0;
  display: flex;
  border-bottom: 1px solid var(--mauve6);
  overflow-x: auto;
`;

const Trigger = styled(TabsPrimities.Trigger)`
  font-family: inherit;
  padding: 0 20px;
  height: 45px;
  max-width: 200px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  line-height: 1;
  user-select: none;

  &:hover {
    color: ${({ theme }) => theme.colors.bg.highlight};
  }

  &[data-state='active'] {
    color: ${({ theme }) => theme.colors.bg.highlight};
    box-shadow: inset 0 -1px 0 0 currentColor, 0 2px 0 0 currentColor;
  }
`;

const Content = styled(TabsPrimities.Content)`
  flex-grow: 1;
  outline: none;
  overflow-y: auto;
`;

const CloseWrapper = styled.div``;

type CloseProps = {
  onClick?: () => void;
};

const Close: React.FC<CloseProps> = ({ onClick }) => (
  <CloseWrapper onClick={onClick}>
    <FiX />
  </CloseWrapper>
);

const Tabs = Object.assign(Root, {
  List,
  Trigger,
  Content,
  Close,
});

export { Tabs };
