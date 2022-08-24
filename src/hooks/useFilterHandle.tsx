import { useState, useEffect, useCallback } from "react";

export function useFilterHandle(filterVariants: any, callback: Function) {
  const [filters, setFilters] = useState(filterVariants);
  const onFilter = useCallback((name: string, value = "all") => {
    if (
      value === "all" ||
      value === "" ||
      value === null ||
      value === undefined
    ) {
      setFilters((values: {}) => ({ ...values, [name]: undefined }));
    } else {
      setFilters((values: {}) => ({
        ...values,
        [name]: value,
        history: undefined,
      }));
    }
  }, []);

  useEffect(() => {
    callback({ filters });
  },[]);

  return [filters, onFilter, setFilters];
}
