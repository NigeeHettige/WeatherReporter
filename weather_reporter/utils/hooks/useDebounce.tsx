import React, { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncevalue, setDebouncevalue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncevalue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncevalue;
}

export default useDebounce;
