import {
  BlockRef,
  Render,
  useBlockChildren,
  useBlockName,
  withBlock,
  useEvents,
  useBlockContent,
  useRender,
  useBlockId,
} from '@morten-olsen/x-blocks';
import { HiOutlineEye } from 'react-icons/hi';
import { FiEdit3 } from 'react-icons/fi';
import { VscLayoutSidebarLeftOff } from 'react-icons/vsc';

import styled from 'styled-components';
import { BaseElement, Tabs, Typography } from '@morten-olsen/x-ui';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { emitter } from '../events';

type WorkspaceContent = {
  selected?: string;
};

const HeaderWrapper = styled.div``;

const ItemWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  padding: 50px;
  margin: 0 auto;
`;

const HeaderInput = styled(Typography)`
  all: unset;
`;

type HeaderProps = {
  close: () => void;
};

const RenderActions = withBlock(() => {
  const render = useRender();
  const id = useBlockId();

  const hasTools = useMemo(() => 'tools' in render.views, [render]);

  if (!hasTools) {
    return null;
  }
  return <Render id={id} view="tools" />;
});

const Header = withBlock<HeaderProps>(({ close }) => {
  const [name, setName] = useBlockName();

  return (
    <>
      <HeaderWrapper>
        <HeaderInput
          as="input"
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
          placeholder="Unnamed"
        />
      </HeaderWrapper>
      <Tabs.Close onClick={close} />
    </>
  );
});

const ActionWrapper = styled(BaseElement)`
  display: flex;
  gap: ${({ theme }) => `${theme.space.sm}${theme.units.space}`};
  padding: ${({ theme }) => `${theme.space.sm}${theme.units.space}`};
  margin-bottom: ${({ theme }) => `${theme.space.sm}${theme.units.space}`};
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.bg.base100};
  align-items: center;
  justify-content: center;

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

const Toolbar = styled(BaseElement)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const SidebarButton = styled(BaseElement)`
  @media screen and (min-width: 801px) {
    display: none;
  }
`;

const Item: React.FC<{ id: BlockRef }> = ({ id }) => {
  const [readOnly, setReadOnly] = useState(false);
  return (
    <ItemWrapper>
      <Toolbar>
        <ActionWrapper>
          {!readOnly && <RenderActions id={id} />}
          {readOnly ? (
            <FiEdit3 onClick={() => setReadOnly(false)} />
          ) : (
            <HiOutlineEye onClick={() => setReadOnly(true)} />
          )}
        </ActionWrapper>
      </Toolbar>
      <Render id={id} readOnly={readOnly} />
    </ItemWrapper>
  );
};

const idToString = (id: BlockRef) => `${id.plugin}:${id.id}`;

const Workspace: React.FC = () => {
  const [children, setChildren] = useBlockChildren();
  const events = useEvents();
  const [value, setValue] = useBlockContent<WorkspaceContent>();

  const setSelected = useCallback(
    (blockId: string) => {
      setValue((current) => ({
        ...current,
        selected: blockId,
      }));
    },
    [setValue],
  );

  const open = useCallback(
    (block: BlockRef) => {
      if (!children.map((id) => idToString(id)).includes(idToString(block))) {
        setChildren((current) => [...current, block]);
      }
      setSelected(idToString(block));
    },
    [setChildren, children, setSelected],
  );

  useEffect(() => {
    events.on('open', open);
    return () => {
      events.off('open', open);
    };
  }, [events, open]);

  return (
    <Tabs value={value.selected} onValueChange={(next) => setSelected(next)}>
      <Tabs.List>
        <SidebarButton
          $fc
          $items="center"
          $justify="center"
          $px="md"
          onClick={() => emitter.emit('sidebar:open')}
        >
          <VscLayoutSidebarLeftOff />
        </SidebarButton>
        {children.map((child, i) => (
          <Tabs.Trigger value={idToString(child)} key={idToString(child)}>
            <Header
              close={() => {
                setChildren((current) => {
                  const next = [...current];
                  next.splice(i, 1);
                  return next;
                });
              }}
              id={child}
            />
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {children.map((child) => (
        <Tabs.Content value={idToString(child)} key={idToString(child)}>
          <Item id={child} />
        </Tabs.Content>
      ))}
    </Tabs>
  );
};

export { Workspace };
