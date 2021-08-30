import { useMemo } from "react";
const useSearchable = <T>(
  data: T[],
  searchText: string,
  searchProps: (item: T) => string[]
) => {
  return useMemo(() => {
    return data.filter((item) =>
      searchProps(item).some((text) => text.search(searchText) !== -1)
    );
  }, [data, searchText, searchProps]);
};
export default useSearchable;
