import React from "react";
type ValueType = string | number;
export default function useDebounce(value: ValueType, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = React.useState<ValueType>(value);

  React.useEffect(() => {
    const handler: NodeJS.Timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value changes (also on delay change or unmount)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
