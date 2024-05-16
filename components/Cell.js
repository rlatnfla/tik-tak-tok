import { Text, Pressable, View, StyleSheet } from "react-native";

export default function Cell(props) {
  return (
    <Pressable
      style={styles.press}
      onPress={props.onPress}
    >
      <Text style={styles.text}>
        {props.player === null ? "" : props.player === 1 ? "O" : "X"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  press: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 50,
    fontWeight: "400",
  },
});
