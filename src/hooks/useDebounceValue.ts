import { useState, useEffect } from 'react';

export function useDebounceValue(value: string, delay = 300) {
  const [debValue, setDebValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debValue;
}
