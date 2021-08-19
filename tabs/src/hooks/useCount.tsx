import { useCallback } from "react";
import { useMemo } from "react";
import { useState } from "react";

/**
 * A hook that can be used to asynchronously increase
 * a count and to check if it had reached a limit.
 * @param limit Limit to check against.
 * @returns isFull boolean state and increment function.
 */
export default function useCount(limit: number) {
  const [count, setCount] = useState(0);
  const isFull = useMemo(() => count >= limit, [limit, count]);
  const incrementCount = useCallback(
    (incrementValue?: number) => {
      setCount((prevCount) => prevCount + (incrementValue || 1));
    },
    [setCount]
  );
  return { isFull, incrementCount };
}
