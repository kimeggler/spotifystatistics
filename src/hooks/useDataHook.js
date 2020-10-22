import { useState, useEffect } from 'react';

const useDataHook = request => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [hasError, setHasError] = useState(false);

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
