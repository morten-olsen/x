import { Plugin, useGetBlockOrCreate } from '@morten-olsen/x-blocks';
import {
  DropdownMenu,
  AddBlockDialog,
  AttachBlockDialog,
} from '@morten-olsen/x-ui';
import { FiPlusCircle } from 'react-icons/fi';
import { useState } from 'react';

const ContainerTools: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [isAttaching, setIsAttaching] = useState(false);

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
      <AddBlockDialog open={isAdding} onOpenChange={setIsAdding} />
      <AttachBlockDialog open={isAttaching} onOpenChange={setIsAttaching} />
    </>
  );
};

export { ContainerTools };
