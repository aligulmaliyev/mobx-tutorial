import { useState, useEffect, useCallback } from "react";

export function useFilterHandle(filterVariants: any, callback: any) {
  const [filters, setFilters] = useState(filterVariants);

  const onFilter = useCallback((name: any, value = "all") => {
    if (
      value === "all" ||
      value === "" ||
      value === null ||
      value === undefined
    ) {
      setFilters((values: any) => ({ ...values, [name]: undefined }));
    } else {
      setFilters((values: any) => ({
        ...values,
        [name]: value,
        history: undefined,
      }));
    }
  }, []);

  useEffect(() => {
      callback({ filters });
  }, [filters]);

  return [filters, onFilter, setFilters];
}
