import { LinearClient } from '@linear/sdk';
import { useSdk } from '../context';
import { useEffect, useMemo, useState } from 'react';

type Options = {
  disable?: boolean;
};

const useSdkAction = <T>(
  action: (client: LinearClient) => Promise<T>,
  deps: any[],
  options: Options = {},
) => {
  const sdk = useSdk();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [data, setData] = useState<T>();
  useEffect(() => {
    if (options.disable) {
      return;
    }
    setLoading(true);
    action(sdk)
      .then((nextData) => setData(nextData))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [sdk, ...deps, options.disable]);

  const value = useMemo(
    () => ({ loading, error, data }),
    [loading, error, data],
  );
  return value;
};

export { useSdkAction };
