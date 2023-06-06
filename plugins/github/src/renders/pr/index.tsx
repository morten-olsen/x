import { useBlockContent } from '@morten-olsen/x-blocks';
import { withAuth } from '../../context';
import { useOctoAction } from '../../hooks';
import { PullRequestEditor } from './editor';

type PullRequestContent = {
  owner: string;
  repo: string;
  pr: number;
};

const PullRequestRender = withAuth(() => {
  const [value] = useBlockContent<PullRequestContent>();

  const pr = useOctoAction(
    (o) =>
      o.pulls.get({
        owner: value.owner || '',
        repo: value.repo || '',
        pull_number: value.pr || 0,
      }),
    [value.owner, value.repo, value.pr],
    {
      disable: !value.owner || !value.repo || !value.pr,
    },
  );

  if (!value.owner || !value.repo || !value.pr) {
    return <PullRequestEditor />;
  }

  return (
    <div>
      <h1>Pull Request</h1>
      {pr.data?.title}
    </div>
  );
});

export { PullRequestRender };
