import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";
import { Colors as PaperColors, List } from "react-native-paper";
import { SvgCssUri } from "react-native-svg";
import { ISport, IStore } from "../types";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { useDispatch, useSelector } from "react-redux";
import { makeFavourite, makeUnfavourite } from "../redux/Action";

const SportListItem = ({ item }: { item: ISport }) => {
  const favourites: Set<number> = useSelector(
    (state: { sportReducer: IStore }) => state.sportReducer.favourites
  );
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const handleFavouriteButtonPress = (sportId: number) => {
    favourites.has(sportId)
      ? dispatch(makeUnfavourite(sportId))
      : dispatch(makeFavourite(sportId));
  };
  return (
    <List.Item
      title={item.attributes.name}
      description={item.attributes.description || "Description Not Available"}
      left={(props) => (
        <List.Icon
          color={PaperColors.blue100}
          icon={() => (
            <SvgCssUri width="100%" height="100%" uri={item.attributes.icon} />
          )}
        />
      )}
      right={(props) => (
        <List.Icon
          icon={() => (
            <Pressable
              onPress={() => handleFavouriteButtonPress(item.id)}
              style={({ pressed }: { pressed: boolean }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name={favourites.has(item.id) ? "star" : "star-o"}
                size={25}
                color={PaperColors.blue600}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          )}
        />
      )}
    />
  );
};

export default SportListItem;
