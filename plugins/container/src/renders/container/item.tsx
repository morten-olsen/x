import {
  BlockRef,
  Render,
  useBlockChildren,
  useBlockId,
  useIsReadOnly,
  useRender,
  withBlock,
} from '@morten-olsen/x-blocks';
import styled from 'styled-components';
import {
  BaseElement,
  Dialog,
  DropdownMenu,
  Typography,
} from '@morten-olsen/x-ui';
import {
  FiMoreHorizontal,
  FiArrowDown,
  FiArrowUp,
  FiTrash,
  FiEdit2,
} from 'react-icons/fi';
import { useCallback, useMemo, useState } from 'react';

type Props = {
  id: BlockRef;
  remove: () => void;
};

const Actions = styled(BaseElement)<{ $visible?: boolean }>`
  opacity: 0;
  gap: ${({ theme }) => `${theme.space.sm}${theme.units.space}`};
  ${({ $visible, theme }) =>
    $visible &&
    `
      opacity: 1;
      background: ${theme.colors.bg.highlight100};
      `}

  svg {
    width: 16px;
    height: 16px;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.bg.highlight};
      transform: scale(1.1);
    }
  }
`;

const Wrapper = styled(BaseElement)<{ $readonly?: boolean }>`
  border-radius: 5px;
  overflow: hidden;
  ${({ theme, $readonly }) =>
    $readonly &&
    `
  &:hover {
    box-shadow: 0 0 0 1px ${theme.colors.bg.highlight100};
  }
  `}
`;

const RenderActions = withBlock(() => {
  const render = useRender();
  const id = useBlockId();

  const hasTools = useMemo(() => 'tools' in render.views, [render]);

  if (!hasTools) {
    return null;
  }
  return <Render id={id} view="tools" />;
});

const Item: React.FC<Props> = ({ id, remove }) => {
  const isReadOnly = useIsReadOnly();
  const [menuOpen, setMenuOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [, setChildren] = useBlockChildren();
  const move = useCallback(
    (places: number) => {
      setChildren((current) => {
        let copy = [...current];
        const index = copy.findIndex(
          (item) => item.id === id.id && item.plugin === id.plugin,
        );
        const newIndex = index + places;
        if (newIndex < 0 || newIndex >= copy.length) {
          return copy;
        }
        const tmp = copy[newIndex];
        copy[newIndex] = copy[index];
        copy[index] = tmp;
        copy = copy.filter((item) => item !== undefined);
        return copy;
      });
    },
    [setChildren, id],
  );
  return (
    <Wrapper
      $fr
      $items="stretch"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <BaseElement $f={1} $p="sm">
        <Render id={id} />
        {!isReadOnly && (
          <Typography variant="tiny">
            {id.id}:{id.plugin}
          </Typography>
        )}
      </BaseElement>
      {editOpen && (
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.CloseButton />
              <Render id={id} view="editor" />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
      )}
      {!isReadOnly && (
        <Actions $visible={hover || menuOpen} $fc $p="md">
          <FiArrowUp onClick={() => move(-1)} />
          <RenderActions id={id} />
          <DropdownMenu onOpenChange={setMenuOpen} open={menuOpen}>
            <DropdownMenu.Trigger>
              <FiMoreHorizontal />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item onClick={() => setEditOpen(true)}>
                <DropdownMenu.Icon>
                  <FiEdit2 />
                </DropdownMenu.Icon>
                Edit
              </DropdownMenu.Item>
              <DropdownMenu.Item onClick={remove}>
                <DropdownMenu.Icon>
                  <FiTrash />
                </DropdownMenu.Icon>
                Remove
              </DropdownMenu.Item>
              <DropdownMenu.Arrow />
            </DropdownMenu.Content>
          </DropdownMenu>
          <FiArrowDown onClick={() => move(1)} />
        </Actions>
      )}
    </Wrapper>
  );
};

export { Item };
