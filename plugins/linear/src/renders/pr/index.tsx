import { useBlockContent } from '@morten-olsen/x-blocks';
import { withAuth } from '../../context';
import { useSdkAction } from '../../hooks';
import { TicketEditor } from './editor';

type TicketContent = {
  id: string;
};

const TicketRender = withAuth(() => {
  const [value] = useBlockContent<TicketContent>();

  const pr = useSdkAction((o) => o.issue(value.id || ''), [value.id], {
    disable: !value.id,
  });

  if (!value.id) {
    return <TicketEditor />;
  }

  return (
    <div>
      <h1>Issue {value.id}</h1>
      {pr.data?.title}
    </div>
  );
});

export { TicketRender };
