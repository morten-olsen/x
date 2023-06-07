import { Plugin, useGetBlockOrCreate } from '@morten-olsen/x-blocks';
import {
  DropdownMenu,
  AddBlockDialog,
  AttachBlockDialog,
} from '@morten-olsen/x-ui';
import { FiPlusCircle } from 'react-icons/fi';
import { useCallback, useState } from 'react';

const ContainerTools: React.FC = () => {
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
    <>
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
      <AddBlockDialog
        open={isAdding}
        onOpenChange={setIsAdding}
        onSelect={create}
      />
      <AttachBlockDialog open={isAttaching} onOpenChange={setIsAttaching} />
    </>
  );
};

export { ContainerTools };
