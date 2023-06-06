import { useBlockContent } from '@morten-olsen/x-blocks';
import { useCallback, useState } from 'react';

type PullRequestContent = {
  owner: string;
  repo: string;
  pr: number;
};

const PullRequestEditor = () => {
  const [value, setValue] = useBlockContent<PullRequestContent>();
  const [owner, setOwner] = useState(value.owner || '');
  const [repo, setRepo] = useState(value.repo || '');
  const [pr, setPr] = useState(value.pr || '');

  const save = useCallback(() => {
    setValue({ owner, repo, pr: Number(pr) });
  }, [owner, repo, pr, setValue]);

  return (
    <div>
      <h1>Pull Request</h1>
      <input
        type="text"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
      />
      <input
        type="text"
        value={repo}
        onChange={(e) => setRepo(e.target.value)}
      />
      <input type="text" value={pr} onChange={(e) => setPr(e.target.value)} />
      <button onClick={save}>Save</button>
    </div>
  );
};

export { PullRequestEditor };
