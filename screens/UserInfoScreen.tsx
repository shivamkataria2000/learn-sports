import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Button, Card, Colors, TextInput } from "react-native-paper";
import UserSvg from "../components/UserSvg";

export default function UserInfoScreen() {
  const [email, setEmail] = React.useState("");
  const [personName, setPersonName] = React.useState("");
  const [age, setAge] = React.useState("");

  return (
    <View>
      <Card>
        <Card.Content style={styles.container}>
          <View style={styles.userIcon}>
            <UserSvg />
          </View>
          <TextInput
            style={styles.textInput}
            label="Email"
            value={email}
            selectionColor={Colors.purple500}
            outlineColor={Colors.blueA400}
            onChangeText={(text) => setEmail(text)}
            mode="outlined"
            placeholder="john.doe@example.com"
          />
          <TextInput
            style={styles.textInput}
            label="Name"
            value={personName}
            selectionColor={Colors.purple500}
            outlineColor={Colors.blueA400}
            onChangeText={(text) => setPersonName(text)}
            mode="outlined"
            placeholder="John Doe"
          />
          <TextInput
            style={styles.textInput}
            label="Age"
            keyboardType="numeric"
            value={age}
            selectionColor={Colors.purple500}
            outlineColor={Colors.blueA400}
            onChangeText={(text) => setAge(text)}
            mode="outlined"
            placeholder="23"
          />
          <Button
            color={Colors.blueA700}
            style={styles.button}
            mode="contained"
          >
            Save
          </Button>
          <Button color={Colors.black} style={styles.button} mode="outlined">
            Cancel
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "flex-end",
  },
  textInput: {
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
  },
  userIcon: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
});
