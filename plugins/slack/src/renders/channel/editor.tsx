import { useBlockContent } from '@morten-olsen/x-blocks';
import { useCallback, useState } from 'react';

type ChannelContent = {
  id: string;
};

const ChannelEditor = () => {
  const [value, setValue] = useBlockContent<ChannelContent>();
  const [id, setId] = useState(value.id || '');

  const save = useCallback(() => {
    setValue({ id });
  }, [id, setValue]);

  return (
    <div>
      <input
        type="text"
        value={id}
        placeholder="Channel ID"
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={save}>Save</button>
    </div>
  );
};

export { ChannelEditor };
