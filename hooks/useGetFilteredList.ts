import { useMemo } from "react";
const useGetFilteredList = <T, K>(
  data: T[],
  idList: K[] | Set<K>,
  findProp: (item: T, id: K) => boolean
) => {
  return useMemo(() => {
    if (!data) {
      return [];
    }
    const filteredItems: Set<T> = new Set();
    idList.forEach((id) => {
      const filterItem = data.find((item) => findProp(item, id));
      if (filterItem) {
        filteredItems.add(filterItem);
      }
    });
    return [...filteredItems];
  }, [data, idList]);
};
export default useGetFilteredList;
