import { useEffect, useState } from "react";

export default function useDebounce(cb, delay) {
  const [debounceValue, setDebounceValue] = useState(cb);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(cb);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [cb, delay]);
  return debounceValue;
}
