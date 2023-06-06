import {
  withBlock,
  useBlockName,
  WrappedProps,
  useRender,
} from '@morten-olsen/x-blocks';
import { Row } from '../base';

type BlockItemProps = {
  onPress?: () => void;
};

const BlockItem = withBlock<BlockItemProps>(({ onPress }): any => {
  const [name] = useBlockName();
  const render = useRender();
  return (
    <Row
      onPress={onPress}
      title={name || 'Unnamed block'}
      description={`${render.name}`}
      left={<Row.Cell>{render.icon}</Row.Cell>}
    />
  );
}) as React.FC<BlockItemProps & WrappedProps>; // TODO: Why is this needed?

export { BlockItem };
