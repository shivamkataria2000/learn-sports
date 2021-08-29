import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import {
  Avatar,
  Card,
  Chip,
  Colors,
  Divider,
  IconButton,
  Paragraph,
  Subheading,
  Title,
} from "react-native-paper";
import { SvgCssUri } from "react-native-svg";
import { useSelector } from "react-redux";
import { View } from "../components/Themed";
import { ISport, IStore } from "../types";

function SportDetailView() {
  const data: { data: ISport[] } | "" = useSelector(
    (state: { apiReducer: IStore }) => state.apiReducer.data
  );
  const openSportId: number | undefined = useSelector(
    (state: { sportReducer: IStore }) => state.sportReducer.openSportId
  );
  const sportInfo = useMemo(() => {
    if (!data) {
      return;
    }
    return data.data.find((item) => item.id === openSportId);
  }, [openSportId, data]);
  return (
    <View>
      {sportInfo && (
        <Card>
          <Card.Cover
            source={{
              uri: sportInfo ? sportInfo.relationships.images.data[0].url : "",
            }}
          />
          <Card.Title
            title={sportInfo.attributes.name}
            left={(props) => (
              <Avatar.Icon
                size={40}
                color={Colors.white}
                icon={() => (
                  <SvgCssUri
                    width="100%"
                    height="100%"
                    uri={sportInfo ? sportInfo.attributes.icon : ""}
                  />
                )}
              />
            )}
            right={(props) => (
              <IconButton {...props} icon="more" onPress={() => {}} />
            )}
          />
          <Card.Content>
            <View style={styles.tags}>
              {sportInfo.relationships.tags.data
                .filter((_, idx) => idx < 3)
                .map((tag) => (
                  <Chip
                    onPress={() => console.log("Pressed")}
                    key={tag}
                    style={styles.chip}
                  >
                    {tag}
                  </Chip>
                ))}
            </View>
            <Divider />
            <Subheading>About:</Subheading>
            <Paragraph>{sportInfo.attributes.description}</Paragraph>
          </Card.Content>
        </Card>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  tags: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5,
  },
  chip: {
    marginRight: 2,
    marginBottom: 2,
  },
  about: {
    textAlign: "center",
  },
});
export default SportDetailView;
