import { useBlockChildren } from '@morten-olsen/x-blocks';
import { BaseElement } from '@morten-olsen/x-ui';
import styled from 'styled-components';
import { Item } from './item';

const Wrapper = styled(BaseElement)``;

const Container: React.FC = () => {
  const [children, setChildren] = useBlockChildren();
  return (
    <Wrapper $fc>
      {children.map((child, index) => (
        <Item
          key={child.id + index}
          id={child}
          remove={() => {
            setChildren(children.filter((c) => c !== child));
          }}
        />
      ))}
    </Wrapper>
  );
};

export { Container };
