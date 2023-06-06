import {
  FiPlus,
  FiMoreHorizontal,
  FiChevronsDown,
  FiChevronsUp,
  FiTrash,
} from 'react-icons/fi';
import styled from 'styled-components';
import {
  useBlockChildren,
  useBlockId,
  useBlockName,
  useBlockType,
  useGetBlockOrCreate,
  useOpen,
  useRender,
  withBlock,
} from '@morten-olsen/x-blocks';
import {
  AddBlockDialog,
  Row,
  DropdownMenu,
  BaseElement,
  AttachBlockDialog,
} from '@morten-olsen/x-ui';
import { useCallback, useState } from 'react';

const FolderName = styled.input`
  all: unset;
  width: 100%;
`;

type ItemProps = {
  remove: () => void;
};

const Wrapper = styled.div``;

const ActionCell = styled.div<{ $hover: boolean }>`
  display: flex;
  opacity: ${({ $hover }) => ($hover ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
`;

const Item = withBlock<ItemProps>(({ remove }) => {
  const type = useBlockType();
  const [isHover, setIsHover] = useState(false);
  const id = useBlockId();
  const [name] = useBlockName();
  const render = useRender();
  const open = useOpen();

  if (type === 'folder' && id.plugin === 'ui') {
    return <Folder />;
  }

  return (
    <Wrapper
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Row
        onPress={() => {
          open(id);
        }}
        left={<Row.Cell>{render.icon}</Row.Cell>}
        right={
          <ActionCell $hover={isHover}>
            <Row.Cell>
              <FiTrash onClick={() => remove()} />
            </Row.Cell>
          </ActionCell>
        }
        title={name || 'unnamed'}
      />
    </Wrapper>
  );
});

const Folder: React.FC = () => {
  const [children, setChildren] = useBlockChildren();
  const [isDropOpen, setIsDropOpen] = useState(false);
  const [name, setName] = useBlockName();
  const render = useRender();
  const getOrAdd = useGetBlockOrCreate();
  const [isOpen, setIsOpen] = useState(true);
  const [isAddOpen, setOpen] = useState(false);
  const [isAttachOpen, setIsAttachOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const addFolder = useCallback(() => {
    getOrAdd({
      type: 'folder',
      plugin: 'ui',
      content: {},
    });
  }, [getOrAdd]);

  return (
    <Wrapper
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Row
        left={<Row.Cell>{render.icon}</Row.Cell>}
        right={
          <ActionCell $hover={isHover || isDropOpen}>
            <AddBlockDialog open={isAddOpen} onOpenChange={setOpen} />
            <AttachBlockDialog
              open={isAttachOpen}
              onOpenChange={setIsAttachOpen}
            />
            <Row.Cell>
              {isOpen ? (
                <FiChevronsUp onClick={() => setIsOpen(false)} />
              ) : (
                <FiChevronsDown onClick={() => setIsOpen(true)} />
              )}
            </Row.Cell>
            <Row.Cell>
              <DropdownMenu.Root open={isDropOpen} onOpenChange={setIsDropOpen}>
                <DropdownMenu.Trigger asChild>
                  <div>
                    <FiPlus />
                  </div>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item onClick={addFolder}>
                    <DropdownMenu.Icon>
                      <FiPlus />
                    </DropdownMenu.Icon>
                    Add folder
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onClick={() => setOpen(true)}>
                    Add block
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onClick={() => setIsAttachOpen(true)}>
                    Attach block
                  </DropdownMenu.Item>
                  <DropdownMenu.Arrow />
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </Row.Cell>
            <Row.Cell>
              <FiMoreHorizontal />
            </Row.Cell>
          </ActionCell>
        }
      >
        <FolderName
          placeholder="Unnamed"
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
        />
      </Row>
      {isOpen && (
        <BaseElement $pl="md" $fc>
          {children.map((id) => (
            <Item
              key={`${id.id}+${id.plugin}`}
              id={id}
              remove={() => {
                setChildren(children.filter((c) => c.id !== id.id));
              }}
            />
          ))}
        </BaseElement>
      )}
    </Wrapper>
  );
};

export { Folder };
