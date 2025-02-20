import { useCallback, useRef } from 'react';

export function useDebounce<TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  delay: number
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: TArgs) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}