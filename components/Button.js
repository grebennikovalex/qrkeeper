import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { colors } from "../colors";
import BurgerIcon from "../assets/BurgerIcon";
import PlusIcon from "../assets/PlusIcon";

function Button({ onPress, type, title, topOffset = 0 }) {
  if (type === "plus")
    return (
      <TouchableOpacity style={styles.round} onPress={onPress}>
        <PlusIcon color={colors.primary} width={24} height={24} />
      </TouchableOpacity>
    );
  else if (type === "burger")
    return (
      <TouchableOpacity style={styles.round} onPress={onPress}>
        <BurgerIcon color={colors.primary} width={24} height={24} />
      </TouchableOpacity>
    );
  else if (type === "primary")
    return (
      <TouchableOpacity
        style={[styles.barPrimary, { marginTop: topOffset }]}
        onPress={onPress}
      >
        <Text style={[styles.text, { color: colors.background }]}>{title}</Text>
      </TouchableOpacity>
    );
  else if (type === "secondary")
    return (
      <TouchableOpacity
        style={[styles.barSecondary, { marginTop: topOffset }]}
        onPress={onPress}
      >
        <Text style={[styles.text, { color: colors.primary }]}>{title}</Text>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "900",
  },
  round: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.background,
    elevation: 10,
  },

  barPrimary: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 60,
    borderRadius: 20,
    backgroundColor: colors.primary,
    elevation: 10,
  },

  barSecondary: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 60,
    borderRadius: 20,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.primary,
  },
});

export default Button;
