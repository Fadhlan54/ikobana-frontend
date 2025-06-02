import { useEffect, useRef, useState } from "react";

export default function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const firstCall = useRef<boolean>(true);

  useEffect(() => {
    if (firstCall.current) {
      firstCall.current = false;
      return;
    }

    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
