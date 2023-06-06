import { useBlockContent } from '@morten-olsen/x-blocks';
import { useCallback, useState } from 'react';

type TicketContent = {
  id: string;
};

const TicketEditor = () => {
  const [value, setValue] = useBlockContent<TicketContent>();
  const [id, setId] = useState(value.id || '');

  const save = useCallback(() => {
    setValue({ id });
  }, [id, setValue]);

  return (
    <div>
      <h1>Ticket</h1>
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      <button onClick={save}>Save</button>
    </div>
  );
};

export { TicketEditor };
