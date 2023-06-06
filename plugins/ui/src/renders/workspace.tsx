import {
  BlockRef,
  Render,
  useBlockChildren,
  useBlockName,
  withBlock,
  useEvents,
  useBlockContent,
} from '@morten-olsen/x-blocks';
import styled from 'styled-components';
import { Tabs, Typography } from '@morten-olsen/x-ui';
import { useCallback, useEffect, useState } from 'react';

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

type HeaderProps = {
  close: () => void;
};

const Header = withBlock<HeaderProps>(({ close }) => {
  const [name, setName] = useBlockName();

  return (
    <>
      <HeaderWrapper>
        <Typography
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

const Item: React.FC<{ id: BlockRef }> = ({ id }) => {
  const [readOnly, setReadOnly] = useState(false);
  return (
    <ItemWrapper>
      <button onClick={() => setReadOnly(!readOnly)}>
        {readOnly ? 'Edit' : 'View'}
      </button>
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
    [setChildren, children],
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
