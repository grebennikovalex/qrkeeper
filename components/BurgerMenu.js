import React from "react";
import { View, Text } from "react-native";
import styles from "../styles";
import Button from "./Button";

function BurgerMenu({ navigation }) {
  return (
    <View style={styles.burgerMenuContainer}>
      <Button type="cog" />
      <Button
        type="question"
        leftOffset={20}
        onPress={() => navigation.navigate("Info")}
      />
    </View>
  );
}

export default BurgerMenu;
