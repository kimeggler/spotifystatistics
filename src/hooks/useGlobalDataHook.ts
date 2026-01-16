import { useEffect, useRef, useState } from 'react';
import { useLoading } from '../contexts/LoadingContext';

interface UseGlobalDataHookResult<T> {
  data: T | null;
  isLoading: boolean;
  hasError: boolean;
}

// Global counter to track active loading requests
let globalLoadingCounter = 0;

const useGlobalDataHook = <T>(
  request: () => Promise<T>,
  loadingMessage: string = 'Loading your music...',
): UseGlobalDataHookResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const { setGlobalLoading, setLoadingMessage } = useLoading();

  const mountedRef = useRef<boolean>(true);
  const lastRequestStringRef = useRef<string>('');

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, [loadingMessage]);

  useEffect(() => {
    const requestString = request.toString();

    // Only execute if the request function has actually changed
    if (requestString === lastRequestStringRef.current) {
      return;
    }

    lastRequestStringRef.current = requestString;

    const fetchData = async () => {
      if (!mountedRef.current) {
        return;
      }

      try {
        setIsLoading(true);
        setHasError(false);
        setLoadingMessage(loadingMessage);

        // Increment global counter and set loading if this is the first request
        globalLoadingCounter++;
        setGlobalLoading(true);

        const response = await request();

        if (!mountedRef.current) {
          return;
        }

        setData(response);
        setHasError(false);
      } catch (error) {
        console.error(`Request failed: ${loadingMessage}`, error);
        if (mountedRef.current) {
          setData(null);
          setHasError(true);
        }
      } finally {
        // ALWAYS decrement the counter, even if component unmounted
        globalLoadingCounter--;

        if (globalLoadingCounter <= 0) {
          globalLoadingCounter = 0;
          setGlobalLoading(false);
        }

        // Always set local loading to false
        setIsLoading(false);
      }
    };

    fetchData();
  }, [request, loadingMessage, setGlobalLoading, setLoadingMessage]);

  return {
    data,
    isLoading,
    hasError,
  };
};

export default useGlobalDataHook;
