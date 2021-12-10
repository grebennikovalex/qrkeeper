import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
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
  icon,
  theme = true,
}) {
  if (type === "plus")
    return (
      <TouchableOpacity
        style={[
          styles.round,
          {
            marginLeft: leftOffset,
            backgroundColor: theme ? colors.foreground : colors.darkForeground,
          },
        ]}
        onPress={onPress}
      >
        <PlusIcon color={colors.primary} width={24} height={24} />
      </TouchableOpacity>
    );
  else if (type === "burger")
    return (
      <TouchableOpacity
        style={[
          styles.round,
          {
            marginLeft: leftOffset,
            backgroundColor: theme ? colors.foreground : colors.darkForeground,
          },
        ]}
        onPress={onPress}
      >
        <BurgerIcon color={colors.primary} width={24} height={24} />
      </TouchableOpacity>
    );
  else if (type === "question")
    return (
      <TouchableOpacity
        style={[
          styles.round,
          {
            marginLeft: leftOffset,
            backgroundColor: theme ? colors.foreground : colors.darkForeground,
          },
        ]}
        onPress={onPress}
      >
        <QuestionIcon color={colors.primary} width={15} height={24} />
      </TouchableOpacity>
    );
  else if (type === "cog")
    return (
      <TouchableOpacity
        style={[
          styles.round,
          {
            marginLeft: leftOffset,
            backgroundColor: theme ? colors.foreground : colors.darkForeground,
          },
        ]}
        onPress={onPress}
      >
        <CogIcon color={colors.primary} width={24} height={25} />
      </TouchableOpacity>
    );
  else if (type === "chevron")
    return (
      <TouchableOpacity
        style={[
          styles.round,
          {
            marginLeft: leftOffset,
            backgroundColor: theme ? colors.foreground : colors.darkForeground,
          },
        ]}
        onPress={onPress}
      >
        <ChevronIcon color={colors.primary} width={20} height={24} />
      </TouchableOpacity>
    );
  else if (type === "language")
    return (
      <TouchableOpacity
        style={[
          styles.barLanguage,
          {
            marginTop: topOffset,
            backgroundColor: theme ? colors.primary : colors.darkPrimary,
          },
        ]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.textSettings,
            {
              color: theme ? colors.background : colors.d,
              fontFamily: bold ? "black" : "regular",
            },
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  else if (type === "primary")
    return (
      <TouchableOpacity
        style={[
          styles.barPrimary,
          {
            marginTop: topOffset,
            backgroundColor: theme ? colors.primary : colors.darkPrimary,
          },
        ]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.text,
            {
              color: theme ? colors.background : colors.d,
              fontFamily: bold ? "black" : "regular",
            },
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  else if (type === "secondary")
    return (
      <TouchableOpacity
        style={[
          styles.barSecondary,
          {
            marginTop: topOffset,
            borderColor: theme ? colors.primary : colors.darkPrimary,
          },
        ]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.text,
            {
              color: theme ? colors.primary : colors.darkPrimary,
              fontFamily: bold ? "black" : "regular",
            },
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
    else if (type === "settings")
    return (
      <TouchableOpacity
        style={[
          styles.barSettings,
          {
            borderColor: theme ? colors.primary : colors.darkPrimary,
            backgroundColor: "transparent",
            marginTop: topOffset,
          },
        ]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.textSettings,
            {
              color: theme ? colors.primary : colors.darkPrimary,
              fontFamily: bold ? "black" : "regular",
            },
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
            { color: colors.red, fontFamily: bold ? "black" : "regular" },
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
            {
              color: colors.background,
              fontFamily: bold ? "black" : "regular",
            },
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  else if (type === "inactive")
    return (
      <View style={[styles.inactive, { 
        borderColor: theme ? colors.inactive : colors.darkInactive,
        marginTop: topOffset
         }]}>
        <Text
          style={[
            styles.text,
            { color: theme ? colors.inactive : colors.darkInactive,
              fontFamily: bold ? "black" : "regular" },
          ]}
        >
          {title}
        </Text>
      </View>
    );
  else if (type === "white")
    return (
      <TouchableOpacity
          style={[styles.white, { 
          marginTop: topOffset,
          backgroundColor: theme ? colors.foreground : colors.darkForeground,
         }]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.text,
            { color: theme ? colors.secondary : colors.darkSecondary, 
              fontFamily: "regular" },
          ]}
        >
          {title}
        </Text>
        {icon}
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontFamily: "black",
  },
  textSettings: {
    fontSize: 18,
    fontFamily: "black",
  },
  round: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    elevation: 10,
  },

  barLanguage: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 60,
    borderRadius: 10,
    elevation: 10,
  },

  barPrimary: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 60,
    borderRadius: 20,
    elevation: 10,
  },

  barSecondary: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 60,
    borderRadius: 20,
    borderWidth: 1,
  },

  barSettings: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    height: 60,
    borderRadius: 10,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 20
  },
 

  barRed: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 60,
    borderRadius: 20,
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

  inactive: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 60,
    borderRadius: 20,
    borderWidth: 1,
  },

  white: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: "100%",
    height: 60,
    borderRadius: 20,
    elevation: 10,
  },
});

export default Button;
