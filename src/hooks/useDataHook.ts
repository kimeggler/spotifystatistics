import { useEffect, useState } from 'react';

interface UseDataHookResult<T> {
  data: T | null;
  isLoading: boolean;
  hasError: boolean;
}

const useDataHook = <T>(request: () => Promise<T>): UseDataHookResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    request()
      .then(response => {
        setData(response);
        setHasError(false);
        setIsLoading(false);
      })
      .catch(() => {
        setData(null);
        setHasError(true);
        setIsLoading(false);
      });
  }, [request]);

  return {
    data,
    isLoading,
    hasError,
  };
};

export default useDataHook;
