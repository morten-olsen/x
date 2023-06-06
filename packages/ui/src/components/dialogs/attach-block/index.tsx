import {
  BlockRef,
  stringifyRef,
  useBlockChildren,
  useFindBlocks,
} from '@morten-olsen/x-blocks';
import { Dialog } from '../../base/dialog';
import { Field } from '../../form/field';
import { useCallback, useEffect, useState } from 'react';
import { BlockItem } from '../../blocks/item';
import { BaseElement } from '../../base';

type RendersDialogProps = {
  children?: React.ReactNode;
  onSelect?: (blockId: BlockRef) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const AttachBlockDialog: React.FC<RendersDialogProps> = ({
  children,
  onSelect,
  open,
  onOpenChange,
}) => {
  const [search, setSearch] = useState('');
  const find = useFindBlocks();
  const [, setChildren] = useBlockChildren();
  const [results, setResults] = useState<BlockRef[]>([]);

  const close = useCallback(
    (state: boolean) => {
      if (!state) {
        setSearch('');
      }
      onOpenChange?.(state);
    },
    [onOpenChange, setSearch],
  );

  const create = useCallback(
    (id: BlockRef) => {
      setChildren((currentChildren) => [...currentChildren, id]);
      onSelect?.(id);
    },
    [setChildren, onSelect],
  );

  useEffect(() => {
    const run = async () => {
      const results = await find({
        text: search,
      });
      setResults(results.splice(0, 10));
    };
    run();
  }, [search, find]);

  return (
    <Dialog open={open} onOpenChange={close}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Attach block</Dialog.Title>
          <Dialog.Description>Choose the block type to add</Dialog.Description>
          <Field title="Search">
            <Field.Input
              placeholder="Name"
              value={search}
              onChange={setSearch}
            />
          </Field>
          <BaseElement $fc>
            {results.map((block) => (
              <Dialog.Close key={stringifyRef(block)}>
                <BlockItem id={block} onPress={() => create(block)} />
              </Dialog.Close>
            ))}
          </BaseElement>
          <Dialog.CloseButton />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export { AttachBlockDialog };
