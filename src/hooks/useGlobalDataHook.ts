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

  console.log(`[useGlobalDataHook] Hook called with message: ${loadingMessage}`);
  console.log(
    `[useGlobalDataHook] Current state - isLoading: ${isLoading}, data: ${data ? 'exists' : 'null'}, hasError: ${hasError}`,
  );

  useEffect(() => {
    return () => {
      console.log(`[useGlobalDataHook] Component unmounting: ${loadingMessage}`);
      mountedRef.current = false;
    };
  }, [loadingMessage]);

  useEffect(() => {
    const requestString = request.toString();
    console.log(`[useGlobalDataHook] useEffect triggered for: ${loadingMessage}`);
    console.log(
      `[useGlobalDataHook] Request string changed: ${requestString !== lastRequestStringRef.current}`,
    );

    // Only execute if the request function has actually changed
    if (requestString === lastRequestStringRef.current) {
      console.log(`[useGlobalDataHook] Skipping - same request as before`);
      return;
    }

    lastRequestStringRef.current = requestString;

    const fetchData = async () => {
      if (!mountedRef.current) {
        console.log(
          `[useGlobalDataHook] Component unmounted, skipping request for: ${loadingMessage}`,
        );
        return;
      }

      try {
        console.log(`[useGlobalDataHook] Starting request: ${loadingMessage}`);

        setIsLoading(true);
        setHasError(false);
        setLoadingMessage(loadingMessage);

        // Increment global counter and set loading if this is the first request
        globalLoadingCounter++;
        console.log(`[useGlobalDataHook] Global loading counter: ${globalLoadingCounter}`);
        setGlobalLoading(true);

        // Add timeout to detect hanging requests
        const requestPromise = request();
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout after 10 seconds')), 10000),
        );

        console.log(`[useGlobalDataHook] Waiting for request response...`);
        const response = (await Promise.race([requestPromise, timeoutPromise])) as T;

        if (!mountedRef.current) {
          console.log(`[useGlobalDataHook] Component unmounted during request: ${loadingMessage}`);
          return;
        }

        setData(response);
        setHasError(false);
        console.log(`[useGlobalDataHook] Request completed successfully: ${loadingMessage}`);
        console.log(`[useGlobalDataHook] Data received:`, response);
      } catch (error) {
        if (!mountedRef.current) {
          console.log(
            `[useGlobalDataHook] Component unmounted during error handling: ${loadingMessage}`,
          );
          return;
        }

        console.error(`[useGlobalDataHook] Request failed: ${loadingMessage}`, error);
        setData(null);
        setHasError(true);
      } finally {
        if (mountedRef.current) {
          setIsLoading(false);
          console.log(`[useGlobalDataHook] Set local isLoading to FALSE`);

          // Decrement global counter and only clear loading if no more requests
          globalLoadingCounter--;
          console.log(`[useGlobalDataHook] Global loading counter: ${globalLoadingCounter}`);

          if (globalLoadingCounter <= 0) {
            globalLoadingCounter = 0; // Ensure it doesn't go negative
            setGlobalLoading(false);
            console.log(`[useGlobalDataHook] Set global loading to FALSE - all requests complete`);
          } else {
            console.log(
              `[useGlobalDataHook] Keeping global loading TRUE - ${globalLoadingCounter} requests still active`,
            );
          }
        }
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
