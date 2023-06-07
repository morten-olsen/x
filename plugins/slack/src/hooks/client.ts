import { useFetch, Client } from '../context';
import { useCallback, useMemo, useState } from 'react';

const useFetchAction = <T, O = any>(
  action: (client: Client<T>, options: O) => Promise<T>,
  deps: any[],
) => {
  const fetch = useFetch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [data, setData] = useState<T>();
  const update = useCallback(
    async (options: O) => {
      setLoading(true);
      try {
        const nextData = await action(fetch, options);
        setData(nextData);
        return nextData;
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [fetch, ...deps],
  );

  const value = useMemo(
    () => ({ loading, error, data, update }),
    [loading, error, data, update],
  );
  return value;
};

export { useFetchAction };
