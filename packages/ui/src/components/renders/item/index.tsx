import { Plugin } from '@morten-olsen/x-blocks';
import { styled } from 'styled-components';
import { BaseElement, Typography } from '../../base';

type RenderItemProps = {
  name: string;
  description?: string;
  type: string;
  icon?: React.ReactNode;
  plugin: Plugin;
  onPress?: (type: string, plugin: Plugin) => void;
};

const Wrapper = styled(BaseElement)`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  background: ${({ theme }) => theme.colors.bg.base};
  border-radius: 5px;
  overflow: hidden;

  &:hover {
    background: ${({ theme }) => theme.colors.bg.highlight};
    color: ${({ theme }) => theme.colors.text.highlight};
  }
`;

const Icon = styled.div`
  width: 2rem;
  height: 2rem;

  & > svg {
    width: 100%;
    height: 100%;
  }
`;

const RenderItem: React.FC<RenderItemProps> = ({
  name,
  type,
  icon,
  plugin,
  onPress,
}) => (
  <Wrapper onClick={() => onPress?.(type, plugin)} $m="sm" $py="md" $px="md">
    <BaseElement $mr="sm">
      <Icon>{icon}</Icon>
    </BaseElement>
    <Typography
      variant="title"
      as="div"
      $fc
      $items="flex-start"
      $justify="flex-start"
    >
      {name}
      <Typography variant="subtitle" as="div">
        {plugin.icon}
        {plugin.name}
      </Typography>
    </Typography>
  </Wrapper>
);

export { RenderItem };
