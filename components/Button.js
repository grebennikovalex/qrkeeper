import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { colors } from "../colors";
import BurgerIcon from "../assets/BurgerIcon";
import PlusIcon from "../assets/PlusIcon";
import QuestionIcon from "../assets/QuestionIcon";
import ChevronIcon from "../assets/ChevronIcon";
import CogIcon from "../assets/CogIcon";

function Button({
  onPress,
  type,
  title,
  topOffset = 0,
  leftOffset = 0,
  bold = false,
}) {
  if (type === "plus")
    return (
      <TouchableOpacity
        style={[styles.round, { marginLeft: leftOffset }]}
        onPress={onPress}
      >
        <PlusIcon color={colors.primary} width={24} height={24} />
      </TouchableOpacity>
    );
  else if (type === "burger")
    return (
      <TouchableOpacity
        style={[styles.round, { marginLeft: leftOffset }]}
        onPress={onPress}
      >
        <BurgerIcon color={colors.primary} width={24} height={24} />
      </TouchableOpacity>
    );
  else if (type === "question")
    return (
      <TouchableOpacity
        style={[styles.round, { marginLeft: leftOffset }]}
        onPress={onPress}
      >
        <QuestionIcon color={colors.primary} width={15} height={24} />
      </TouchableOpacity>
    );
  else if (type === "cog")
    return (
      <TouchableOpacity
        style={[styles.round, { marginLeft: leftOffset }]}
        onPress={onPress}
      >
        <CogIcon color={colors.primary} width={24} height={25} />
      </TouchableOpacity>
    );
  else if (type === "chevron")
    return (
      <TouchableOpacity
        style={[styles.round, { marginLeft: leftOffset }]}
        onPress={onPress}
      >
        <ChevronIcon color={colors.primary} width={20} height={24} />
      </TouchableOpacity>
    );
  else if (type === "primary")
    return (
      <TouchableOpacity
        style={[styles.barPrimary, { marginTop: topOffset }]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.text,
            { color: colors.background, fontWeight: bold ? "bold" : "normal" },
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  else if (type === "secondary")
    return (
      <TouchableOpacity
        style={[styles.barSecondary, { marginTop: topOffset }]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.text,
            { color: colors.primary, fontWeight: bold ? "bold" : "normal" },
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  else if (type === "red")
    return (
      <TouchableOpacity
        style={[styles.barRed, { marginTop: topOffset }]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.text,
            { color: colors.red, fontWeight: bold ? "bold" : "normal" },
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  else if (type === "green")
    return (
      <TouchableOpacity
        style={[styles.barGreen, { marginTop: topOffset }]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.text,
            { color: colors.background, fontWeight: bold ? "bold" : "normal" },
          ]}
        >
          {title}
        </Text>
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

  barRed: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 60,
    borderRadius: 20,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.red,
  },

  barGreen: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 60,
    borderRadius: 20,
    backgroundColor: colors.green,
    elevation: 10,
  },
});

export default Button;
