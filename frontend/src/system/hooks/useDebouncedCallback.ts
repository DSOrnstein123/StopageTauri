import debounce from "@system/utils/debounce";
import { useEffect, useMemo, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDebouncedCallback = <T extends (...args: any[]) => unknown>(
  callback: T,
  delay = 500,
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debounced = useMemo(
    () =>
      // eslint-disable-next-line react-hooks/refs
      debounce((...args: Parameters<T>) => {
        callbackRef.current(...args);
      }, delay),
    [delay],
  );

  useEffect(() => debounced.cancel, [debounced]);

  return {
    debounced: debounced,
    flush: debounced.flush,
    cancel: debounced.cancel,
  };
};

export default useDebouncedCallback;
