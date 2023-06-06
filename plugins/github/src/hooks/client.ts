import { Octokit } from 'octokit';
import { useOctokit } from '../context';
import { useEffect, useMemo, useState } from 'react';

type Options = {
  disable?: boolean;
};

const useOctoAction = <T>(
  action: (client: Octokit['rest']) => Promise<{ data: T }>,
  deps: any[],
  options: Options = {},
) => {
  const octo = useOctokit();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [data, setData] = useState<T>();
  useEffect(() => {
    if (options.disable) {
      return;
    }
    setLoading(true);
    action(octo.rest)
      .then((nextData) => setData(nextData.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [octo, ...deps, options.disable]);

  const value = useMemo(
    () => ({ loading, error, data }),
    [loading, error, data],
  );
  return value;
};

export { useOctoAction };
