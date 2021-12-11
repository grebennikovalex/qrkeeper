import React from "react";
import { View, Text } from "react-native";
import styles from "../styles";
import Button from "./Button";

function BurgerMenu({ navigation, theme }) {
  return (
    <View style={styles.burgerMenuContainer}>
      <Button
        theme={theme}
        type="cog"
        onPress={() => navigation.navigate("Settings")}
      />
      <Button
        theme={theme}
        type="question"
        leftOffset={20}
        onPress={() => navigation.navigate("Info")}
      />
    </View>
  );
}

export default BurgerMenu;
