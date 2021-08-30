import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import EmptySvg from "../components/EmptySvg";
import SportList from "../components/SportList";
import { Text, View } from "../components/Themed";
import useGetFilteredList from "../hooks/useGetFilteredList";
import { openSport } from "../redux/Action";
import { ISport, IStore, RootTabScreenProps } from "../types";

export default function HistoryScreen({
  navigation,
}: RootTabScreenProps<"History">) {
  const data: { data: ISport[] } | "" = useSelector(
    (state: { apiReducer: IStore }) => state.apiReducer.data
  );
  const history: number[] = useSelector(
    (state: { sportReducer: IStore }) => state.sportReducer.history
  );
  const historyList = useGetFilteredList(
    data ? data.data : [],
    history,
    (item, id) => item.id === id
  );
  const dispatch = useDispatch();
  const handleSportPress = (sportId: number) => {
    dispatch(openSport(sportId));
    navigation.navigate("SportDetailTab");
  };
  return (
    <View>
      {historyList.length ? (
        <SportList list={historyList} handleSportPress={handleSportPress} />
      ) : (
        <EmptySvg />
      )}
    </View>
  );
}
