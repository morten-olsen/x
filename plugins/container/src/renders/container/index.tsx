import {
  Plugin,
  useBlockChildren,
  useGetBlockOrCreate,
} from '@morten-olsen/x-blocks';
import {
  AddBlockDialog,
  AttachBlockDialog,
  BaseElement,
  DropdownMenu,
} from '@morten-olsen/x-ui';
import styled from 'styled-components';
import { useCallback, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { Item } from './item';

const Actions = styled(BaseElement)``;

const Wrapper = styled(BaseElement)``;

const Container: React.FC = () => {
  const [children, setChildren] = useBlockChildren();
  const getOrCreate = useGetBlockOrCreate();
  const [isAdding, setIsAdding] = useState(false);
  const [isAttaching, setIsAttaching] = useState(false);

  const create = useCallback(
    (type: string, plugin: Plugin) => {
      getOrCreate({
        type,
        plugin: plugin.id,
        content: {},
      });
    },
    [getOrCreate],
  );

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
      <Actions $fr $items="center" $justify="center" $p="sm">
        <DropdownMenu>
          <DropdownMenu.Trigger>
            <FiPlusCircle />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item onClick={() => setIsAdding(true)}>
              Add block
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => setIsAttaching(true)}>
              Attach block
            </DropdownMenu.Item>
            <DropdownMenu.Arrow />
          </DropdownMenu.Content>
        </DropdownMenu>
      </Actions>
      <AddBlockDialog
        open={isAdding}
        onOpenChange={setIsAdding}
        onSelect={create}
      />
      <AttachBlockDialog open={isAttaching} onOpenChange={setIsAttaching} />
    </Wrapper>
  );
};

export { Container };
