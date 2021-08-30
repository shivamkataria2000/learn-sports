import React from "react";
import { FlatList, Pressable } from "react-native";
import { ISport, SportListProps } from "../types";
import SportListItem from "./SportListItem";

function SportList({ list, handleSportPress }: SportListProps) {
  return (
    <FlatList
      data={list}
      renderItem={({ item }: { item: ISport }) => (
        <Pressable onPress={() => handleSportPress(item.id)}>
          <SportListItem item={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

export default SportList;
