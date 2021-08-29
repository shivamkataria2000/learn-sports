import * as React from "react";
import { useEffect } from "react";
import { Pressable } from "react-native";

import { View } from "../components/Themed";
import { ISport, IStore, RootTabScreenProps } from "../types";
import actionCreator from "../redux/ActionCreator";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import SportListItem from "../components/SportListItem";
import { openSport, toggleSearch } from "../redux/Action";
import { Searchbar } from "react-native-paper";
import { useMemo } from "react";
import Animated, { Easing, EasingNode } from "react-native-reanimated";
export default function LearnSportScreen({
  navigation,
}: RootTabScreenProps<"LearnSport">) {
  const data: { data: ISport[] } | "" = useSelector(
    (state: { apiReducer: IStore }) => state.apiReducer.data
  );
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query: string) => setSearchQuery(query);
  const showSearchBar: boolean = useSelector(
    (state: { sportReducer: IStore }) => state.sportReducer.showSearchBar
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!data) {
      dispatch(
        actionCreator.loadSportsData(
          "https://sports.api.decathlon.com/sports?has_icon=true"
        )
      );
    }
  }, []);

  const handleSportPress = (sportId: number) => {
    dispatch(openSport(sportId));
    navigation.navigate("SportDetailTab");
  };
  const filterdList: ISport[] = useMemo(() => {
    if (!data) return [];
    return data.data.filter(
      (item) => item.attributes.name.search(searchQuery) > -1
    );
  }, [searchQuery, data]);
  const searchBarAnim = React.useRef(new Animated.Value(-45)).current;
  useEffect(() => {
    if (showSearchBar) {
      Animated.timing(searchBarAnim, {
        toValue: 0,
        duration: 300,
        easing: EasingNode.ease,
      }).start();
    } else {
      Animated.timing(searchBarAnim, {
        toValue: -50,
        duration: 100,
        easing: EasingNode.ease,
      }).start();
    }
  }, [showSearchBar]);
  return (
    <View>
      <Animated.View style={{ transform: [{ translateY: searchBarAnim }] }}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </Animated.View>
      <Animated.View style={{ transform: [{ translateY: searchBarAnim }] }}>
        <FlatList
          data={filterdList}
          renderItem={({ item }: { item: ISport }) => (
            <Pressable onPress={() => handleSportPress(item.id)}>
              <SportListItem item={item} />
            </Pressable>
          )}
          keyExtractor={(item) => item.id.toString()}
          onScrollBeginDrag={() =>
            showSearchBar ? dispatch(toggleSearch(false)) : ""
          }
        />
      </Animated.View>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
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
