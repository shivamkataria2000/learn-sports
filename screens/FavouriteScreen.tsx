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
}: RootTabScreenProps<"Favourite">) {
  const data: { data: ISport[] } | "" = useSelector(
    (state: { apiReducer: IStore }) => state.apiReducer.data
  );

  const favourites: Set<number> = useSelector(
    (state: { sportReducer: IStore }) => state.sportReducer.favourites
  );
  const favouriteList = useMemo(() => {
    if (!data) {
      return [];
    }
    const favouriteItems: Set<ISport> = new Set();
    favourites.forEach((sportId) => {
      const sportItem = data.data.find((item) => item.id === sportId);
      if (sportItem) {
        favouriteItems.add(sportItem);
      }
    });
    return [...favouriteItems];
  }, [favourites, data]);
  const dispatch = useDispatch();
  const handleSportPress = (sportId: number) => {
    dispatch(openSport(sportId));
    navigation.navigate("SportDetailTab");
  };
  return (
    <View>
      <FlatList
        data={favouriteList}
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
