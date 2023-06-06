import {
  Plugin,
  useGetBlockOrCreate,
  usePluginsRenders,
} from '@morten-olsen/x-blocks';
import { Dialog } from '../../base/dialog';
import { Field } from '../../form/field';
import { RenderItem } from '../../renders/item';
import { useCallback, useState } from 'react';

type RendersDialogProps = {
  children?: React.ReactNode;
  onSelect?: (type: string, plugin: Plugin) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const AddBlockDialog: React.FC<RendersDialogProps> = ({
  children,
  onSelect,
  open,
  onOpenChange,
}) => {
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');
  const renders = usePluginsRenders();
  const addBlock = useGetBlockOrCreate();

  const close = useCallback(
    (state: boolean) => {
      if (!state) {
        setName('');
        setSearch('');
      }
      onOpenChange?.(state);
    },
    [onOpenChange, setName, setSearch],
  );

  const create = useCallback(
    (type: string, plugin: Plugin) => {
      addBlock({
        type,
        plugin: plugin.id,
        content: {},
        name,
      });
      onSelect?.(type, plugin);
    },
    [addBlock, onSelect, name],
  );

  return (
    <Dialog open={open} onOpenChange={close}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Add block</Dialog.Title>
          <Dialog.Description>Choose the block type to add</Dialog.Description>
          <Field title="Name">
            <Field.Input placeholder="Name" value={name} onChange={setName} />
          </Field>
          <Field title="Search">
            <Field.Input
              placeholder="Name"
              value={search}
              onChange={setSearch}
            />
          </Field>
          {renders.map((render, i) => (
            <Dialog.Close key={i}>
              <RenderItem {...render} onPress={create} />
            </Dialog.Close>
          ))}
          <Dialog.CloseButton />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export { AddBlockDialog };
