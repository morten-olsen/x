import { useBlockContent, useBlockId, useOpen } from '@morten-olsen/x-blocks';
import { withAuth } from '../../context';
import { useSdkAction } from '../../hooks';
import { TicketEditor } from './editor';

type TicketContent = {
  id: string;
};

const TicketInline = withAuth(() => {
  const [value] = useBlockContent<TicketContent>();
  const id = useBlockId();
  const open = useOpen();

  const pr = useSdkAction((o) => o.issue(value.id || ''), [value.id], {
    disable: !value.id,
  });

  if (!value.id) {
    return <TicketEditor />;
  }

  return <span onClick={() => open(id)}>{pr.data?.title}</span>;
});

export { TicketInline };
