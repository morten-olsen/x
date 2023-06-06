import { FiPlusCircle } from 'react-icons/fi';
import { useBlockContent } from '@morten-olsen/x-blocks';
import { AttachBlockDialog, BaseElement } from '@morten-olsen/x-ui';

type TextContent = {
  text: string;
};

const Tools: React.FC = () => {
  const [, setValue] = useBlockContent<TextContent>();

  return (
    <AttachBlockDialog
      onSelect={(id) => {
        setValue((current) => ({
          text: `${current.text || ''} [block:${id.id}:${id.plugin}]`,
        }));
      }}
    >
      <BaseElement>
        <FiPlusCircle />
      </BaseElement>
    </AttachBlockDialog>
  );
};

export { Tools };
