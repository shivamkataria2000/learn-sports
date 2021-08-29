import * as React from "react";
import { useMemo } from "react";
import { Pressable, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

import EditScreenInfo from "../components/EditScreenInfo";
import SportListItem from "../components/SportListItem";
import { Text, View } from "../components/Themed";
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
  const historyList = useMemo(() => {
    if (!data) {
      return [];
    }
    const historyItems: Set<ISport> = new Set();
    history.forEach((sportId) => {
      const sportItem = data.data.find((item) => item.id === sportId);
      if (sportItem) {
        historyItems.add(sportItem);
      }
    });
    return [...historyItems];
  }, [history, data]);
  const dispatch = useDispatch();
  const handleSportPress = (sportId: number) => {
    dispatch(openSport(sportId));
    navigation.navigate("SportDetailTab");
  };
  return (
    <View>
      <FlatList
        data={historyList}
        renderItem={({ item }: { item: ISport }) => (
          <Pressable onPress={() => handleSportPress(item.id)}>
            <SportListItem item={item} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: "80%",
//   },
// });
